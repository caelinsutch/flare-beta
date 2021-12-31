import React, { forwardRef } from "react";

import {
  InputProps as ChakraInputProps,
  Input as ChakraInput,
  Textarea,
  TextareaProps,
  Box,
  Text,
  BoxProps,
} from "@chakra-ui/react";

type IProps = {
  label?: string;
  error?: string;
  info?: string;
  area?: false;
  textColor?: string;
  boxProps?: BoxProps;
  disabled?: boolean;
} & ChakraInputProps;

type AreaProps = {
  label?: string;
  error?: string;
  info?: string;
  area: true;
  textColor?: string;
  boxProps?: BoxProps;
} & TextareaProps;

type InputProps = IProps | AreaProps;

const Input: React.FC<InputProps> = forwardRef(
  (
    { info, label, error, area, textColor = "black", boxProps, ...props },
    ref
  ) => (
    <Box textAlign="left" {...boxProps}>
      <Text
        display={label ? "block" : "none"}
        fontSize="md"
        fontWeight="bold"
        color={textColor}
        mb={2}
      >
        {label}
      </Text>
      {area ? (
        <Textarea ref={ref as any} {...(props as AreaProps)} />
      ) : (
        <ChakraInput
          ref={ref as any}
          backgroundColor="white"
          _hover={{ borderColor: "gray.500" }}
          _focus={{ borderColor: "gray.500" }}
          _placeholder={{ color: "gray.400" }}
          {...(props as IProps)}
        />
      )}
      <Text
        my={1}
        opacity={error || info ? 1 : 0}
        color={error ? "red.500" : textColor}
        fontSize="xs"
      >
        {(error || info) ?? "a"}
      </Text>
    </Box>
  )
);

export default Input;
