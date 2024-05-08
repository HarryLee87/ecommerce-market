export default function Home() {
  return (
    <main className="bg-gray-100 sm:bg-gray-300 md:bg-green-100 lg:bg-cyan-100 xl:bg-orange-100 2xl:bg-purple-100 h-screen flex items-center justify-center p-5">
      <div className="bg-white shadow-lg p-5 rounded-2xl w-full max-w-screen-sm flex md:flex-row flex-col gap-4">
        <div className="group flex flex-col">
          <input
            type="email"
            className="bg-gray-100 w-full peer"
            placeholder="Write your email"
          />
          <span className="group-focus-within:peer-invalid:block hidden text-red-500">
            Make sure it is a valid email
          </span>
          <button>Submit</button>
        </div>
      </div>
    </main>
  );
}
