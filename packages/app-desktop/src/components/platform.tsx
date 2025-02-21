import React, { ReactNode } from "react";
import { Platform, PlatformOption } from "@renderer/types/platform";

export interface PlatformSpecificComponentProps {
  children?: ReactNode | ReactNode[],
  platform: PlatformOption
}

export function Platform(props: PlatformSpecificComponentProps){

  return <>
    {props.children}
  </>
}