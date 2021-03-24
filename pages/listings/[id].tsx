import { ReactElement } from "react";
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  InferGetServerSidePropsType,
} from "next";
import HeaderWhite from "@/components/sections/HeaderWhite";
import { ContainerPrimary } from "@/components/core/Layout";
import { Heading4 } from "@/components/core/Text";
import ImageCarousel from "@/components/sections/ImageCarousel";
import ListingContactCard from "@/components/sections/ListingContactCard";
import { Box, Grid } from "@chakra-ui/react";

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

  return (
    <>
      <HeaderWhite />
      <ImageCarousel images={images} />
      <ContainerPrimary paddingTop={["0.5in", "0.5in", "0.5in", "1in"]}>
        <Grid
          gridTemplateColumns={["100%", "100%", "100%", "auto 4in"]}
          gridTemplateRows="min-content"
          gap="0.5in"
        >
          <Box gridColumn="1" gridRow={["2", "2", "2", "1"]} height="12in">
            <Heading4>{title}</Heading4>
            {city} {JSON.stringify(details)}
          </Box>
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
