import { ReactElement } from "react";
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  InferGetServerSidePropsType,
} from "next";
import HeaderWhite from "@/components/sections/HeaderWhite";
import { ButtonPrimary } from "@/components/core/Button";
import { Card, ContainerPrimary } from "@/components/core/Layout";
import { Body1, Heading4, Heading5, TextBase } from "@/components/core/Text";
import ImageCarousel from "@/components/sections/ImageCarousel";
import {
  Box,
  Divider,
  Grid,
  HStack,
  Image,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { getUTCMonthString } from "@/src/utils";

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
      name: "Emad Fadel",
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
  const joinedDate = new Date(poster.joined);

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
            <Card
              width="100%"
              padding={["3rem 2rem", "5rem 3rem", "5rem 4rem", "4rem 3rem"]}
              position="sticky"
              top={0}
              marginX="auto"
            >
              <Stack spacing="24px">
                <HStack align="baseline">
                  <Heading4>${price} </Heading4>{" "}
                  <TextBase fontSize="20px">/month</TextBase>
                </HStack>
                <Divider />
                <HStack spacing="24px">
                  <Image
                    src={images[0]}
                    rounded="full"
                    boxSize="48px"
                    objectFit="cover"
                  />
                  <Stack spacing="4px">
                    <HStack>
                      <Body1>{poster.name}</Body1>
                      <CheckIcon />
                    </HStack>
                    <Body1 color="text.variant">
                      Joined {getUTCMonthString(joinedDate)}{" "}
                      {joinedDate.getUTCFullYear()}
                    </Body1>
                  </Stack>
                </HStack>
                <Divider />
                <Stack spacing="16px">
                  <Heading5>Contact</Heading5>
                  <Textarea placeholder="i h8 myself" />
                  <ButtonPrimary>Send</ButtonPrimary>
                </Stack>
              </Stack>
            </Card>
          </Box>
        </Grid>
      </ContainerPrimary>
    </>
  );
}

export default ListingPage;
