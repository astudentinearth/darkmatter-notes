import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@renderer/components/ui/select";
import { Language, LanguageNameMap } from "@renderer/types/lang";

export default function LanguageSelect({
  lang,
  onValueChange,
}: {
  lang: Language;
  onValueChange?: (val: Language) => void;
}) {
  return (
    <Select value={lang} onValueChange={onValueChange}>
      <SelectTrigger>{LanguageNameMap[lang]}</SelectTrigger>
      <SelectContent>
        <SelectItem value="tr">Türkçe</SelectItem>
        <SelectItem value="en">English</SelectItem>
      </SelectContent>
    </Select>
  );
}
