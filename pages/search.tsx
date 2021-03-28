import React, { ReactElement, useState } from "react";
import HeaderWhite from "@/components/sections/HeaderWhite";
import Head from "next/head";
import { Heading4 } from "@/components/core/Text";
import { LgSearchResult, SmSearchResult } from "@/components/SearchResult";
import { ListingType } from "../src/types";
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

interface SearchProps {
  location: string;
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

  const { location } = props;

  const [getListings, setListings] = useState([]);
  const [priceFilter, setPriceFilter] = useState([0, 2150]);
  const [rooms, setRooms] = useState(1);
  const [bathrooms, setBathroom] = useState(1);

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
            display={["none", "none", "block", "block", "block"]}
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
      <HeaderWhite />
      <Flex
        paddingTop={["170px", "170px", "170px", "78px", "78px"]}
        column={2}
        height="100vh"
        bg="white"
      >
        <Box flex="1" row={3} overflowY="scroll">
          <Box flex="1" p="5">
            <Heading4>Listings in {location}</Heading4>
          </Box>
          <SimpleGrid flex="1" p="4" spacing={[0, 0, 1, 4, 4]} columns={4}>
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
                  step={50}
                  filterName="Max price"
                  onChange={(val) => setPriceFilter(val)}
                />
              }
            ></SingleFilter>

            <SingleFilter
              name="Rooms"
              isOpen={isOpenRooms}
              onOpen={onOpenRooms}
              onClose={onCloseRooms}
              childComp={
                <CounterFilter
                  value={rooms}
                  set={setRooms}
                  onClickAdd={() => (rooms < 15 ? setRooms(rooms + 1) : null)}
                  onClickMinus={() => (rooms > 1 ? setRooms(rooms - 1) : null)}
                />
              }
            ></SingleFilter>
            <SingleFilter
              name="Bathrooms"
              isOpen={isOpenBathroom}
              onOpen={onOpenBathroom}
              onClose={onCloseBathroom}
              childComp={
                <CounterFilter
                  set={setBathroom}
                  value={bathrooms}
                  onClickAdd={() =>
                    bathrooms < 99 ? setBathroom(bathrooms + 1) : null
                  }
                  onClickMinus={() =>
                    bathrooms > 1 ? setBathroom(bathrooms - 1) : null
                  }
                />
              }
            ></SingleFilter>

            <ButtonSecondaryVariant padding="9px" onClick={onFilterOpen}>
              Other
            </ButtonSecondaryVariant>
            <FilterModals isOpen={isFilterOpen} onClose={onFilterClose} />
          </SimpleGrid>
          <Divider />
          <Box flex="2" overflow="auto">
            {getListings.map((listing: ListingType) => (
              <LgSearchResult
                imageUrl={listing.imageUrl}
                location={listing.location}
                price={listing.price}
                numBaths={listing.numBaths}
                numBeds={listing.numBeds}
                id={listing.id}
                title={listing.title}
                display={["none", "block", "block", "block", "block"]}
                width="100%"
              />
            ))}
          </Box>
          <Box flex="2" paddingTop={4} overflow="auto">
            {getListings.map((listing: ListingType) => (
              <SmSearchResult
                imageUrl={listing.imageUrl}
                location={listing.location}
                price={listing.price}
                numBaths={listing.numBaths}
                numBeds={listing.numBeds}
                id={listing.id}
                title={listing.title}
                display={["block", "none", "none", "none", "none"]}
                width="100%"
              />
            ))}
          </Box>
        </Box>
        <Box
          flex="1.25"
          display={["none", "none", "block", "block", "block"]}
        ></Box>
      </Flex>
    </>
  );
}

export default Search;
