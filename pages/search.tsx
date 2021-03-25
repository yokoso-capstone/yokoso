import React, { ReactElement, useState } from "react";
import HeaderWhite from "@/components/sections/HeaderWhite";
import Head from "next/head";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { Heading4 } from "@/components/core/Text";
import { LgSearchResult, SmSearchResult } from "@/components/SearchResult";
import { ListingType } from "../src/types";
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
  IconButton,
  Input,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  useDisclosure,
} from "@chakra-ui/react";

interface SearchProps {
  location: string;
}

interface FilterDisplay {
  childComp?: React.ReactNode;
  name: string;
}

function Search(props: SearchProps): ReactElement {
  const {
    isOpen: isFilterOpen,
    onOpen: onFilterOpen,
    onClose: onFilterClose,
  } = useDisclosure();

  const { location } = props;

  const [getListings, setListings] = useState([]);
  const [priceFilter, setPriceFilter] = useState();
  const [roomFilter, setRoomFilter] = useState();
  const [bathroomFilter, setBathroomFilter] = useState();

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
    const { childComp, name } = props;
    return (
      <Popover>
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

  const RoomFilter = () => {
    return (
      <Box display="inline">
        <IconButton
          borderRadius="100%"
          aria-label="Subtract rooms"
          icon={<MinusIcon />}
        />
        <Input w="50px" />
        <IconButton
          borderRadius="100%"
          aria-label="Add rooms"
          icon={<AddIcon />}
        />
      </Box>
    );
  };

  const PriceFilter = () => {
    return (
      <Box>
        <Slider aria-label="price-slider">
          <SliderTrack>
            <SliderFilledTrack bg="brand.primary" />
          </SliderTrack>
          <SliderThumb borderWidth="1px" borderColor="grey" />
        </Slider>
      </Box>
    );
  };

  const BathroomFilter = () => {
    return (
      <Box display="inline">
        <IconButton
          borderRadius="100%"
          aria-label="Subtract bathrooms"
          icon={<MinusIcon />}
        />
        <Input w="50px" />
        <IconButton
          borderRadius="100%"
          aria-label="Add bathrooms"
          icon={<AddIcon />}
        />
      </Box>
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
              childComp={<PriceFilter />}
            ></SingleFilter>

            <SingleFilter
              name="Rooms"
              childComp={<RoomFilter />}
            ></SingleFilter>

            <SingleFilter
              name="Bathrooms"
              childComp={<BathroomFilter />}
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
