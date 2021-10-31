import "../css/tailwind.css";
import Head from "next/head";
import noiseImg from "../public/img/badboidtreasure.png";

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
      <div className="sticky inset-0 z-10 border-t-4 border-red-500"></div>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
