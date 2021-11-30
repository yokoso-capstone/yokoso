import { useState, ReactElement } from "react";
import Head from "next/head";
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  InferGetServerSidePropsType,
} from "next";
import Header from "@/components/sections/Header";
import { ContainerPrimary } from "@/components/core/Layout";
import {
  Body1,
  Caption,
  Heading4,
  Heading5,
  Heading6,
} from "@/components/core/Text";
import ImageCarousel from "@/components/sections/ImageCarousel";
import ListingContactCard from "@/components/sections/ListingContactCard";
import {
  Box,
  Button,
  Divider,
  Grid,
  HStack,
  Stack,
  Icon,
} from "@chakra-ui/react";
import {
  MdOutlineBathtub,
  MdOutlineOutdoorGrill,
  MdOutlineLocalLaundryService,
  MdOutlineMicrowave,
  MdCable,
  MdOutlineWaterDrop,
} from "react-icons/md";
import { GiRedCarpet, GiHeatHaze } from "react-icons/gi";
import { CgSmartHomeWashMachine } from "react-icons/cg";
import { BiFridge } from "react-icons/bi";
import { SiBathasu } from "react-icons/si";
import { HiDesktopComputer } from "react-icons/hi";
import { FcElectricity, FcCableRelease } from "react-icons/fc";
import {
  FaTemperatureHigh,
  FaRegSnowflake,
  FaWheelchair,
} from "react-icons/fa";
import { Listing } from "@/src/api/types";
import { auth } from "@/src/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import FireStoreParser from "firestore-parser";
import { listingsRest } from "@/src/api/collections";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  if (!context.params || !context.params.id) {
    const result: GetServerSidePropsResult<undefined> = { notFound: true };
    return result;
  }

  try {
    const { id } = context.params;
    const { user } = context.query;

    const documentId = typeof id === "string" ? id : id[0];

    const response = await fetch(`${listingsRest}/${documentId}`);
    const { fields } = await response.json();
    const listing: Listing = { ...FireStoreParser(fields), id: documentId };

    // TODO: pass user token and display private listings belonging to them
    if (listing.visibility !== "public" && listing.owner.uid !== user) {
      throw Error("Listing is not public");
    }
    const data = { listing };

    const result: GetServerSidePropsResult<typeof data> = { props: data };

    return result;
  } catch (error) {
    const result: GetServerSidePropsResult<undefined> = { notFound: true };
    return result;
  }
};

function ListingPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
): ReactElement {
  const { listing } = props;
  const {
    owner: { firstName, lastName, profilePicture, createdAt, uid },
    location: { cityName },
    details: {
      title,
      description,
      furnished,
      petsAllowed,
      propertyType,
      rentalSpace,
      rentalSize,
      numBedrooms,
      numBaths,
      smokingAllowed,
    },
    features,
    featureDescription,
    lease: { price },
    utilities,
    utilitiesDescription,
    images,
  } = listing;
  const maxDescriptionCharacters = 300;
  const [isDescriptionExpanded, setDescriptionExpanded] = useState(false);
  const [
    isFeatureDescriptionExpanded,
    setFeatureDescriptionExpanded,
  ] = useState(false);
  const [
    isUtilityDescriptionExpanded,
    setUtilityDescriptionExpanded,
  ] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  const iconMap = new Map([
    ["bathtub", MdOutlineBathtub],
    ["bbqReady", MdOutlineOutdoorGrill],
    ["carpets", GiRedCarpet],
    ["laundry", MdOutlineLocalLaundryService],
    ["dishwasher", CgSmartHomeWashMachine],
    ["fridge", BiFridge],
    ["jacuzzi", SiBathasu],
    ["microwave", MdOutlineMicrowave],
    ["snowRemoval", FaRegSnowflake],
    ["tv", HiDesktopComputer],
    ["wheelchairAccessible", FaWheelchair],
    ["cable", MdCable],
    ["electricity", FcElectricity],
    ["heating", FaTemperatureHigh],
    ["hydro", MdOutlineWaterDrop],
    ["internet", FcCableRelease],
    ["naturalGas", GiHeatHaze],
  ]);

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
                  {numBedrooms} Bedroom{numBedrooms > 1 && "s"}
                </Caption>
                <Caption>·</Caption>
                <Caption>
                  {numBaths} Bath{numBaths > 1 && "s"}
                </Caption>
              </HStack>
            </Box>
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
              <Grid
                templateColumns="repeat(3, 1fr)"
                rowGap={3}
                marginBottom="2rem"
              >
                <Heading6>Property type</Heading6>
                <Heading6>Space</Heading6>
                <Heading6>Area</Heading6>
                <Body1>{propertyType}</Body1>
                <Body1>{rentalSpace}</Body1>
                <Body1>{rentalSize} sq ft</Body1>
              </Grid>
              <Grid templateColumns="repeat(3, 1fr)" rowGap={3}>
                <Heading6>Furnished Status</Heading6>
                <Heading6>Pets Allowed</Heading6>
                <Heading6>Smoking Allowed</Heading6>
                <Body1>{furnished ? "Furnished" : "Unfurnished"}</Body1>
                <Body1>{petsAllowed ? "Yes" : "No"}</Body1>
                <Body1>{smokingAllowed ? "Yes" : "No"}</Body1>
              </Grid>
            </Box>
            <Divider />
            <Box>
              <Heading4 marginBottom="2rem">Amenities</Heading4>
              <Stack>
                <Grid templateColumns="repeat(4, 1fr)" rowGap={10}>
                  {features.map((feature, index) => (
                    <HStack key={index}>
                      <Icon as={iconMap.get(feature)} boxSize={8} />
                      <Heading6>{camelToSentence(feature)}</Heading6>
                    </HStack>
                  ))}
                </Grid>
              </Stack>
            </Box>
            {featureDescription && (
              <Box paddingTop="2rem">
                <Heading5 marginBottom="2rem">Additional Amenities</Heading5>
                {featureDescription.length > maxDescriptionCharacters ? (
                  <Box>
                    <Body1 marginBottom="1rem">
                      {isFeatureDescriptionExpanded
                        ? featureDescription
                        : `${featureDescription.substring(
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
                        setFeatureDescriptionExpanded(
                          !isFeatureDescriptionExpanded
                        )
                      }
                    >
                      {isFeatureDescriptionExpanded ? "See less" : "See more"}
                    </Button>
                  </Box>
                ) : (
                  <Body1>{featureDescription}</Body1>
                )}
              </Box>
            )}
            <Divider />
            <Box>
              <Heading4 marginBottom="2rem">Utilities</Heading4>
              <Stack>
                <Grid templateColumns="repeat(4, 1fr)" rowGap={10}>
                  {utilities.map((utility, index) => (
                    <HStack key={index}>
                      <Icon as={iconMap.get(utility)} boxSize={8} />
                      <Heading6>{camelToSentence(utility)}</Heading6>
                    </HStack>
                  ))}
                </Grid>
              </Stack>
            </Box>
            {utilitiesDescription && (
              <Box paddingTop="2rem">
                <Heading5 marginBottom="2rem">Additional Utilities</Heading5>
                {utilitiesDescription.length > maxDescriptionCharacters ? (
                  <Box>
                    <Body1 marginBottom="1rem">
                      {isUtilityDescriptionExpanded
                        ? utilitiesDescription
                        : `${utilitiesDescription.substring(
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
                        setUtilityDescriptionExpanded(
                          !isUtilityDescriptionExpanded
                        )
                      }
                    >
                      {isUtilityDescriptionExpanded ? "See less" : "See more"}
                    </Button>
                  </Box>
                ) : (
                  <Body1>{utilitiesDescription}</Body1>
                )}
              </Box>
            )}
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
                userUid={user?.uid || ""}
                ownerUid={uid}
                listing={listing}
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
