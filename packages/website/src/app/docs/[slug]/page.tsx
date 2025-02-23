import { DocsSidebar } from "@/components/docs-sidebar";
import "./docs.css";

export default async function DocsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const { default: Page } = await import(`@/docs/${slug}.mdx`);
  return (
    <div className="absolute w-full h-full flex p-2 overflow-x-hidden">
      <DocsSidebar />
      <div className="px-8 py-4 h-full overflow-auto">
        <Page />
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return [
    { slug: "backup" },
    { slug: "creating-themes" },
    { slug: "customization" },
    { slug: "install" },
    { slug: "shortcuts" },
    { slug: "workspace-export" },
  ];
}
