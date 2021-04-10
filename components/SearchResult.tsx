import { Box, Image, Grid, GridItem } from "@chakra-ui/react";
import { Body1, Caption, Body2 } from "@/components/core/Text";
import { PropertyDes, MultiWeightText } from "@/components/sections/Listings";
import { Listing } from "@/src/api/types";

interface ResultProps {
  listing: Listing;
  num?: number;
  display?: any;
  width?: any;
}

const LgMaxTitleCharacters = 35;
const SmMaxTitleCharacters = 50;
const XsMaxTitleCharacters = 15;

export function LgSearchResult(props: ResultProps) {
  const {
    listing: {
      location: { cityName },
      details: { title, numBeds, numBaths },
      lease: { price },
      images,
    },
    num,
    display,
    width,
  } = props;

  return (
    <Box maxW="3xl" borderRadius="lg" p="5" display={display} w={width}>
      <Grid
        templateColumns="repeat(9, 1fr)"
        templateRows="repeat(2, 1fr)"
        gap={2}
      >
        <GridItem colSpan={3} rowSpan={2}>
          <Box w="100%" h="100%" maxWidth="200px">
            <Image src={images[0]} borderRadius="lg" />
          </Box>
        </GridItem>
        <GridItem colSpan={4} rowSpan={2}>
          <PropertyDes
            numBaths={numBaths}
            numBeds={numBeds}
            title={`${title.substring(0, LgMaxTitleCharacters)}...`}
            location={cityName}
          />
        </GridItem>
        <GridItem rowSpan={1} colSpan={2}>
          <Box position="relative" pt="3">
            <Box
              position="absolute"
              right="8px"
              h="25px"
              w="25px"
              borderRadius="full"
              bg="black"
              textAlign="center"
            >
              <Box position="relative" top="2px">
                <Body2 color="white">{num}</Body2>
              </Box>
            </Box>
          </Box>
        </GridItem>
        <GridItem rowSpan={1} colSpan={2}>
          <Box h="100%" position="relative">
            <Box position="absolute" bottom="8px" right="8px">
              <MultiWeightText bold={price.toString()} normal="/month" />
            </Box>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
}

export function SmSearchResult(props: ResultProps) {
  const {
    listing: {
      location: { cityName },
      details: { title, numBeds, numBaths },
      lease: { price },
      images,
    },
    display,
    width,
  } = props;

  return (
    <Box maxW="md" borderRadius="lg" p="5" overflow="hidden" display={display}>
      <Grid templateRows="repeat(1, 1fr)" gap={2} w={width}>
        <GridItem rowSpan={2}>
          <Box w="100%" h="100%" objectFit="cover">
            <Image
              src={images[0]}
              borderRadius="lg"
              overflow="hidden"
              fit="cover"
              w="100%"
              h="100%"
            />
          </Box>
        </GridItem>
        <GridItem rowSpan={1}>
          <Box>
            <Box>
              <Caption fontSize="14px">{cityName}</Caption>
              <Body1 fontSize="18px">{`${title.substring(
                0,
                SmMaxTitleCharacters
              )}...`}</Body1>
            </Box>
            <Box>
              <Caption fontSize="14px">
                {numBeds} Bedrooms · {numBaths} Bathrooms
              </Caption>
            </Box>
          </Box>
        </GridItem>
        <GridItem rowSpan={1}>
          <MultiWeightText bold={price.toString()} normal="/month" />
        </GridItem>
      </Grid>
    </Box>
  );
}

export function XsSearchResult(props: ResultProps) {
  const {
    listing: {
      details: { title, numBeds, numBaths },
      lease: { price },
      images,
    },
    display,
    width,
  } = props;

  return (
    <Box maxW="xs" borderRadius="lg" overflow="hidden" p={3} display={display}>
      <Grid templateRows="repeat(1, 1fr)" gap={2} w={width}>
        <GridItem rowSpan={2}>
          <Box w="150px" h="100%" objectFit="cover">
            <Image
              src={images[0]}
              borderRadius="lg"
              overflow="hidden"
              fit="cover"
              w="100%"
              h="100%"
            />
          </Box>
        </GridItem>
        <GridItem rowSpan={1}>
          <Box>
            <Box maxW="150px">
              <Body1 fontSize="18px">{`${title.substring(
                0,
                XsMaxTitleCharacters
              )}...`}</Body1>
            </Box>
          </Box>
          <Box>
            <Caption fontSize="12px">
              {numBeds} Bedrooms · {numBaths} Bathrooms
            </Caption>
          </Box>
        </GridItem>
        <GridItem rowSpan={1}>
          <MultiWeightText bold={price.toString()} normal="/month" />
        </GridItem>
      </Grid>
    </Box>
  );
}
