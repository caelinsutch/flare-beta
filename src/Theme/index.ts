import { extendTheme } from "@chakra-ui/react";

import components from "./components";

const theme = extendTheme({
  fonts: {
    body: "Roboto Mono, monospace",
    mono: "Menlo, monospace",
  },
  components,
});

export default theme;
