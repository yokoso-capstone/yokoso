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
      <Header darkTheme={true} searchInput={false} isWide={false}/>
      <Flex
        align="center"
        bgImage="url('/bg1.jpg')"
        height={[
          "calc(100vh - 110px)",
          "calc(100vh - 110px)",
          "calc(100vh - 78px)",
          "calc(100vh - 78px)",
          "calc(100vh - 78px)",
        ]}
        bgPosition="25% 75%"
        bgRepeat="no-repeat"
        bgSize="cover"
        direction="column"
      >
        <ContainerPrimary align="center" maxWidth="1980px">
          <Box marginTop="100px" width={[300, 400, 500, 550, 600, 650]}>
            <SearchInput
              placeholder="Where are you staying?"
              ariaLabel="Search for homes based on location"
              onSubmit={() => undefined}
            />
          </Box>
          <Box marginTop="7%" align="left">
            <Heading1 fontSize={[40, 50, 50, 55, 80, 96]} color="white">
              Discover your
            </Heading1>
            <Heading1 fontSize={[40, 50, 50, 55, 80, 96]} color="white">
              new home
            </Heading1>
          </Box>
        </ContainerPrimary>
      </Flex>
    </>
  );
}

export default HomePage;
