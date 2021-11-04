import "../css/tailwind.css";

import Head from "next/head";
import { ChainId, DAppProvider } from "@yuyao17/corefork";
import { ReactQueryDevtools } from "react-query/devtools";

import samurai1Img from "../public/img/samurai1.png";
import samurai2Img from "../public/img/samurai2.png";

import Header from "../components/Header";

import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const config = {
  readOnlyChainId: ChainId.Arbitrum,
  readOnlyUrls: {
    [ChainId.Rinkeby]:
      "https://rinkeby.infura.io/v3/62687d1a985d4508b2b7a24827551934",
    [ChainId.Arbitrum]:
      "https://arb-mainnet.g.alchemy.com/v2/gBb4c8M46YRZdoX3xrwbvaOk9CJQk82s",
  },
};

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Treasure Marketplace</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap"
          rel="stylesheet"
        />
      </Head>
      <DAppProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <div className="min-h-screen relative overflow-hidden dark:bg-black">
            {Component.showSamuraiBg && (
              <>
                <img
                  src={samurai1Img.src}
                  className="absolute top-16 -left-48 sm:top-20 sm:-left-12 opacity-20 dark:filter dark:invert"
                />
                <img
                  src={samurai2Img.src}
                  className="absolute opacity-20 top-1/2 -right-36 sm:-right-12 dark:filter dark:invert"
                />
              </>
            )}
            <div className="sticky inset-0 z-10 border-t-4 border-red-500"></div>
            <Header />
            <Component {...pageProps} />
          </div>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </DAppProvider>
    </>
  );
}

export default MyApp;
