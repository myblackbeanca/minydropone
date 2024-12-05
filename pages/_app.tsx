import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return(
    <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>MINY - Create Unforgettable Fan Experiences</title>
      <meta name="description" content="Launch your MINY journey and create meaningful experiences for your superfans. Exclusive events, music launches, and unique fan engagement opportunities." />
      <meta name="keywords" content="MINY, fan engagement, music drops, exclusive events, artist platform" />
      <meta property="og:title" content="MINY - Create Unforgettable Fan Experiences" />
      <meta property="og:description" content="Launch your MINY journey and create meaningful experiences for your superfans." />
      <meta property="og:type" content="website" />
        </Head>
    <Component {...pageProps} />
    </>
  );
}
