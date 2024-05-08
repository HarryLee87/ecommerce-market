export default function Home() {
  return (
    <main className="bg-gray-100 sm:bg-gray-300 md:bg-green-100 lg:bg-cyan-100 xl:bg-orange-100 2xl:bg-purple-100 h-screen flex items-center justify-center p-5">
      <div className="bg-white shadow-lg p-5 rounded-2xl w-full max-w-screen-sm flex md:flex-row flex-col gap-3">
        {['Harry', 'Me', 'You', 'Yourself', ''].map((person, index) => (
          <div key={index} className="flex items-center group gap-5">
            {/* *:animate-pulse" */}
            {/* border-b-2 pb-5 last:pb-0 last:border-0 */}
            {/* odd:bg-gray-100 even:bg-cyan-100 p-2.5 rounded-xl */}
            <div className="size-10 bg-blue-400 rounded-full" />
            {/* <div className="w-40 h-4 rounded-full bg-gray-400" />
            <div className="w-20 h-4 rounded-full bg-gray-400" /> */}
            <span className="text-lg font-medium empty:w-24 empty:h-5 empty:rounded-full empty:animate-pulse empty:bg-gray-300 group-hover:text-red-500">
              {person}
            </span>
            <div className="size-6 bg-red-500 text-white flex items-center justify-center rounded-full relative">
              <span className="z-10">{index}</span>
              <div className="size-6 bg-red-500 rounded-full absolute animate-ping" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
