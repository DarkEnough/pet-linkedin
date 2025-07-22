export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold">Welcome to Pet LinkedIn!</h1>
      <p className="mt-4 text-lg">Ready to create a LinkedIn for your pet?</p>
      <a
        href="/create"
        className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-lg font-semibold shadow transition-colors"
      >
        Create a Pet Profile
      </a>
    </div>
  );
}
