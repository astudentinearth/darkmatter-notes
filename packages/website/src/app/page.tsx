import { Nav } from "@/components/nav";

export default function Home() {
  return (
    <div className="bg-background">
      <Nav/>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        Hello world!
      </main>
      <footer className="">

      </footer>
    </div>
  );
}
