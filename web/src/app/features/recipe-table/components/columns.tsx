"use client";

import { ColumnDef } from "@tanstack/react-table";
import { RecipeTable } from "@/app/schemas/recipe-table-schema";
import { RecipeNameCell } from "@/app/features/recipe-table/components/recipe-name-cell";
import { ActionsCell } from "@/app/features/recipe-table/components/actions-cell";

export const columns = (
  onDelete: (id: string) => void
): ColumnDef<RecipeTable>[] => [
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
