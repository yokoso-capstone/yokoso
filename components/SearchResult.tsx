import { Box, Image, Grid, GridItem } from "@chakra-ui/react";
import { Body1, Caption, Body2 } from "@/components/core/Text";

interface ResultProps {
  id: string;
  imageUrl: string;
  title: string;
  numBeds: string;
  numBath: string;
  location: string;
  price: string;
}

function SearchResult(props: ResultProps) {
  const { imageUrl, title, numBeds, numBath, location, price, id } = props;

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
          <Box pt="3">
            <Box>
              <Caption fontSize="14px">{location}</Caption>
              <Body1 fontSize="18px">{title}</Body1>
            </Box>
            <Box>
              <Caption fontSize="14px">
                {numBeds} Bedrooms · {numBath} Bathrooms
              </Caption>
            </Box>
          </Box>
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
              <Body1 display="inline" fontWeight="800">
                {price}
              </Body1>
              <Body1 display="inline">&nbsp;/month</Body1>
            </Box>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
}

export default SearchResult;
