import { Glob } from "bun";

const packagesGlob = new Glob("./packages/*/package.json");

type Dependency = {
  dependent: string,
  version: string
}

const deps: {[key: string]: Array<Dependency>} = {}

// load dependencies
for await (const packagePath of packagesGlob.scan(".")){
  const file = Bun.file(packagePath);
  const json = JSON.parse(await file.text());
  if(json.dependencies == null) continue;
  for(const dep in json.dependencies){
    if(deps[dep] == null) deps[dep] = [];
    deps[dep].push({dependent: packagePath, version: json.dependencies[dep]})
  }
  if(json.devDependencies == null) continue;
  for(const dep in json.devDependencies){
    if(deps[dep] == null) deps[dep] = [];
    deps[dep].push({dependent: packagePath, version: json.devDependencies[dep]})
  }
}

for(const pkg in deps){
  if(new Set(deps[pkg].map(x=>x.version)).size > 1){
    console.log(pkg, "has multiple versions.")
  }
}
