import { useMemo, useState, ReactElement } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { ButtonPrimary, ButtonSecondary } from "@/components/core/Button";
import { DashboardCard } from "@/components/core/Layout";
import { TabPrimary } from "@/components/core/Tabs";
import DashboardSearchInput from "@/components/core/DashboardSearchInput";
import {
  Link,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Table,
  Thead,
  Spacer,
  Box,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import {
  PropertyImage,
  MultiWeightText,
  PropertyDes,
} from "@/components/sections/Listings";
import RoutePath, { RoutePathDashboard } from "@/src/routes";
import { Listing, Visibility } from "@/src/api/types";
import { auth } from "@/src/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { listings as listingsCollection } from "@/src/api/collections";
import { useCollectionOnce } from "react-firebase-hooks/firestore";

interface ListingProps {
  listings?: Listing[];
}

const LandlordListingTable = (props: ListingProps) => {
  const { listings } = props;

  return (
    <Table>
      <Thead>
        <Tr>
          <Th display={["none", "none", "none", "block", "block"]}>Image</Th>
          <Th>Property</Th>
          <Th>Price</Th>
          <Th>Applicants</Th>
          <Th width={0} />
        </Tr>
      </Thead>
      <Tbody>
        {listings?.map((listing, index) => (
          <Tr key={index}>
            <Td display={["none", "none", "none", "block", "block"]}>
              <PropertyImage image={listing.images[0]} size="150px" />
            </Td>
            <Td minWidth="250px">
              <PropertyDes
                location={listing.location.cityName}
                title={`${listing.details.title.substring(0, 30)}...`}
                numBeds={listing.details.numBeds}
                numBaths={listing.details.numBaths}
              />
            </Td>
            <Td>
              <MultiWeightText
                bold={listing.lease.price.toString()}
                normal="/month"
              />
            </Td>
            <Td>
              <Box>{listing.applicants}</Box>
            </Td>
            <Td>
              <NextLink href={`${RoutePath.Listings}/${listing.id}`} passHref>
                <Link _hover={{ textDecoration: "none" }}>
                  <ButtonSecondary>View Listing</ButtonSecondary>
                </Link>
              </NextLink>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

function ListingsView(): ReactElement {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [visibility, setVisibility] = useState<Visibility>("public");
  const query = useMemo(
    () =>
      user
        ? listingsCollection
            .where("owner.uid", "==", user.uid)
            .where("visibility", "==", visibility)
        : undefined,
    [user, visibility]
  );
  const [snapshot] = useCollectionOnce(query);
  const listings = snapshot?.docs.map(
    (doc) =>
      (({
        ...doc.data(),
        id: doc.id,
      } as unknown) as Listing)
  );

  return (
    <DashboardCard>
      <Tabs isLazy>
        <TabList>
          <TabPrimary onClick={() => setVisibility("public")}>
            Listings
          </TabPrimary>
          <TabPrimary onClick={() => setVisibility("draft")}>Draft</TabPrimary>
          <TabPrimary onClick={() => setVisibility("hidden")}>
            Hidden
          </TabPrimary>
          <Spacer />
          <Box marginTop="8px" marginBottom="8px" width="2.5in">
            <DashboardSearchInput />
          </Box>
          <Box marginY="auto" marginLeft="64px" marginRight="24px">
            <ButtonPrimary
              onClick={() =>
                router.push(
                  `${RoutePath.Dashboard}/${RoutePathDashboard.Create}`
                )
              }
            >
              Create Listing
            </ButtonPrimary>
          </Box>
        </TabList>

        <TabPanels>
          <TabPanel paddingX={0}>
            <LandlordListingTable listings={listings} />
          </TabPanel>
          <TabPanel>
            <LandlordListingTable listings={listings} />
          </TabPanel>
          <TabPanel>
            <LandlordListingTable listings={listings} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </DashboardCard>
  );
}

export default ListingsView;
