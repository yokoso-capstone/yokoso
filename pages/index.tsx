import { ReactElement } from "react";
import Head from "next/head";
import { Flex, Box, Stack } from "@chakra-ui/react";

import SearchInput from "@/components/core/SearchInput";
import { Heading1 } from "@/components/core/Text";

function HomePage(): ReactElement {
  return (
    <>
      <Head>
        <title>Yōkoso</title>
        <meta name="description" content="ようこそ. Discover your new home." />
      </Head>
      <Flex
        align="center"
        bgImage="url('/bg1.jpg')"
        height="calc(100vh - 110px)"
        bgPosition="25% 75%"
        bgRepeat="no-repeat"
        bgSize="cover"
        direction="column"
      >
        <Box marginTop="100px" width="30vw">
          <SearchInput
            placeholder="Where are you staying?"
            ariaLabel="Search for homes based on location"
            onSubmit={() => undefined}
          />
        </Box>
        <Box marginRight="55%" marginTop="7%">
          <Heading1 color="White">Discover your</Heading1>
          <Heading1 color="White">new home</Heading1>
        </Box>
      </Flex>
    </>
  );
}

export default HomePage;
