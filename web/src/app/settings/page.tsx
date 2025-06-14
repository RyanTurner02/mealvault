"use client";

import Header from "@/app/components/header";
import { useUserContext } from "@/app/hooks/UserHook";
import { useRouter } from "next/navigation";

export default function Settings() {
  const userContext = useUserContext();
  const router = useRouter();

  if (!userContext?.isLoading && !userContext?.user) {
    router.push("/login");
  }

  return (
    <>
      <Header />
      { !userContext?.isLoading &&
        userContext?.user && (
        <main>
          <div className="flex justify-center">
            <div className="w-11/12 p-5 mt-5 border-2 border-blue-300 rounded-lg sm:w-8/12 md:w-8/12 lg:w-6/12 xl:w-4/12">
              <h1 className="mb-3 text-4xl font-bold text-center">Settings</h1>
                <div className="flex flex-col mb-3">
                <button className="p-1 border border-gray-400 rounded-sm hover:bg-gray-200 text-start" type="button">
                  <div className="name-field">
                    Name
                  </div>
                  <div className="text-gray-500">
                    {userContext?.user?.name}
                  </div>
                </button>
                </div>
                <div className="flex flex-col mb-3">
                  <button className="p-1 border border-gray-400 rounded-sm hover:bg-gray-200 text-start" type="button">
                    <div className="email-field">
                      Email Address
                    </div>
                    <div className="text-gray-500">
                      {userContext?.user?.email}
                    </div>
                  </button>
                </div>
                <div className="flex flex-col">
                  <button className="p-1 border border-gray-400 rounded-sm hover:bg-gray-200 text-start" type="button">Password</button>
                </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
}
