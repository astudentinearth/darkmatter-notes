import Link from "next/link";
import Image from "next/image";

export async function Nav() {
  return (
    <nav className="bg-nav/80 z-50 fixed backdrop-blur-md left-1/2 -translate-x-1/2 p-3 border border-[#c1c1c1]/25 rounded-[18px] flex gap-3 top-3">
      <Link href={"/"}>
        <Image src={"/darkwrite_icon.png"} alt="Logo" width={40} height={40} />
      </Link>
      <div className="h-10 flex justify-center items-center p-3 select-none hover:bg-white/10 transition-colors rounded-[6px]">
        Resources
        <div className="absolute hidden bg-nav border-[#c1c1c1]/25 p-3 border rounded-[18px] top-[4.5rem]">
          User guide
        </div>
      </div>
      <Link
        href={"/download"}
        className="bg-primary h-10 p-3 flex items-center justify-center rounded-[6px] hover:brightness-125 transition-[filter]"
      >
        Download
      </Link>
    </nav>
  );
}
