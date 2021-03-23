import { ReactElement, useState } from "react";
import HeaderWhite from "@/components/sections/HeaderWhite";
import Head from "next/head";
import { Flex, Box, SimpleGrid } from "@chakra-ui/react";
import { ButtonSecondaryVariant } from "@/components/core/Button";
import { Divider } from "@chakra-ui/react";
import { Heading4 } from "@/components/core/Text";
import { LgSearchResult, SmSearchResult } from "@/components/SearchResult";
import { ListingType } from "../src/types";

interface SearchProps {
  location: string;
}

function Search(props: SearchProps): ReactElement {
  const { location } = props;
  const [getListings, setListings] = useState([]);
  return (
    <>
      <Head>
        <title>Yōkoso</title>
        <meta name="description" content="ようこそ. Discover your new home." />
      </Head>
      <HeaderWhite />
      <Flex
        paddingTop={["170px", "170px", "170px", "78px", "78px"]}
        column={2}
        height="100vh"
        bg="white"
      >
        <Box flex="1" row={3} overflowY="scroll">
          <Box flex="1" p="5">
            <Heading4>Listings in {location}</Heading4>
          </Box>
          <SimpleGrid flex="1" p="4" spacing={[0, 0, 1, 4, 4]} columns={4}>
            <ButtonSecondaryVariant
              padding="9px"
              display={["none", "none", "block", "block", "block"]}
            >
              Price
            </ButtonSecondaryVariant>
            <ButtonSecondaryVariant
              display={["none", "none", "block", "block", "block"]}
              padding="9px"
            >
              Rooms
            </ButtonSecondaryVariant>
            <ButtonSecondaryVariant
              display={["none", "none", "block", "block", "block"]}
              padding="9px"
            >
              Bathrooms
            </ButtonSecondaryVariant>
            <ButtonSecondaryVariant padding="9px">Other</ButtonSecondaryVariant>
          </SimpleGrid>
          <Divider />
          <Box flex="2" overflow="auto">
            {getListings.map((listing: ListingType) => (
              <LgSearchResult
                imageUrl={listing.imageUrl}
                location={listing.location}
                price={listing.price}
                numBaths={listing.numBaths}
                numBeds={listing.numBeds}
                id={listing.id}
                title={listing.title}
                display={["none", "block", "block", "block", "block"]}
                width="100%"
              />
            ))}
          </Box>
          <Box flex="2" paddingTop={4} overflow="auto">
            {getListings.map((listing: ListingType) => (
              <SmSearchResult
                imageUrl={listing.imageUrl}
                location={listing.location}
                price={listing.price}
                numBaths={listing.numBaths}
                numBeds={listing.numBeds}
                id={listing.id}
                title={listing.title}
                display={["block", "none", "none", "none", "none"]}
                width="100%"
              />
            ))}
          </Box>
        </Box>
        <Box
          flex="1.25"
          display={["none", "none", "block", "block", "block"]}
        ></Box>
      </Flex>
    </>
  );
}

export default Search;
