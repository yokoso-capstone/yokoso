import type { AppProps } from "next/app";
import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";

import "react-datepicker/dist/react-datepicker.css";
import "../styling/date-picker.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>

      <style jsx global>{`
        @font-face {
          font-family: "Inter";
          font-weight: 300;
          font-style: normal;
          src: url("/fonts/inter/Inter-Light.woff2") format("woff2"),
            url("/fonts/inter/Inter-Light.woff") format("woff"),
            url("/fonts/inter/Inter-Light.otf") format("otf"),
            url("/fonts/inter/Inter-Light.ttf") format("truetype");
        }

        @font-face {
          font-family: "Inter";
          font-weight: normal;
          font-style: normal;
          src: url("/fonts/inter/Inter-Regular.woff2") format("woff2"),
            url("/fonts/inter/Inter-Regular.woff") format("woff"),
            url("/fonts/inter/Inter-Regular.otf") format("otf"),
            url("/fonts/inter/Inter-Regular.ttf") format("truetype");
        }

        @font-face {
          font-family: "Inter";
          font-weight: 500;
          font-style: normal;
          src: url("/fonts/inter/Inter-Medium.woff2") format("woff2"),
            url("/fonts/inter/Inter-Medium.woff") format("woff"),
            url("/fonts/inter/Inter-Medium.otf") format("otf"),
            url("/fonts/inter/Inter-Medium.ttf") format("truetype");
        }

        @font-face {
          font-family: "Inter";
          font-weight: bold;
          font-style: normal;
          src: url("/fonts/inter/Inter-Bold.woff2") format("woff2"),
            url("/fonts/inter/Inter-Bold.woff") format("woff"),
            url("/fonts/inter/Inter-Bold.otf") format("otf"),
            url("/fonts/inter/Inter-Bold.ttf") format("truetype");
        }

        @font-face {
          font-family: "Gilroy";
          font-weight: 800;
          font-style: normal;
          src: url("/fonts/gilroy/Gilroy-ExtraBold.otf") format("otf"),
            url("/fonts/gilroy/Gilroy-ExtraBold.ttf") format("truetype");
        }
      `}</style>
    </>
  );
}

export default MyApp;
