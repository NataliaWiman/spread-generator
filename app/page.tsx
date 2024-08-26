import SpreadEditor from "@/components/SpreadEditor";

export default function Home() {
  return (
    <main className="flex min-h-screen h-full flex-col items-center justify-center p-4">
      <div className="relative flex justify-center items-center w-full h-full">
        <h1 className="hidden text-center text-xl tracking-widest text-white mb-6">
          Tarot Spread Generator
        </h1>
        <SpreadEditor />
      </div>
    </main>
  );
}
