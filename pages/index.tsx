import { ReactElement } from "react";
import Head from "next/head";
import { Flex, Box } from "@chakra-ui/react";

import SearchInput from "@/components/core/SearchInput";
import { Heading1 } from "@/components/core/Text";
import Header from "@/components/sections/Header";
import { ContainerPrimary } from "@/components/core/Layout";

function HomePage(): ReactElement {
  return (
    <>
      <Head>
        <title>Yōkoso</title>
        <meta name="description" content="ようこそ. Discover your new home." />
      </Head>

      <Flex
        height="100vh"
        bgImage="url('/bg1.jpg')"
        bgRepeat="no-repeat"
        bgSize="cover"
        direction="column"
      >
        <Header darkTheme />

        <ContainerPrimary marginY="auto">
          <Flex justify="center">
            <Box width={[300, 400, 500, 550, 600, 650]}>
              <SearchInput
                placeholder="Where are you staying?"
                ariaLabel="Search for homes based on location"
              />
            </Box>
          </Flex>
          <Box marginTop="100px">
            <Heading1 fontSize={[48, 60, 60, 96]} color="white">
              Discover your
              <br />
              new home
            </Heading1>
          </Box>
        </ContainerPrimary>
      </Flex>
    </>
  );
}

export default HomePage;
