import React from "react";

import { Box, Text } from "@chakra-ui/react";

const LeftSide: React.FC = () => (
  <Box
    flex={{ base: undefined, md: 1 }}
    display="flex"
    alignItems={{ base: undefined, md: "center" }}
    justifyContent={{ md: "center" }}
    pb={{ base: 8, md: 0 }}
  >
    <Text
      as="h1"
      fontSize={{ base: "4xl", md: "148px" }}
      color="white"
      transform={{ base: undefined, md: "rotate(-90deg)" }}
      fontWeight="bold"
      letterSpacing="widest"
    >
      PLOTS
    </Text>
  </Box>
);

export default LeftSide;
