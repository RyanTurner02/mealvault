import Header from "@/app/components/header";
import { EditRecipeForm } from "@/components/edit-recipe-form";

export default function Page() {
  return (
    <div className="min-h-svh">
      <Header />
      <div className="flex items-center justify-center w-full p-6 md:p-10">
        <div className="w-full max-w-sm">
          <h1 className="mt-2 mb-5 text-4xl font-bold text-center">Edit Recipe</h1>
          <EditRecipeForm />
        </div>
      </div>
    </div>
  );
}
