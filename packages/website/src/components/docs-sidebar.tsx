"use client";

import Link from "next/link";
import { DocumentationLink } from "./docs-link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export function DocsSidebar() {
  return (
    <div className=" h-full w-72 flex flex-col p-2 shrink-0">
      <div className="text-xl shrink-0 font-semibold p-2 pb-4 flex items-center gap-2">
        <Image src={"/darkwrite_icon.png"} alt="logo" width={32} height={32} />
        <span>Docs</span>
      </div>
      <DocumentationLink href={"/docs/install"}>
        ⬇️ &nbsp;Installation
      </DocumentationLink>
      <DocumentationLink href={"/docs/backup"}>
        📦 &nbsp;Backup and restore
      </DocumentationLink>
      <DocumentationLink href={"/docs/creating-themes"}>
        🎨 &nbsp;Create your own theme
      </DocumentationLink>
      <DocumentationLink href={"/docs/customization"}>
        🖌️ &nbsp;Customization
      </DocumentationLink>
      <DocumentationLink href={"/docs/workspace-export"}>
        📃 &nbsp;Export your workspace
      </DocumentationLink>
      <DocumentationLink href={"/docs/shortcuts"}>
        ⌨️ &nbsp;Keyboard shortcuts
      </DocumentationLink>
      <div className="grow"></div>
      <Link
        className="p-2 rounded-[8px] flex gap-2 items-center shrink-0 hover:bg-muted/30 cursor-default"
        href={"/"}
      >
        <ArrowLeft />
        Return to home page
      </Link>
    </div>
  );
}
