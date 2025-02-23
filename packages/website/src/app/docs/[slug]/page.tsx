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
    <div className="absolute w-full h-full flex overflow-x-hidden">
      <DocsSidebar />
      <div className="grow flex bg-muted/70 justify-center">
        <div className="markdown-container px-8 h-full overflow-auto w-full max-w-240">
          <Page />
        </div>
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
