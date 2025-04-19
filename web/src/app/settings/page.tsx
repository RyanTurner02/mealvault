import Header from "@/app/components/header";

export default function Settings() {
  return (
    <>
      <Header />
      <main>
        <div className="flex justify-center">
          <div className="border-2 border-blue-300 rounded-lg w-11/12 sm:w-8/12 md:w-8/12 lg:w-6/12 xl:w-4/12 mt-5 p-5">
            <h1 className="text-4xl font-bold text-center mb-3">Settings</h1>
              <div className="flex flex-col mb-3">
               <button className="border border-gray-400 hover:bg-gray-200 rounded-sm p-1 text-start" type="button">
                <div className="name-field">
                  Name
                </div>
                <div className="text-gray-500">
                  lorem ipsum
                </div>
               </button>
              </div>
              <div className="flex flex-col mb-3">
                <button className="border border-gray-400 hover:bg-gray-200 rounded-sm p-1 text-start" type="button">
                  <div className="email-field">
                    Email Address
                  </div>
                  <div className="text-gray-500">
                    lorem ipsum
                  </div>
                </button>
              </div>
              <div className="flex flex-col">
                <button className="border border-gray-400 hover:bg-gray-200 rounded-sm p-1 text-start" type="button">Password</button>
              </div>
          </div>
        </div>
      </main>
    </>
  );
}
