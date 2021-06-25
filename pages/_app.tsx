import React from "react";
import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Head from "next/head";
import { Provider } from "react-redux";
import { store } from "../src/Redux";

const theme = extendTheme({
  fonts: {
    body: "Roboto Mono, monospace",
    mono: "Menlo, monospace",
  },
});

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <main>
          <Component {...pageProps} />
        </main>
      </Provider>
    </ChakraProvider>
  </>
);

export default App;
