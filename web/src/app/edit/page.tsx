import Header from "@/app/components/header";
import { EditRecipeForm } from "@/components/edit-recipe-form";

export default function EditPage() {
  return (
    <div>
      <Header />
      <main className="w-6/12 mx-auto">
        <h1 className="mt-2 mb-5 text-4xl font-bold text-center">Edit Recipe</h1>
        <EditRecipeForm />
      </main>
    </div>
  );
}
