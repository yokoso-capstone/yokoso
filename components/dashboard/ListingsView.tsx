import { ReactElement } from "react";
import { ButtonSecondary } from "@/components/core/Button";
import { TabPrimary } from "@/components/core/Tabs";
import { ListingType, testListing } from "@/src/types";
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

interface ListingProps {
  listings: ListingType[];
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
          <Th />
        </Tr>
      </Thead>
      <Tbody>
        {listings.map((listing: ListingType, index) => (
          <Tr key={index}>
            <Td display={["none", "none", "none", "block", "block"]}>
              <PropertyImage image={listing.imageUrl} size="150px" />
            </Td>
            <Td minWidth="250px">
              <PropertyDes
                location={listing.location.city}
                title={`${listing.title.substring(0, 30)}...`}
                numBeds={listing.numBeds}
                numBaths={listing.numBaths}
              />
            </Td>
            <Td>
              <MultiWeightText
                bold={listing.price.toString()}
                normal="/month"
              />
            </Td>
            <Td>
              <Box>{listing.status.applicants}</Box>
            </Td>
            <Td>
              <ButtonSecondary>Edit Listing</ButtonSecondary>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

const listingData = [testListing, testListing, testListing];

function ListingsView(): ReactElement {
  return (
    <Tabs w="100%" h="100%">
      <TabList w="100%">
        <TabPrimary>Listing</TabPrimary>
        <TabPrimary>Draft</TabPrimary>
        <TabPrimary>Hidden</TabPrimary>
        <Spacer />
        <Box margin="15px">
          <DashboardSearchInput />
        </Box>
      </TabList>

      <TabPanels
        overflowY="auto"
        maxHeight={["75vh", "75vh", "80vh", "65vh", "65vh"]}
        w="100%"
      >
        <TabPanel>
          <LandlordListingTable listings={listingData} />
        </TabPanel>
        <TabPanel>
          <LandlordListingTable listings={listingData} />
        </TabPanel>
        <TabPanel>
          <LandlordListingTable listings={listingData} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default ListingsView;
