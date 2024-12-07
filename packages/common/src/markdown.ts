import {Converter} from "showdown";
export const MarkdownConverter = {
  convertMarkdownToHTML: (markdown: string)=>{
    const converter = new Converter(),
    html = converter.makeHtml(markdown);
    return html;
  }
}