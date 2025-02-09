import { Card } from "@/components/card";
import { Nav } from "@/components/nav";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-background">
      <Image
        src="glow.svg"
        className="absolute -translate-y-1/4 z-10 pointer-events-none"
        fill
        alt="glow"
      ></Image>
      <Nav />
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start z-20">
        <div className="w-full flex flex-col items-center mt-40">
          <h1 className="text-center text-7xl font-bold">
            A notebook
            <br />
            that is
            <span className="bg-clip-text bg-linear-to-r text-transparent from-[#338BFF] to-[#79A3DB]">
              {" "}
              truly yours.
            </span>
          </h1>
          <span className="text-center text-2xl mt-6">
            Take notes the way you want, without all the distractions.
          </span>
          <span className="text-center text-2xl">
            <span className="text-theme-2">Feature packed, </span>
            <span className="text-theme-4">customizable, </span>
            and <span className="text-theme-3">open source.</span>
          </span>
          <Link
            href={"/download"}
            className="bg-primary h-10 p-3 mt-4 flex items-center w-fit justify-center rounded-[6px] hover:brightness-125 transition-[filter]"
          >
            Download for free
          </Link>
          <Image
            className="object-contain static"
            width={1920}
            height={643}
            alt="landing"
            src="/landing_image.png"
          />
        </div>
        <div className="flex flex-col bg-alternate w-full items-center pt-16 pb-16 px-6">
          <h1 className="text-center text-5xl font-bold">
            Type it out with <span className="text-theme-3">ease.</span>
          </h1>
          <span className="text-center text-2xl mt-3">
            Write down anything with an editor full of features.
          </span>
          <span className="text-center text-2xl">
            Make your notes fancy with{" "}
            <span className="text-theme-2">lists, </span>
            <span className="text-theme-4">text formatting, </span>
            and <span className="text-theme-3">images.</span>
          </span>
          <Image
            className="rounded-[8px] max-w-[1000px] w-full border border-[#434343] drop-shadow-lg mt-5"
            src="/img2.png"
            alt="editor"
            width={1000}
            height={992}
          />
        </div>
        <div className="flex flex-col w-full items-center pt-16 pb-16 px-6">
          <h1 className="text-center text-5xl font-bold">
            <span className="text-theme-4">Co</span>
            <span className="text-theme-3">lor</span>
            <span className="text-theme-2">ful,</span>
            <span className="text-theme-1"> really.</span>
          </h1>
          <span className="text-center text-2xl mt-3">
            Pick the theme and font you love the most. Everything is up to you.
          </span>
          <Image
            className="w-full mt-5 max-w-[900px]"
            src={"/themes.png"}
            alt="themes"
            width={900}
            height={777}
          ></Image>
        </div>
        <div className="w-full bg-alternate py-16 px-6 flex flex-col items-center">
          <h1 className="text-center text-5xl font-bold">
            Open and <span className="text-theme-2">private.</span>
          </h1>
          <div className="flex flex-col gap-4 mt-6 max-w-[600px]">
            <Card className="flex flex-col gap-2 w-full">
              <span className="font-semibold text-3xl">No server.</span>
              <span className="text-xl opacity-80">
                Everything is offline. Never worry about losing access.
              </span>
            </Card>
            <Card className="flex flex-col gap-2 w-full">
              <span className="font-semibold text-3xl">No data collected.</span>
              <span className="text-xl opacity-80">
                Only you will know what&apos;s written in those pages.
              </span>
            </Card>
            <Card className="flex flex-col gap-2 w-full">
              <span className="font-semibold text-3xl">Open source.</span>
              <span className="text-xl opacity-80">
              You get to know what you run on your device.
              </span>
            </Card>
          </div>
        </div>
      </main>
      <footer className=""></footer>
    </div>
  );
}
