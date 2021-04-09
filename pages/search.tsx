import React, { ReactElement, useState } from "react";
import Header from "@/components/sections/Header";
import Head from "next/head";
import Map from "@/components/sections/Map";
import { Heading4 } from "@/components/core/Text";
import { LgSearchResult, SmSearchResult } from "@/components/SearchResult";
import { CounterFilter, SliderFilter } from "@/components/sections/Filters";
import {
  ButtonSecondaryVariant,
  ButtonSecondary,
} from "@/components/core/Button";
import {
  Divider,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  Flex,
  Box,
  SimpleGrid,
  PopoverFooter,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalContent,
  FormControl,
  FormLabel,
  useDisclosure,
} from "@chakra-ui/react";
import { ListingType, testListing, Coordinate } from "../src/types";

interface SearchProps {
  location: Coordinate;
  listings: ListingType[];
}

interface FilterDisplay {
  childComp?: React.ReactNode;
  name: string;
  isOpen: boolean;
  onOpen: () => any;
  onClose: () => any;
}

function Search(props: SearchProps): ReactElement {
  const {
    isOpen: isFilterOpen,
    onOpen: onFilterOpen,
    onClose: onFilterClose,
  } = useDisclosure();

  const {
    onOpen: onOpenBathroom,
    onClose: onCloseBathroom,
    isOpen: isOpenBathroom,
  } = useDisclosure();

  const {
    onOpen: onOpenRooms,
    onClose: onCloseRooms,
    isOpen: isOpenRooms,
  } = useDisclosure();

  const {
    onOpen: onOpenPrice,
    onClose: onClosePrice,
    isOpen: isOpenPrice,
  } = useDisclosure();

  const [priceFilter, setPriceFilter] = useState([0, 2150]);
  const [rooms, setRooms] = useState(1);
  const [bathrooms, setBathroom] = useState(1);

  const { location, listings = [testListing] } = props;

  const FilterModals = ({ isOpen, onClose }: any) => {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Filters</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="more-filters">
              <FormLabel>Amenities</FormLabel>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <ButtonSecondary>Apply</ButtonSecondary>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };

  const SingleFilter = (props: FilterDisplay) => {
    const { name, childComp, onOpen, onClose, isOpen } = props;

    return (
      <Popover isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
        <PopoverTrigger>
          <ButtonSecondaryVariant
            padding="9px"
            display={["none", "none", "none", "block", "block"]}
            maxW="140px"
          >
            {name}
          </ButtonSecondaryVariant>
        </PopoverTrigger>
        <PopoverContent marginLeft="10px">
          <PopoverArrow />
          <PopoverHeader>{name}</PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody>{childComp}</PopoverBody>
          <PopoverFooter>
            <ButtonSecondary padding="10px">Apply</ButtonSecondary>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    );
  };

  return (
    <>
      <Head>
        <title>Yōkoso</title>
        <meta name="description" content="ようこそ. Discover your new home." />
      </Head>
      <Box height="100vh" overflow="hidden">
        <Header searchInput maxWidth="none" paddingX="4" />
        <Flex column={2} height="100%" bg="white">
          <Box flex={[1, 1, 1, 1, 0.9]} row={3} overflowY="auto" maxW="700px">
            <Box flex="1" p="5">
              <Heading4>Listings in {location?.locationName}</Heading4>
            </Box>
            <SimpleGrid flex="1" p="4" spacing={[0, 0, 1, 2, 2]} columns={4}>
              <SingleFilter
                name="Price"
                isOpen={isOpenPrice}
                onOpen={onOpenPrice}
                onClose={onClosePrice}
                childComp={
                  <SliderFilter
                    max={2100}
                    min={0}
                    value={priceFilter}
                    onChange={(val) => setPriceFilter(val)}
                  />
                }
              />

              <SingleFilter
                name="Rooms"
                isOpen={isOpenRooms}
                onOpen={onOpenRooms}
                onClose={onCloseRooms}
                childComp={
                  <CounterFilter
                    value={rooms}
                    onClickAdd={() => (rooms < 15 ? setRooms(rooms + 1) : null)}
                    onClickMinus={() =>
                      rooms > 1 ? setRooms(rooms - 1) : null
                    }
                  />
                }
              />
              <SingleFilter
                name="Bathrooms"
                isOpen={isOpenBathroom}
                onOpen={onOpenBathroom}
                onClose={onCloseBathroom}
                childComp={
                  <CounterFilter
                    value={bathrooms}
                    onClickAdd={() =>
                      bathrooms < 99 ? setBathroom(bathrooms + 1) : null
                    }
                    onClickMinus={() =>
                      bathrooms > 1 ? setBathroom(bathrooms - 1) : null
                    }
                  />
                }
              />

              <ButtonSecondaryVariant
                maxW="140px"
                padding="9px"
                onClick={onFilterOpen}
              >
                Other
              </ButtonSecondaryVariant>
              <FilterModals isOpen={isFilterOpen} onClose={onFilterClose} />
            </SimpleGrid>
            <Divider />
            <Box flex="1" overflow="auto" w="100%">
              {listings.map((listing: ListingType, index) => (
                <LgSearchResult
                  key={index}
                  imageUrl={listing.imageUrl}
                  location={listing.location.city}
                  price={listing.price}
                  numBaths={listing.numBaths}
                  numBeds={listing.numBeds}
                  id={listing.key}
                  title={listing.title}
                  display={["none", "block", "none", "block", "block"]}
                  width="100%"
                />
              ))}
            </Box>
            <Box flex="1" paddingTop={4} overflow="auto" w="100%">
              {listings.map((listing: ListingType, index) => (
                <SmSearchResult
                  key={index}
                  imageUrl={listing.imageUrl}
                  location={listing.location.city}
                  price={listing.price}
                  numBaths={listing.numBaths}
                  numBeds={listing.numBeds}
                  id={listing.key}
                  title={listing.title}
                  display={["block", "none", "block", "none", "none"]}
                  width="100%"
                />
              ))}
            </Box>
          </Box>
          <Box
            flex={[0, 0, 1, 1, 1.25]}
            display={["none", "none", "block", "block", "block"]}
            position="relative"
            maxW="100%"
          >
            <Map
              defaultLat={43.65107}
              defaultLong={-79.347015}
              // defaultLat={location.latitude}
              // defaultLong={location.longitude}
              listings={listings}
            />
          </Box>
        </Flex>
      </Box>
    </>
  );
}
export default Search;
