import { useMemo, useState, ReactElement } from "react";
import firebase from "firebase/app";
import { DashboardCard } from "@/components/core/Layout";
import { TabPrimary } from "@/components/core/Tabs";
import DashboardSearchInput from "@/components/core/DashboardSearchInput";
import {
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
}

enum TimePeriod {
  Past = "past",
  Upcoming = "upcoming",
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
          <Th>Address</Th>
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
              <Box>
                {`${listing.location.unitNumber} ${listing.location.address}, ${listing.location.cityName}, ${listing.location.province}`}
                <br />
                {listing.location.postalCode}
              </Box>
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

  // NOTE: consider filtering at the query level
  const listings = acceptedTenantRequests
    ?.filter((request) => {
      // TODO: handle sketchy fallback onto leave availability better (avoids errors on old data)
      const leaseStartDate =
        (request.leaseStartDate as firebase.firestore.Timestamp) ??
        firebase.firestore.Timestamp.fromDate(
          new Date(
            (request.listing.data.lease.availability as unknown) as string
          )
        );
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

export default RentalView;
