import _ from "lodash";

const _platforms = {
  Windows_NT: "Windows_NT",
  Linux: "Linux",
  Darwin: "Darwin",
  Web: "Web",
}

function excludePlatform(exclusion: PlatformOption){
  const keys = (Object.keys(_platforms) as Platform[]);
  if(Array.isArray(exclusion)){
    return _.remove(keys, n => exclusion.includes(n));
  }
  return _.remove(keys, n => n === exclusion);
}

export const Platforms = {
  ..._platforms,
  Desktop: ["Windows_NT", "Darwin", "Linux"] satisfies Platform[],
  except: excludePlatform
}

export type Platform = keyof typeof _platforms;
export type PlatformOption = Platform | Platform[]
