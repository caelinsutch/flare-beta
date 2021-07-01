import React from "react";

import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

import { store } from "@Redux";
import theme from "@Theme";

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
