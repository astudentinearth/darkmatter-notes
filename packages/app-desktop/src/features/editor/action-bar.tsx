import { useState } from "react";
import { FavoriteActionButton } from "./action-favorite";
import { CustimzationSheet } from "./customizations/customization-sheet";
import { EditorMenu } from "./editor-menu";

export function ActionBar() {
  const [customizationsOpen, setCustomizationsOpen] = useState(false);

  return (
    <div className="opacity-80 flex gap-1">
      <FavoriteActionButton />
      <CustimzationSheet
        open={customizationsOpen}
        onOpenChange={setCustomizationsOpen}
      />
      <EditorMenu />
    </div>
  );
}
