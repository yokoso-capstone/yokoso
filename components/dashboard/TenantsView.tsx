import { useMemo, useState, ReactElement } from "react";
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
import { TenantEntry } from "@/src/api/types";
import { auth } from "@/src/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { usersPrivate, CollectionName } from "@/src/api/collections";
import { useCollectionOnce } from "react-firebase-hooks/firestore";

enum TimePeriod {
  Past = "past",
  Current = "current",
  Upcoming = "upcoming",
}

function TenantsView(): ReactElement {
  // @ts-ignore
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>(
    TimePeriod.Past
  );

  const [user] = useAuthState(auth);
  // TODO: query based on time period
  const query = useMemo(
    () =>
      user
        ? usersPrivate.doc(user.uid).collection(CollectionName.Tenants)
        : undefined,
    [user]
  );
  const [snapshot] = useCollectionOnce(query);
  const tenants = snapshot?.docs.map(
    (doc) =>
      (({
        ...doc.data(),
        id: doc.id,
      } as unknown) as TenantEntry)
  );

  return (
    <DashboardCard>
      <Tabs isLazy>
        <TabList>
          <TabPrimary onClick={() => setSelectedPeriod(TimePeriod.Past)}>
            Past
          </TabPrimary>
          <TabPrimary onClick={() => setSelectedPeriod(TimePeriod.Current)}>
            Current
          </TabPrimary>
          <TabPrimary onClick={() => setSelectedPeriod(TimePeriod.Upcoming)}>
            Upcoming
          </TabPrimary>
          <Spacer />
          <Box marginTop="8px" marginBottom="16px">
            <DashboardSearchInput />
          </Box>
        </TabList>

        <TabPanels>
          <TabPanel>
            <TenantTable tenants={tenants} />
          </TabPanel>
          <TabPanel>
            <TenantTable tenants={tenants} />
          </TabPanel>
          <TabPanel>
            <TenantTable tenants={tenants} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </DashboardCard>
  );
}

const TenantTable = (props: { tenants?: TenantEntry[] }) => {
  const { tenants } = props;

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
        {tenants?.map((tenant, index) => (
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

export default TenantsView;
