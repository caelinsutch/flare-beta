import React from "react";
import {
  Icon as ChakraIcon,
  IconProps as ChakraIconProps,
} from "@chakra-ui/react";
import Icons from "./Assets";

export type IconNames = keyof typeof Icons;

export type CustomIcon = {
  type?: "custom";
  name: IconNames;
};

export type ReactIcons = {
  type?: "react-icons";
  as?: any;
} & Omit<ChakraIconProps, "css">;

export type IconProps = CustomIcon | ReactIcons;

const Icon: React.FC<IconProps> = (props) => {
  if (props.type === "react-icons") {
    return <ChakraIcon {...props} />;
  } else {
    const SVG = Icons[props.name];
    return <SVG />;
  }
};
export default Icon;
