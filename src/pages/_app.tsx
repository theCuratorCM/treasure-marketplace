import "../css/tailwind.css";

import * as React from "react";
import Head from "next/head";
import { ChainId, DAppProvider } from "@yuyao17/corefork";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";
import { resolveValue, Toaster } from "react-hot-toast";
import { Transition } from "@headlessui/react";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/outline";
import { SSRProvider } from "@react-aria/ssr";

import Header from "../components/Header";
import { Spinner } from "../components/Spinner";
import { MagicProvider } from "../context/magicContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

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
      <SSRProvider>
        <DAppProvider config={config}>
          <MagicProvider>
            <QueryClientProvider client={queryClient}>
              <div className="min-h-screen relative overflow-hidden dark:bg-black">
                {Component.showSamuraiBg && (
                  <>
                    <img
                      src={"/img/samurai1.png"}
                      className="absolute top-16 -left-48 sm:top-20 sm:-left-12 opacity-20 dark:filter dark:invert"
                    />
                    <img
                      src={"/img/samurai2.png"}
                      className="absolute opacity-20 top-1/2 -right-36 sm:-right-12 dark:filter dark:invert"
                    />
                  </>
                )}
                <div className="sticky inset-0 z-10 border-t-4 border-red-500"></div>
                {Component.disableHeader ? null : <Header />}
                <Component {...pageProps} />
              </div>
              <ReactQueryDevtools />
            </QueryClientProvider>
          </MagicProvider>
        </DAppProvider>
        <Toaster position="bottom-left">
          {(t) => (
            <Transition
              show={t.visible}
              as={React.Fragment}
              enter="transform ease-out duration-300 transition"
              enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
              enterTo="translate-y-0 opacity-100 sm:translate-x-0"
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
                <div className="p-4">
                  <div className="flex justify-center items-center">
                    <div className="flex-shrink-0">
                      {(() => {
                        switch (t.type) {
                          case "success":
                            return (
                              <CheckCircleIcon className="h-6 w-6 text-green-500" />
                            );
                          case "error":
                            return (
                              <ExclamationCircleIcon className="h-6 w-6 text-red-500" />
                            );
                          case "loading":
                            return (
                              <Spinner className="h-6 w-6 text-blue-500" />
                            );
                          default:
                            return (
                              <CheckCircleIcon className="h-6 w-6 text-yellow-500" />
                            );
                        }
                      })()}
                    </div>
                    <div className="ml-3 w-0 flex-1">
                      <p className="text-sm text-gray-500">
                        {resolveValue(t.message, t)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Transition>
          )}
        </Toaster>
      </SSRProvider>
    </>
  );
}

// 'success' | 'error' | 'loading' | 'blank' | 'custom'

export default MyApp;
