import { useMemo, useState, ReactElement, useEffect } from "react";
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
  Spinner,
  Box,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import { TenantRequestEntry } from "@/src/api/types";
import { auth } from "@/src/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { tenantRequests } from "@/src/api/collections";
import { useCollection } from "react-firebase-hooks/firestore";
import { getUserPublicById } from "@/src/api/queries";

enum Request {
  Sent = "tenantUid",
  Received = "landlordUid",
}

function RequestView(): ReactElement {
  // @ts-ignore
  const [selectedRequest, setSelectedRequest] = useState<Request>(
    Request.Received
  );

  const [user] = useAuthState(auth);
  // TODO: query query based on the requests received and then go through each one and add the info from the user public data
  const query = useMemo(() => {
    return user
      ? tenantRequests.where(selectedRequest, "==", user.uid)
      : undefined;
  }, [user, selectedRequest]);

  const [snapshot] = useCollection(query);

  const tenantRequestPromise = snapshot?.docs
    .map(async (doc) => {
      const requestData = doc.data();

      const publicUserInfo = await getUserPublicById(
        requestData[
          selectedRequest === Request.Received ? "tenantUid" : "landlordUid"
        ]
      );
      return {
        ...doc.data(),
        ...publicUserInfo,
        id: doc.id,
      } as TenantRequestEntry;
    })
    .flat();

  return (
    <DashboardCard>
      <Tabs isLazy>
        <TabList>
          <TabPrimary
            onClick={() => {
              setSelectedRequest(Request.Received);
            }}
          >
            Received
          </TabPrimary>
          <TabPrimary
            onClick={() => {
              setSelectedRequest(Request.Sent);
            }}
          >
            Sent
          </TabPrimary>
          <Spacer />
          <Box marginTop="8px" marginBottom="16px">
            <DashboardSearchInput />
          </Box>
        </TabList>
        <TabPanels>
          <TabPanel>
            <ReceivedRequestsTable tenantRequests={tenantRequestPromise} />
          </TabPanel>
          <TabPanel>
            <SentRequestsTable tenantRequests={tenantRequestPromise} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </DashboardCard>
  );
}

const ReceivedRequestsTable = (props: {
  tenantRequests?: Promise<TenantRequestEntry>[] | undefined;
}) => {
  const { tenantRequests } = props;

  const [tenantRequestList, setTenantRequestList] = useState<
    TenantRequestEntry[]
  >([]);

  const handleTenantRequestPromise = async () => {
    if (tenantRequests) {
      setTenantRequestList(await Promise.all(tenantRequests));
    }
  };

  useEffect(() => {
    handleTenantRequestPromise();
  }, [tenantRequests]);

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Photo</Th>
          <Th>First name</Th>
          <Th>Last name</Th>
          <Th>Rentals and durations</Th>
          <Th />
        </Tr>
      </Thead>
      <Tbody>
        {tenantRequestList?.map((tenant, index) => (
          <Tr key={index}>
            <Td>
              <Image
                src={tenant.profilePicture}
                boxSize="64px"
                objectFit="cover"
                borderRadius="full"
              />
            </Td>
            <Td>{tenant.firstName}</Td>
            <Td>{tenant.lastName}</Td>
            <Td>
              <ButtonSecondary>View Details</ButtonSecondary>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

const SentRequestsTable = (props: {
  tenantRequests?: Promise<TenantRequestEntry>[] | undefined;
}) => {
  const { tenantRequests } = props;

  const [tenantRequestList, setTenantRequestList] = useState<
    TenantRequestEntry[]
  >([]);

  const handleTenantRequestPromise = async () => {
    if (tenantRequests) {
      setTenantRequestList(await Promise.all(tenantRequests));
    }
  };

  useEffect(() => {
    handleTenantRequestPromise();
  }, [tenantRequests]);

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Photo</Th>
          <Th>First name</Th>
          <Th>Last name</Th>
          <Th>Rentals and durations</Th>
          <Th />
        </Tr>
      </Thead>
      <Tbody>
        {tenantRequestList?.map((tenant, index) => (
          <Tr key={index}>
            <Td>
              <Image
                src={tenant.profilePicture}
                boxSize="64px"
                objectFit="cover"
                borderRadius="full"
              />
            </Td>
            <Td>{tenant.firstName}</Td>
            <Td>{tenant.lastName}</Td>
            <Td>
              <ButtonSecondary>View Details</ButtonSecondary>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default RequestView;
