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

const App = ({ Component, pageProps }: AppProps) => {
  // const title = 'Flare - Find Berkeley Parties';
  // const description = 'Flare makes it easy to find and host awesome parties in Berkeley. Join today for exclusive access to great parties near you.'

  const title = "Berkeley. June 26th. Jungle Juice";
  const description =
    "RSVP for the best Berkeley parties. Starting June 26th, get exclusive access today.";

  return (
    <>
      <Head>
        <title>Flare - Find Berkeley Parties</title>
        <meta name="title" content={title} />
        <meta name="description" content={description} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://beta.flaresocial.app/" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="https://i.imgur.com/fp2QjfP.png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://beta.flaresocial.app/" />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta
          property="twitter:image"
          content="https://i.imgur.com/fp2QjfP.png"
        />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css?family=Roboto Mono"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
      window['_fs_debug'] = false;
        window['_fs_host'] = 'fullstory.com';
        window['_fs_script'] = 'edge.fullstory.com/s/fs.js';
        window['_fs_org'] = '13K1HS';
        window['_fs_namespace'] = 'FS';
        (function(m,n,e,t,l,o,g,y){
        if (e in m) {if(m.console && m.console.log) { m.console.log('FullStory namespace conflict. Please set window["_fs_namespace"].');} return;}
        g=m[e]=function(a,b,s){g.q?g.q.push([a,b,s]):g._api(a,b,s);};g.q=[];
        o=n.createElement(t);o.async=1;o.crossOrigin='anonymous';o.src='https://'+_fs_script;
        y=n.getElementsByTagName(t)[0];y.parentNode.insertBefore(o,y);
        g.identify=function(i,v,s){g(l,{uid:i},s);if(v)g(l,v,s)};g.setUserVars=function(v,s){g(l,v,s)};g.event=function(i,v,s){g('event',{n:i,p:v},s)};
        g.anonymize=function(){g.identify(!!0)};
        g.shutdown=function(){g("rec",!1)};g.restart=function(){g("rec",!0)};
        g.log = function(a,b){g("log",[a,b])};
        g.consent=function(a){g("consent",!arguments.length||a)};
        g.identifyAccount=function(i,v){o='account';v=v||{};v.acctId=i;g(o,v)};
        g.clearUserCookie=function(){};
        g.setVars=function(n, p){g('setVars',[n,p]);};
        g._w={};y='XMLHttpRequest';g._w[y]=m[y];y='fetch';g._w[y]=m[y];
        if(m[y])m[y]=function(){return g._w[y].apply(this,arguments)};
        g._v="1.3.0";
      })(window,document,window['_fs_namespace'],'script','user');`,
          }}
        />
      </Head>
      <ChakraProvider theme={theme}>
        <Provider store={store}>
          <main>
            <Component {...pageProps} />
          </main>
        </Provider>
      </ChakraProvider>
    </>
  );
};

export default App;
