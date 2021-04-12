import React, { ReactElement, useState } from "react";
import Head from "next/head";
import { ListingType, testListing } from "../src/types";
import { DashboardDisplay } from "../src/enum";
import { TabPrimary } from "@/components/core/Tabs";
import Sidebar from "@/components/sections/Sidebar";
import { ButtonSecondary } from "@/components/core/Button";
import DashboardHeader from "@/components/sections/DashboardHeader";
import DashboardSearchInput from "@/components/core/DashboardSearchInput";
import {
  Center,
  Flex,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Grid,
  GridItem,
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

function DashboardPage(): ReactElement {
  const [dashboardType, setDashboardType] = useState<DashboardDisplay>(
    DashboardDisplay.Listings
  );

  const listingData = [testListing, testListing, testListing];

  // const [listingData, setListingsData] = useState([]);

  const openLandlordListing = () => {
    setDashboardType(DashboardDisplay.Listings);
  };

  const openTenantListing = () => {
    setDashboardType(DashboardDisplay.Tenants);
  };

  const openChatListing = () => {
    setDashboardType(DashboardDisplay.Chat);
  };

  const TenantListings = ({ isOpen }: any) => {
    return (
      <Tabs w="100%" h="100%" isLazy display={isOpen ? "block" : "none"}>
        <TabList>
          <TabPrimary>Past</TabPrimary>
          <TabPrimary>Current</TabPrimary>
          <TabPrimary>Upcoming</TabPrimary>
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
            <TenantListingTable listings={listingData} />
          </TabPanel>
          <TabPanel>
            <TenantListingTable listings={listingData} />
          </TabPanel>
          <TabPanel>
            <TenantListingTable listings={listingData} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    );
  };

  const LandlordListings = ({ isOpen }: any) => {
    return (
      <Tabs w="100%" h="100%" display={isOpen ? "block" : "none"}>
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
  };

  const TenantListingTable = (props: ListingProps) => {
    const { listings } = props;
    return (
      <Table>
        <Thead>
          <Tr>
            <Th display={["none", "none", "none", "block", "block"]}>Image</Th>
            <Th>Property</Th>
            <Th>Price</Th>
            <Th>Date</Th>
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
                <MultiWeightText bold={listing.price} normal="/month" />
              </Td>
              <Td>
                <Box>Date Placeholder</Box>
              </Td>
              <Td>
                <ButtonSecondary>Cancel</ButtonSecondary>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    );
  };

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
                <MultiWeightText bold={listing.price} normal="/month" />
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

  return (
    <>
      <Head>
        <title>Yōkoso</title>
        <meta name="description" content="ようこそ. Discover your new home." />
      </Head>

      <Grid
        height="100vh"
        gridTemplateRows="78px 1fr"
        templateColumns={["1fr", "1fr", "1fr", " 1fr", "200px 1fr"]}
      >
        <GridItem
          rowSpan={[0, 0, 0, 3, 3]}
          display={["none", "none", "none", "none", "grid"]}
        >
          <Sidebar
            onClickLandlord={openLandlordListing}
            onClickTenant={openTenantListing}
            onClickChat={openChatListing}
          />
        </GridItem>
        <GridItem rowSpan="auto">
          <DashboardHeader title={dashboardType} />
        </GridItem>
        <GridItem rowSpan={3} h="100%">
          <Center bg="#F9FBFD" h="100%">
            <Flex
              borderRadius="8px"
              border="1px solid #E9EEF4"
              boxShadow="2xl"
              w={["100%", "100%", "100%", "95%", "95%"]}
              h={["100%", "100%", "100%", "80vh", "80vh"]}
              bg="#FFFFFF"
              padding="1vh 4vh"
            >
              <LandlordListings
                isOpen={dashboardType === DashboardDisplay.Listings}
              />
              <TenantListings
                isOpen={dashboardType === DashboardDisplay.Tenants}
              />
            </Flex>
          </Center>
        </GridItem>
      </Grid>
    </>
  );
}

export default DashboardPage;
