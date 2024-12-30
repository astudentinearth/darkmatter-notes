import path from "path";
import fs from "fs";
import {recursiveKeys} from "@darkwrite/common"
const __dirname = import.meta.dirname; // polyfill __dirname
const LOCALES_PATH = path.resolve(__dirname, "../src/locales");

const getTranslations = () => {
  const dirs = fs.readdirSync(LOCALES_PATH);
  const tr = [];
  for(const dir of dirs){
    if(!fs.existsSync(path.join(LOCALES_PATH, dir, "translation.json"))) continue;
    console.log("Found locale:", dir);
    const contents = fs.readFileSync(path.join(LOCALES_PATH, dir, "translation.json"), {encoding: "utf-8"});
    const json = JSON.parse(contents);
    tr.push({lang: dir, json})
  }
  return tr;
}

const translations = getTranslations();
const keyMaps = translations.map(({lang, json})=>{
  return {lang, keys: recursiveKeys(json, (val)=>typeof val === "string")};
})

for(const keymap of keyMaps){
  console.log(`${keymap.lang} has ${keymap.keys.length} keys.`)
}