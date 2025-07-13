import Header from "@/app/components/header";
import { columns, Recipe } from "@/components/tables/recipe/columns";
import { DataTable } from "@/components/tables/recipe/data-table";

const getData = async (): Promise<Recipe[]> => {
  return [
    {
      id: "1",
      name: "Spaghetti Carbonara",
      category: "Pasta",
      difficulty: "Easy",
      prepTime: "15 minutes",
      cookTime: "30 minutes",
      servings: 4,
      actions: "Edit | Delete",
    },
    {
      id: "2",
      name: "Chicken Curry",
      category: "Curry",
      difficulty: "Medium",
      prepTime: "20 minutes",
      cookTime: "45 minutes",
      servings: 4,
      actions: "Edit | Delete",
    },
    {
      id: "3",
      name: "Beef Stroganoff",
      category: "Beef",
      difficulty: "Hard",
      prepTime: "30 minutes",
      cookTime: "1 hour",
      servings: 4,
      actions: "Edit | Delete",
    },
  ];
};

export default async function Home() {
  const data = await getData();

  return (
    <div>
      <Header />
      <main className="w-6/12 mx-auto">
        <h1 className="mt-2 mb-5 text-4xl font-bold text-center">My Recipes</h1>
        <DataTable columns={columns} data={data} />
      </main>
    </div>
  );
}
