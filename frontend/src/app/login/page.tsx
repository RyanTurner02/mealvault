import Header from "@/app/components/header";

export default function Login() {
  return (
    <>
      <Header />
      <main>
        <div className="flex justify-center">
          <div className="border-2 border-blue-300 rounded-lg w-11/12 sm:w-8/12 md:w-8/12 lg:w-6/12 xl:w-4/12 mt-5 p-5">
            <h1 className="text-4xl font-bold text-center mb-3">Login</h1>
            <form className="flex flex-col">
              <div className="flex flex-col mb-3">
                <label htmlFor="email">Email Address</label>
                <input className="border border-gray-400 rounded-sm p-1" id="email" type="text" placeholder="Email Address" required />
              </div>
              <div className="flex flex-col mb-7">
                <label htmlFor="password">Password</label>
                <input className="border border-gray-400 rounded-sm p-1" id="password" type="password" placeholder="Password" required />
              </div>
              <button className="rounded-full text-white bg-blue-500 hover:bg-blue-600 px-3 py-2">Login</button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}