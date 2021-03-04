import type { AppProps } from "next/app";
import { ChakraProvider, Flex, CSSReset } from "@chakra-ui/react";
import Header from "@/components/sections/Header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Flex direction='column'>
        <CSSReset />
        <Header />
        <Component {...pageProps} />
			</Flex>
    </ChakraProvider>
  );
}

export default MyApp;
