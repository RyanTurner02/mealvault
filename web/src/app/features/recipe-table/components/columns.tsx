"use client";

import { ColumnDef } from "@tanstack/react-table";
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
import { Recipe } from "@/app/schemas/recipe-table-schema";
import { RecipeNameCell } from "@/app/features/recipe-table/components/recipe-name-cell";

interface ActionsCellProps {
  recipeId: string;
  onDelete: (id: string) => void;
}

const ActionsCell = ({ recipeId, onDelete }: ActionsCellProps) => {
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
          const deletedRecipe: boolean = await deleteRecipe({ recipeId });

          if (!deletedRecipe) {
            return;
          }

          onDelete(recipeId);
          setOpen(false);
        }}
        onOpenChange={setOpen}
      />
    </>
  );
};

export const columns = (
  onDelete: (id: string) => void
): ColumnDef<Recipe>[] => [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <RecipeNameCell
        recipeId={row.original.recipeId}
        recipeName={row.original.recipeName}
      />
    ),
  },
  {
    accessorKey: "prepTime",
    header: "Prep Time",
  },
  {
    accessorKey: "cookTime",
    header: "Cook Time",
  },
  {
    accessorKey: "servings",
    header: "Servings",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <ActionsCell recipeId={row.original.recipeId} onDelete={onDelete} />
    ),
  },
];
