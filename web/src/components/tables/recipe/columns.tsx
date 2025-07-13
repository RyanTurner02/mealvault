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
  },  {
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
        return (
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
                    <DropdownMenuItem className="cursor-pointer">Edit</DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">Delete</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }
  },
];
