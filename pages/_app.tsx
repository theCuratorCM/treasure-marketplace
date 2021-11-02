import "../css/tailwind.css";

import Head from "next/head";

import samurai1Img from "../public/img/samurai1.png";
import samurai2Img from "../public/img/samurai2.png";

import Header from "../components/Header";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Treasure Farm</title>
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
    </>
  );
}

export default MyApp;
