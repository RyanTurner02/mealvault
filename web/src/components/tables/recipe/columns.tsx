"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteRecipeModal } from "@/components/modals/delete-recipe-modal";
import { useState } from "react";
import Link from "next/link";
import { deleteRecipe } from "@/app/features/delete-recipe/api/delete-recipe";
import { Recipe } from "@/lib/schemas/recipe-table-schema";

export const columns = (
  onDelete: (id: string) => void
): ColumnDef<Recipe>[] => [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <Link className="text-link" href={`/m/${row.original.recipeId}`}>
        {row.original.recipeName}
      </Link>
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
    cell: ({ row }) => {
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
              <Link href={`/m/${row.original.recipeId}/edit`}>
                <DropdownMenuItem className="cursor-pointer">
                  Edit
                </DropdownMenuItem>
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
              const recipeId: number = Number(row.original.recipeId);
              const deletedRecipe: boolean = await deleteRecipe({ recipeId });

              if (!deletedRecipe) {
                return;
              }

              onDelete(row.original.recipeId);
              setOpen(false);
            }}
            onOpenChange={setOpen}
          />
        </>
      );
    },
  },
];
