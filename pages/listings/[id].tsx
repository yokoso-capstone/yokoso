import { useState, ReactElement } from "react";
import Head from "next/head";
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  InferGetServerSidePropsType,
} from "next";
import HeaderWhite from "@/components/sections/HeaderWhite";
import { ContainerPrimary } from "@/components/core/Layout";
import { Body1, Caption, Heading4 } from "@/components/core/Text";
import ImageCarousel from "@/components/sections/ImageCarousel";
import ListingContactCard from "@/components/sections/ListingContactCard";
import { Box, Button, Divider, Grid, HStack, Stack } from "@chakra-ui/react";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  if (!context.params) {
    const result: GetServerSidePropsResult<undefined> = { notFound: true };
    return result;
  }

  // @ts-ignore
  const { id } = context.params;
  // TODO: database lookup based on id (return notFound if doesn't exist)

  const props = {
    title: "Beautiful apartment with great view",
    city: "Kanata",
    price: 1000,
    poster: {
      firstName: "Emad",
      lastName: "Fadel",
      profilePicture: "https://placekitten.com/100/100",
      joined: Date.now(),
    },
    details: {
      numBedrooms: 1,
      numBeds: 1,
      numBaths: 1,
      description: `This furnished studio apartment boasts a functional floorplan, renovated open concept kitchen with dishwasher, bedroom nook, and ample storage. As a fully furnished apartment for rent with modern furnishings, this unit is move-in ready so you can live worry free in the heart of the city. Minimum one-month tenancy required. Somerset is nestled in the heart of downtown, Vancouver on a rare quite cul-de-sac just steps from the shopping, business and entertainment districts. The building offers stellar amenities, including a gym and rooftop pool and terrace with stunning skyline views, so you can relax and enjoy. Minimum one month tenancy required and cable & internet included in furnished rentals.`,
    },
    images: [
      "https://placekitten.com/1000/600",
      "https://placekitten.com/400/600",
      "https://placekitten.com/800/600",
      "https://placekitten.com/1200/300",
    ],
  };
  const result: GetServerSidePropsResult<typeof props> = { props };

  return result;
};

function ListingPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
): ReactElement {
  const { title, city, price, poster, details, images } = props;
  const { numBedrooms, numBeds, numBaths, description } = details;
  const maxDescriptionCharacters = 300;
  const [isDescriptionExpanded, setDescriptionExpanded] = useState(false);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <HeaderWhite />
      <ImageCarousel images={images} />
      <ContainerPrimary paddingY={["0.5in", "0.5in", "0.5in", "1in"]}>
        <Grid
          gridTemplateColumns={["100%", "100%", "100%", "auto 4in"]}
          gridTemplateRows="min-content"
          gap="0.5in"
        >
          <Stack gridColumn="1" gridRow={["2", "2", "2", "1"]} spacing="2.5rem">
            <Box>
              <Caption>{city}</Caption>
              <Heading4 marginBottom="8px">{title}</Heading4>
              <HStack>
                <Caption>
                  {numBedrooms} bedroom{numBedrooms > 1 && "s"}
                </Caption>
                <Caption>·</Caption>
                <Caption>
                  {numBeds} bed{numBeds > 1 && "s"}
                </Caption>
                <Caption>·</Caption>
                <Caption>
                  {numBaths} bath{numBaths > 1 && "s"}
                </Caption>
              </HStack>
            </Box>
            <Divider />
            <Box>
              {description.length > maxDescriptionCharacters ? (
                <Box>
                  <Body1 marginBottom="1rem">
                    {isDescriptionExpanded
                      ? description
                      : `${description.substring(
                          0,
                          maxDescriptionCharacters
                        )}...`}
                  </Body1>
                  <Button
                    variant="link"
                    color="text.variant"
                    _active={{
                      color: "text.secondary",
                    }}
                    onClick={() =>
                      setDescriptionExpanded(!isDescriptionExpanded)
                    }
                  >
                    {isDescriptionExpanded ? "Read less" : "Read more"}
                  </Button>
                </Box>
              ) : (
                <Body1>{description}</Body1>
              )}
            </Box>
            <Divider />
            <Box height="3in">
              <Heading4>Lease details</Heading4>
            </Box>
            <Divider />
            <Box height="3in">
              <Heading4>Amenities</Heading4>
            </Box>
            <Divider />
            <Box height="3in">
              <Heading4>Reviews</Heading4>
            </Box>
          </Stack>
          <Box gridColumn={["1", "1", "1", "2"]} gridRow="1">
            <ListingContactCard
              price={price}
              firstName={poster.firstName}
              lastName={poster.lastName}
              profilePicture={poster.profilePicture}
              joined={poster.joined}
            />
          </Box>
        </Grid>
      </ContainerPrimary>
    </>
  );
}

export default ListingPage;
