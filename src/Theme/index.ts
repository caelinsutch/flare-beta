import { extendTheme } from "@chakra-ui/react";

import components from "./components";

const theme = extendTheme({
  fonts: {
    body: "Open Sans, system-ui, sans-serif",
  },
  components,
  colors: {
    brand: {
      "500": "#569CDD",
    },
  },
});

export default theme;
