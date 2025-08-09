import Link from "next/link";

interface RecipeNameCellProps {
  recipeId: string;
  recipeName: string;
}

export const RecipeNameCell = ({ recipeId, recipeName }: RecipeNameCellProps) => {
  return (
    <Link className="text-link" href={`/m/${recipeId}`}>
      {recipeName}
    </Link>
  );
};