import Header from "@/app/components/header";
import { EditRecipeForm } from "@/components/edit-recipe-form";

export default function Page() {
  return (
    <div className="min-h-svh">
      <Header />
      <div className="flex items-center justify-center w-full p-6 md:p-10">
        <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl">
          <EditRecipeForm />
        </div>
      </div>
    </div>
  );
}
