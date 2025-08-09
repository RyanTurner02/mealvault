import { MoreHorizontal } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { DeleteRecipeModal } from "@/app/features/recipe-table/components/delete-recipe-modal";
import { useState } from "react";
import Link from "next/link";
import { deleteRecipe } from "@/app/features/delete-recipe/api/delete-recipe";

interface ActionsCellProps {
  recipeId: string;
  onDelete: (id: string) => void;
}

export const ActionsCell = ({ recipeId, onDelete }: ActionsCellProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="w-8 h-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href={`/m/${recipeId}/edit`}>
            <DropdownMenuItem className="cursor-pointer">Edit</DropdownMenuItem>
          </Link>
          <DropdownMenuItem
            className="cursor-pointer"
            onSelect={(e) => {
              e.preventDefault();
              setOpen(true);
            }}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteRecipeModal
        open={open}
        onDeleteClicked={async () => {
          setOpen(false);

          if (await deleteRecipe({ recipeId })) {
            onDelete(recipeId);
          }
        }}
        onOpenChange={setOpen}
      />
    </>
  );
};
