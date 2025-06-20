import Header from "@/app/components/header";
import { CreateRecipeForm } from "@/components/create-recipe-form";

export default function Page() {
  return (
    <div className="min-h-svh">
      <Header />
      <div className="flex items-center justify-center w-full p-6 md:p-10">
        <div className="w-full max-w-sm">
          <CreateRecipeForm />
        </div>
      </div>
    </div>
  );
}
