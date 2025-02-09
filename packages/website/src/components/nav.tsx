import Link from "next/link";
import Image from "next/image";

export async function Nav() {
  return (
    <nav className="bg-nav/80 z-50 fixed backdrop-blur-md left-1/2 -translate-x-1/2 p-3 border border-[#c1c1c1]/25 rounded-[18px] flex gap-3 top-3">
      <Link href={"/"}>
        <Image src={"/darkwrite_icon.png"} alt="Logo" width={40} height={40} />
      </Link>
      <Link href={"https://github.com/astudentinearth/darkwrite"} className="h-10 flex cursor-default justify-center items-center p-3 select-none hover:bg-white/10 transition-colors rounded-[6px]">
        Source code
      </Link>
      <Link
        href={"/download"}
        className="bg-primary h-10 p-3 flex items-center cursor-default justify-center rounded-[6px] hover:brightness-125 transition-[filter]"
      >
        Download
      </Link>
    </nav>
  );
}
