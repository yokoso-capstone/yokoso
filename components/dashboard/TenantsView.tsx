import { useMemo, useState, ReactElement, useEffect } from "react";
import firebase from "firebase/app";
import { ButtonSecondary } from "@/components/core/Button";
import { DashboardCard } from "@/components/core/Layout";
import { TabPrimary } from "@/components/core/Tabs";
import DashboardSearchInput from "@/components/core/DashboardSearchInput";
import {
  Image,
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
import { RequestStatus, TenantRequest, UserPublic } from "@/src/api/types";
import { auth } from "@/src/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { tenantRequests, usersPublic } from "@/src/api/collections";
import { useCollectionOnce } from "react-firebase-hooks/firestore";

enum TimePeriod {
  Past = "past",
  Upcoming = "upcoming",
}

type MergedTenantData = {
  tenantUid: string;
  userPublic?: UserPublic;
  tenantRequests: TenantRequest[];
};

type ReducedTenantData = MergedTenantData[];

function TenantsView(): ReactElement {
  const [timePeriod, setTimePeriod] = useState(TimePeriod.Past);
  const [user] = useAuthState(auth);
  const query = useMemo(() => {
    const acceptedStatus: RequestStatus = "accepted";

    return user
      ? tenantRequests
          .where("landlordUid", "==", user.uid)
          .where("status", "==", acceptedStatus)
      : undefined;
  }, [user]);
  const [reducedTenantData, setReducedTenantData] = useState<ReducedTenantData>(
    []
  );
  const [snapshot] = useCollectionOnce(query);

  useEffect(() => {
    // TODO: avoid messy client-side restructuring data and handle in separate collection managed by Stripe webhook
    const handleMerge = async () => {
      const acceptedTenantRequests = snapshot?.docs.map(
        (doc) =>
          (({
            ...doc.data(),
            id: doc.id,
          } as unknown) as TenantRequest)
      );
      const mergedRequestAndUserData = acceptedTenantRequests?.map(
        async (request) => {
          const { tenantUid } = request;
          const userRef = usersPublic.doc(tenantUid);
          const userSnapshot = await userRef.get();
          const userData = userSnapshot.data() as UserPublic;

          return {
            tenantUid,
            userPublic: userData,
            tenantRequest: request,
          };
        }
      );

      if (mergedRequestAndUserData) {
        const mergedData = await Promise.all(mergedRequestAndUserData);
        const collectUnique: { [tenantUid: string]: MergedTenantData } = {};

        mergedData.forEach((data) => {
          const { tenantUid, tenantRequest, userPublic } = data;

          if (Object.prototype.hasOwnProperty.call(collectUnique, tenantUid)) {
            collectUnique[tenantUid].tenantRequests.push(tenantRequest);
          } else {
            collectUnique[tenantUid] = {
              tenantUid,
              userPublic,
              tenantRequests: [tenantRequest],
            };
          }
        });

        setReducedTenantData(Object.values(collectUnique));
      }
    };

    handleMerge();
  }, [snapshot]);

  const filteredTenantData = reducedTenantData.filter((tenantData) => {
    const { tenantRequests } = tenantData;

    const requestToTimestampMillis = (request: TenantRequest) => {
      // TODO: handle sketchy fallback onto leave availability better (avoids errors on old data)
      const leaseStartDate =
        (request.leaseStartDate as firebase.firestore.Timestamp) ??
        firebase.firestore.Timestamp.fromDate(
          new Date(
            (request.listing.data.lease.availability as unknown) as string
          )
        );
      const timestampMillis = leaseStartDate.toMillis();

      return timestampMillis;
    };

    const hasPastListing = tenantRequests.some((request) => {
      const timestampMillis = requestToTimestampMillis(request);
      const now = Date.now();

      return timestampMillis <= now;
    });

    const hasUpcomingListing = tenantRequests.some((request) => {
      const timestampMillis = requestToTimestampMillis(request);
      const now = Date.now();

      return timestampMillis > now;
    });

    return timePeriod === TimePeriod.Past ? hasPastListing : hasUpcomingListing;
  });

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
          <Box marginTop="8px" marginBottom="16px">
            <DashboardSearchInput />
          </Box>
        </TabList>

        <TabPanels>
          <TabPanel>
            <TenantTable tenantData={filteredTenantData} />
          </TabPanel>
          <TabPanel>
            <TenantTable tenantData={filteredTenantData} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </DashboardCard>
  );
}

const TenantTable = (props: { tenantData: ReducedTenantData }) => {
  const { tenantData } = props;

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Photo</Th>
          <Th>First name</Th>
          <Th>Last name</Th>
          <Th>Rentals and durations</Th>
        </Tr>
      </Thead>
      <Tbody>
        {tenantData.map((data, index) => (
          <Tr key={index}>
            <Td>
              <Image
                src={data.userPublic?.profilePicture}
                boxSize="64px"
                objectFit="cover"
                borderRadius="full"
              />
            </Td>
            <Td>{data.userPublic?.firstName}</Td>
            <Td>{data.userPublic?.lastName}</Td>
            <Td>
              <ButtonSecondary>View Details</ButtonSecondary>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default TenantsView;
