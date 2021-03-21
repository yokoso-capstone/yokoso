import { Box, Image, Grid, GridItem } from "@chakra-ui/react";
import { Body1, Caption, Body2 } from "@/components/core/Text";
import { Description, MultiWeightText } from "@/components/sections/Results";

interface ResultProps {
  id: string;
  imageUrl: string;
  title: string;
  numBeds: string;
  numBaths: string;
  location: string;
  price: string;
}

export function LgSearchResult(props: ResultProps) {
  const { imageUrl, title, numBeds, numBaths, location, price, id } = props;

  return (
    <Box maxW="2xl" borderRadius="lg" p="5">
      <Grid
        templateColumns="repeat(9, 1fr)"
        templateRows="repeat(2, 1fr)"
        gap={2}
      >
        <GridItem colSpan={3} rowSpan={2}>
          <Box w="100%" h="100%" maxWidth="200px">
            <Image src={imageUrl} borderRadius="lg" />
          </Box>
        </GridItem>
        <GridItem colSpan={4} rowSpan={2}>
          <Description
            numBaths={numBaths}
            numBeds={numBeds}
            title={title}
            location={location}
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
                <Body2 color="white">{id}</Body2>
              </Box>
            </Box>
          </Box>
        </GridItem>
        <GridItem rowSpan={1} colSpan={2}>
          <Box h="100%" position="relative">
            <Box position="absolute" bottom="8px" right="8px">
              <MultiWeightText bold={price} normal="/month" />
            </Box>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
}

export function SmSearchResult(props: ResultProps) {
  const { imageUrl, title, numBeds, numBaths, location, price } = props;
  return (
    <Box maxW="sm" borderRadius="lg" p="5" overflow="hidden">
      <Grid templateRows="repeat(1, 1fr)" gap={2}>
        <GridItem rowSpan={2}>
          <Box w="100%" h="100%" objectFit="cover">
            <Image
              src={imageUrl}
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
              <Caption fontSize="14px">{location}</Caption>
              <Body1 fontSize="18px">{title}</Body1>
            </Box>
            <Box>
              <Caption fontSize="14px">
                {numBeds} Bedrooms · {numBaths} Bathrooms
              </Caption>
            </Box>
          </Box>
        </GridItem>
        <GridItem rowSpan={1}>
          <MultiWeightText bold={price} normal="/month" />
        </GridItem>
      </Grid>
    </Box>
  );
}
