import Image from "next/image";
import { ComponentPropsWithRef } from "react";

import { Logos } from "@/assets/images";

type Props = Omit<ComponentPropsWithRef<typeof Image>, "alt" | "src">;
export const TownLogo = ({ width = 150, ...rest }: Props) => (
  <Image alt="logo" src={Logos.town} width={width} {...rest} />
);

export const DSWDLogo = ({ width = 150, ...rest }: Props) => (
  <Image alt="logo" src={Logos.dswd} width={width} {...rest} />
);
