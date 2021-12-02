import { useMemo, useState, ReactElement } from "react";
import NextLink from "next/link";
import firebase from "firebase/app";
import { ButtonSecondary } from "@/components/core/Button";
import { DashboardCard } from "@/components/core/Layout";
import { TabPrimary } from "@/components/core/Tabs";
import {
  listingRouteBuilder,
  listingHrefBuilder,
} from "@/src/utils/listingRoute";
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
import { Listing, RequestStatus, TenantRequest } from "@/src/api/types";
import { auth } from "@/src/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { tenantRequests } from "@/src/api/collections";
import { useCollection } from "react-firebase-hooks/firestore";

interface ListingProps {
  listings?: Listing[];
  userId?: string;
}

enum TimePeriod {
  Past = "past",
  Upcoming = "upcoming",
}

const LandlordListingTable = (props: ListingProps) => {
  const { listings, userId } = props;

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
                title={`${listing.details.title.substring(0, 30)}${
                  listing.details.title.length > 30 ? "..." : ""
                }`}
                numBeds={listing.details.numBedrooms}
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
              <NextLink
                href={listingHrefBuilder(listing.id, userId)}
                as={listingRouteBuilder(listing.id)}
                passHref
              >
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

function RentalView(): ReactElement {
  const [user] = useAuthState(auth);
  const [timePeriod, setTimePeriod] = useState(TimePeriod.Past);
  const query = useMemo(() => {
    const acceptedStatus: RequestStatus = "accepted";

    return user
      ? tenantRequests
          .where("tenantUid", "==", user.uid)
          .where("status", "==", acceptedStatus)
      : undefined;
  }, [user]);
  const [snapshot] = useCollection(query);

  const acceptedTenantRequests = snapshot?.docs.map(
    (doc) =>
      (({
        ...doc.data(),
        id: doc.id,
      } as unknown) as TenantRequest)
  );

  // TODO: filter using lease start date when it's implemented
  const listings = acceptedTenantRequests
    ?.filter((request) => {
      const leaseStartDate = request.createdAt as firebase.firestore.Timestamp;
      const timestampMillis = leaseStartDate.toMillis();
      const now = Date.now();

      return timePeriod === TimePeriod.Past
        ? timestampMillis <= now
        : timestampMillis > now;
    })
    .map((request) => request.listing.data);

  return (
    <DashboardCard>
      <Tabs isLazy>
        <TabList>
          <TabPrimary onClick={() => setTimePeriod(TimePeriod.Past)}>
            Past
          </TabPrimary>
          <TabPrimary onClick={() => setTimePeriod(TimePeriod.Upcoming)}>
            Upcoming
          </TabPrimary>
          <Spacer />
          <Box marginTop="8px" marginBottom="8px" width="2.5in">
            <DashboardSearchInput />
          </Box>
        </TabList>

        <TabPanels>
          <TabPanel paddingX={0}>
            <LandlordListingTable userId={user?.uid} listings={listings} />
          </TabPanel>
          <TabPanel>
            <LandlordListingTable userId={user?.uid} listings={listings} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </DashboardCard>
  );
}

export default RentalView;
