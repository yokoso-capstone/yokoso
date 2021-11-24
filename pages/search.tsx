import React, { useMemo, useState, ReactElement } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
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
  Link,
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
  HStack,
  Tag,
  TagLabel,
  TagCloseButton,
  TagLeftIcon,
} from "@chakra-ui/react";
import { getQueryValue } from "@/src/utils";
import { listings as listingsCollection } from "@/src/api/collections";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import { Listing } from "@/src/api/types";
import { listingRouteBuilder } from "@/src/utils/listingRoute";
import { BiDoorOpen, BiDollar } from "react-icons/bi";
import { FaToilet } from "react-icons/fa";
import { useDebounce } from "use-debounce";

interface FilterDisplay {
  childComp?: React.ReactNode;
  name: string;
  isOpen: boolean;
  onOpen: () => any;
  onClose: () => any;
  onApply: () => any;
}

const SLIDER_FILTER_MIN = 0;
const SLIDER_FILTER_MAX = 2100;

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
          {/* TODO: add or remove amenities filter */}
          <ButtonSecondary onClick={onClose}>Apply</ButtonSecondary>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const SingleFilter = (props: FilterDisplay) => {
  const { name, childComp, onOpen, onClose, isOpen, onApply } = props;

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
          <ButtonSecondary
            padding="10px"
            onClick={() => {
              onApply();
              onClose();
            }}
          >
            Apply
          </ButtonSecondary>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};

function SearchPage(): ReactElement {
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

  const [priceFilter, setPriceFilter] = useState([
    SLIDER_FILTER_MIN,
    SLIDER_FILTER_MAX + 1,
  ]);
  // Use debounce to reduce the number of queries with using price slider
  const [priceFilterDebounced] = useDebounce(priceFilter, 500);
  const [rooms, setRooms] = useState(1);
  const [bathrooms, setBathroom] = useState(1);

  const [isPriceFilterActive, setPriceFilterActive] = useState(false);
  const [isRoomFilterActive, setRoomFilterActive] = useState(false);
  const [isBathroomFilterActive, setBathroomFilterActive] = useState(false);

  const router = useRouter();
  const { center } = router.query;
  const place = getQueryValue(router.query, "place");
  const text = getQueryValue(router.query, "text")?.toLowerCase();

  // Query uses composite indexes
  const query = useMemo(() => {
    if (!text) {
      return undefined;
    }

    let query = listingsCollection.where("location.cityKey", "==", text);

    if (isPriceFilterActive) {
      const [minPrice, maxPrice] = priceFilterDebounced;

      query = query.where("lease.price", ">=", minPrice);

      if (maxPrice <= SLIDER_FILTER_MAX) {
        query = query.where("lease.price", "<=", maxPrice);
      }
    }

    if (isRoomFilterActive) {
      query = query.where("details.numBedrooms", "==", rooms);
    }

    if (isBathroomFilterActive) {
      query = query.where("details.numBaths", "==", bathrooms);
    }

    return query;
  }, [
    text,
    isPriceFilterActive,
    priceFilterDebounced,
    isRoomFilterActive,
    rooms,
    isBathroomFilterActive,
    bathrooms,
  ]);
  const [snapshot] = useCollectionOnce(query);
  const listings = snapshot?.docs.map(
    (doc) =>
      (({
        ...doc.data(),
        id: doc.id,
      } as unknown) as Listing)
  );

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
              <Heading4>{place || "Location not found"}</Heading4>
            </Box>
            <SimpleGrid flex="1" m="4" spacing={[0, 0, 1, 2, 2]} columns={4}>
              <SingleFilter
                name="Price"
                isOpen={isOpenPrice}
                onOpen={onOpenPrice}
                onClose={onClosePrice}
                onApply={() => setPriceFilterActive(true)}
                childComp={
                  <SliderFilter
                    max={SLIDER_FILTER_MAX}
                    min={SLIDER_FILTER_MIN}
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
                onApply={() => setRoomFilterActive(true)}
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
                onApply={() => setBathroomFilterActive(true)}
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
            <HStack m={4}>
              {isPriceFilterActive && (
                <Tag size="md" borderRadius="full">
                  <TagLeftIcon boxSize="14px" as={BiDollar} />
                  <TagLabel>{`${priceFilter[0]} - ${
                    priceFilter[1] > SLIDER_FILTER_MAX
                      ? `${SLIDER_FILTER_MAX}+`
                      : priceFilter[1]
                  }`}</TagLabel>
                  <TagCloseButton onClick={() => setPriceFilterActive(false)} />
                </Tag>
              )}
              {isRoomFilterActive && (
                <Tag size="md" borderRadius="full">
                  <TagLeftIcon boxSize="14px" as={BiDoorOpen} />
                  <TagLabel>
                    {rooms} {rooms > 1 ? "rooms" : "room"}
                  </TagLabel>
                  <TagCloseButton onClick={() => setRoomFilterActive(false)} />
                </Tag>
              )}
              {isBathroomFilterActive && (
                <Tag size="md" borderRadius="full">
                  <TagLeftIcon boxSize="14px" as={FaToilet} />
                  <TagLabel>
                    {bathrooms} {bathrooms > 1 ? "bathrooms" : "bathroom"}
                  </TagLabel>
                  <TagCloseButton
                    onClick={() => setBathroomFilterActive(false)}
                  />
                </Tag>
              )}
            </HStack>
            <Divider />
            <Box flex="1" overflow="auto" w="100%">
              {listings?.map((listing, index) => (
                <NextLink
                  key={listing.id || index}
                  href={listingRouteBuilder(listing.id)}
                  passHref
                >
                  <Link textDecoration="none !important">
                    <LgSearchResult
                      listing={listing}
                      num={index + 1}
                      display={["none", "block", "none", "block", "block"]}
                      width="100%"
                    />
                  </Link>
                </NextLink>
              ))}
            </Box>
            <Box flex="1" paddingTop={4} overflow="auto" w="100%">
              {listings?.map((listing, index) => (
                <NextLink
                  key={listing.id || index}
                  href={listingRouteBuilder(listing.id)}
                  passHref
                >
                  <Link textDecoration="none !important">
                    <SmSearchResult
                      listing={listing}
                      num={index + 1}
                      display={["block", "none", "block", "none", "none"]}
                      width="100%"
                    />
                  </Link>
                </NextLink>
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
              defaultLat={center ? Number(center[1]) : 0}
              defaultLong={center ? Number(center[0]) : 0}
              zoom={12}
              listings={listings}
            />
          </Box>
        </Flex>
      </Box>
    </>
  );
}
export default SearchPage;
