import { useState, ReactElement } from "react";
import Head from "next/head";
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  InferGetServerSidePropsType,
} from "next";
import Header from "@/components/sections/Header";
import { ContainerPrimary } from "@/components/core/Layout";
import { Body1, Caption, Heading4 } from "@/components/core/Text";
import ImageCarousel from "@/components/sections/ImageCarousel";
import ListingContactCard from "@/components/sections/ListingContactCard";
import { Box, Button, Divider, Grid, HStack, Stack } from "@chakra-ui/react";
import { firestoreAdmin } from "@/src/firebaseAdmin";
import { CollectionName } from "@/src/api/collections";
import { FirestoreTimestamp, Listing } from "@/src/api/types";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  if (!context.params || !context.params.id) {
    const result: GetServerSidePropsResult<undefined> = { notFound: true };
    return result;
  }

  try {
    const { id } = context.params;
    const documentId = typeof id === "string" ? id : id[0];

    const ref = firestoreAdmin
      .collection(CollectionName.Listings)
      .doc(documentId);
    const document = await ref.get();
    const props = document.data() as Listing;

    // TODO: pass user token and display private listings belonging to them
    if (props.visibility !== "public") {
      throw Error("Listing is not public");
    }

    if (props.createdAt) {
      props.createdAt = (props.createdAt as FirestoreTimestamp).toMillis();
    }

    if (props.owner && props.owner.createdAt) {
      props.owner.createdAt = (props.owner
        .createdAt as FirestoreTimestamp).toMillis();
    }

    const result: GetServerSidePropsResult<typeof props> = { props };

    return result;
  } catch (error) {
    const result: GetServerSidePropsResult<undefined> = { notFound: true };
    return result;
  }
};

function ListingPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
): ReactElement {
  const {
    owner: { firstName, lastName, profilePicture, createdAt },
    location: { cityName },
    details: { title, description, numBedrooms, numBeds, numBaths },
    lease: { price },
    images,
  } = props;
  const maxDescriptionCharacters = 300;
  const [isDescriptionExpanded, setDescriptionExpanded] = useState(false);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <Header searchInput />
      <ImageCarousel images={images} />
      <ContainerPrimary>
        <Grid
          gridTemplateColumns={["100%", "100%", "100%", "auto 4in"]}
          gridTemplateRows="min-content"
          gap={["0.5in", "0.5in", "0.5in", "0.5in", "1in"]}
        >
          <Stack
            gridColumn="1"
            gridRow={["2", "2", "2", "1"]}
            spacing="2.5rem"
            paddingTop={[0, 0, 0, "1in"]}
            paddingBottom={["0.5in", "0.5in", "0.5in", "1in"]}
          >
            <Box>
              <Caption>{cityName}</Caption>
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
                    {isDescriptionExpanded ? "See less" : "See more"}
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
            <Box
              position="sticky"
              top={0}
              paddingTop={["0.5in", "0.5in", "0.5in", "1in"]}
              paddingBottom={[0, 0, 0, "1in"]}
            >
              <ListingContactCard
                price={price}
                firstName={firstName}
                lastName={lastName}
                profilePicture={profilePicture}
                joined={createdAt as number}
              />
            </Box>
          </Box>
        </Grid>
      </ContainerPrimary>
    </>
  );
}

export default ListingPage;
