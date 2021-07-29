import React from "react";

import { Box, Spinner } from "@chakra-ui/react";

const LoadingScreen = () => {
  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Spinner size="xl" thickness="4px" color="brand.500" />
    </Box>
  );
};

export default LoadingScreen;
