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
import {
  Box,
  Button,
  Divider,
  Grid,
  HStack,
  ListItem,
  Stack,
  UnorderedList,
} from "@chakra-ui/react";
import { firestoreAdmin } from "@/src/firebaseAdmin";
import { CollectionName } from "@/src/api/collections";
import { FirestoreTimestamp, Listing } from "@/src/api/types";
import { auth } from "@/src/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

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

    if (props.owner?.createdAt) {
      props.owner.createdAt = (props.owner
        .createdAt as FirestoreTimestamp).toMillis();
    }

    if (props.lease?.availability) {
      props.lease.availability = (props.lease
        .availability as FirestoreTimestamp).toMillis();
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
    details: {
      title,
      description,
      propertyType,
      rentalSpace,
      rentalSize,
      maxOccupancy,
      numBedrooms,
      numBeds,
      numBaths,
    },
    features,
    lease: { price },
    utilities,
    images,
  } = props;
  const maxDescriptionCharacters = 300;
  const [isDescriptionExpanded, setDescriptionExpanded] = useState(false);
  const [user, loading, error] = useAuthState(auth);

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
            <Box>
              <Heading4 marginBottom="2rem">Lease details</Heading4>
              <UnorderedList>
                <Stack>
                  <ListItem>Property type: {propertyType}</ListItem>
                  <ListItem>Space: {rentalSpace}</ListItem>
                  <ListItem>Area: {rentalSize} sq ft</ListItem>
                  <ListItem>Max occupancy: {maxOccupancy}</ListItem>
                </Stack>
              </UnorderedList>
            </Box>
            <Divider />
            <Box>
              <Heading4 marginBottom="2rem">Amenities</Heading4>
              <UnorderedList>
                <Stack>
                  {features.map((feature, index) => (
                    <ListItem key={index}>{camelToSentence(feature)}</ListItem>
                  ))}
                </Stack>
              </UnorderedList>
            </Box>
            <Divider />
            <Box>
              <Heading4 marginBottom="2rem">Utilities</Heading4>
              <UnorderedList>
                <Stack>
                  {utilities.map((utility, index) => (
                    <ListItem key={index}>{camelToSentence(utility)}</ListItem>
                  ))}
                </Stack>
              </UnorderedList>
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
                disabled={error !== undefined || (!loading && !user)}
              />
            </Box>
          </Box>
        </Grid>
      </ContainerPrimary>
    </>
  );
}

// TODO: use less hacky workaround
function camelToSentence(str: string) {
  const result = str.replace(/([A-Z])/g, " $1");
  const final = result.charAt(0).toUpperCase() + result.slice(1);

  return final;
}

export default ListingPage;
