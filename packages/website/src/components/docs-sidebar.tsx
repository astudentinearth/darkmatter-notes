"use client"

import Link from "next/link"

export function DocsSidebar(){
  return <div className="bg-muted/70 h-full border border-border rounded-xl w-72 flex gap-4 flex-col p-4 shrink-0">
    <span className="text-2xl font-semibold">Darkwrite docs</span>
    <Link href={"/docs/install"}>Installation</Link>
    <Link href={"/docs/backup"}>Backup and restore</Link>
    <Link href={"/docs/creating-themes"}>Create your own theme</Link>
    <Link href={"/docs/customization"}>Customization</Link>
    <Link href={"/docs/workspace-export"}>Export your workspace</Link>
    <Link href={"/docs/shortcuts"}>Keyboard shortcuts</Link>
  </div>
}