import React from "react";
import {
  Icon as ChakraIcon,
  IconProps as ChakraIconProps,
} from "@chakra-ui/react";
import Illustrations from "./Assets";

export type IconNames = keyof typeof Illustrations;

export type CustomIcon = {
  type?: "custom";
  name: IconNames;
};

export type ReactIcons = {
  type?: "react-icons";
  as?: any;
} & Omit<ChakraIconProps, "css">;

export type IconProps = CustomIcon | ReactIcons;

const Illustration: React.FC<IconProps> = (props) => {
  if (props.type === "react-icons") {
    return <ChakraIcon {...props} />;
  } else {
    const SVG = Illustrations[(props as CustomIcon).name];
    return <SVG />;
    // return <ChakraIcon {...props} />;
  }
};
export default Illustration;
