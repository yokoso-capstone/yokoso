import { useEffect } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@/src/theme";
import "rc-slider/assets/index.css";
import "focus-visible/dist/focus-visible";
import "react-datepicker/dist/react-datepicker.css";
import "../styling/date-picker.css";

import firebase from "firebase/app";
import "firebase/analytics";
import firebaseConfig from "@/src/firebaseConfig";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const initAnalytics = async () => {
  const isSupported = await firebase.analytics.isSupported();

  if (firebaseConfig.measurementId && isSupported) {
    firebase.analytics();
  }
};

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    initAnalytics();
  }, []);

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <ChakraProvider theme={theme}>
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
          font-weight: 400;
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
          font-weight: 700;
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
