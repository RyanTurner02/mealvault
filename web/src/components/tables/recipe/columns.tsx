"use client";

import * as z from "zod";
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

const recipeSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  difficulty: z.string(),
  prepTime: z.string(),
  cookTime: z.string(),
  servings: z.number(),
  actions: z.string(),
});

export type Recipe = z.infer<typeof recipeSchema>;

export const columns: ColumnDef<Recipe>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <Link className="text-link" href={`/m/${row.original.id}`}>
        {row.original.name}
      </Link>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "difficulty",
    header: "Difficulty",
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
              <Link href={`/edit`}>
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
            recipeId={row.original.id}
            open={open}
            onOpenChange={setOpen}
          />
        </>
      );
    },
  },
];
