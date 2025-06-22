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
      cookTime: "30 minutes",
      servings: 4,
      actions: "Edit | Delete",
    },
    {
      id: "2",
      name: "Chicken Curry",
      category: "Curry",
      difficulty: "Medium",
      cookTime: "45 minutes",
      servings: 4,
      actions: "Edit | Delete",
    },
    {
      id: "3",
      name: "Beef Stroganoff",
      category: "Beef",
      difficulty: "Hard",
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
      <main>
        <h1 className="mt-2 mb-5 text-4xl font-bold text-center">My Recipes</h1>
        <DataTable columns={columns} data={data} />
      </main>
    </div>
  );
}
