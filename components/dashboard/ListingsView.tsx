import { useMemo, useState, ReactElement } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { ButtonPrimary, ButtonSecondary } from "@/components/core/Button";
import { DashboardCard } from "@/components/core/Layout";
import { TabPrimary } from "@/components/core/Tabs";
import {
  listingRouteBuilder,
  listingHrefBuilder,
} from "@/src/utils/listingRoute";
import DashboardSearchInput from "@/components/core/DashboardSearchInput";
import {
  Link,
  Tooltip,
  useToast,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Table,
  ButtonGroup,
  IconButton,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Thead,
  Modal,
  Spacer,
  Box,
  Tbody,
  Tr,
  Th,
  Td,
  useDisclosure,
} from "@chakra-ui/react";
import {
  PropertyImage,
  MultiWeightText,
  PropertyDes,
} from "@/components/sections/Listings";
import RoutePath, { RoutePathDashboard } from "@/src/routes";
import { Listing, Visibility } from "@/src/api/types";
import { auth } from "@/src/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { listings as listingsCollection } from "@/src/api/collections";
import { useCollection } from "react-firebase-hooks/firestore";
import { DeleteIcon, ViewOffIcon, ViewIcon } from "@chakra-ui/icons";
import { Heading5 } from "../core/Text";

interface ListingProps {
  listingType: Visibility;
  listings?: Listing[];
  userId?: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  listing: Listing | undefined;
  visibility?: Visibility;
}

const DeleteConfirmationModal = (props: ModalProps) => {
  const { isOpen, onClose, listing } = props;

  const toast = useToast();

  const handleDelete = async (listingId: string | undefined) => {
    try {
      await listingsCollection.doc(listingId).delete();

      toast({
        title: "Deleted Listing",
        description: "We successfully deleted your listing",
        isClosable: true,
        duration: 4000,
        status: "success",
      });
    } catch (e) {
      toast({
        title: "Something went wrong",
        description:
          "An error occurred and we couldn't delete your listing. Please try again later.",
        isClosable: true,
        duration: 4000,
        status: "error",
      });
    }
  };

  const onDelete = (listingId: string | undefined) => {
    handleDelete(listingId);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="sm">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading5>Delete Listing</Heading5>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody mb="1rem">
          <p>Are you sure you want to delete the listing,</p>
          <b>{listing?.details.title}</b>?<p>This action cannot be undone.</p>
        </ModalBody>
        <ModalFooter>
          <ButtonPrimary mr={3} onClick={() => onDelete(listing?.id)}>
            Delete
          </ButtonPrimary>
          <ButtonSecondary onClick={onClose}>Cancel</ButtonSecondary>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const VisibilityConfirmationModal = (props: ModalProps) => {
  const { isOpen, onClose, listing, visibility } = props;

  const toggleVisibility = visibility === "public" ? "hidden" : "public";

  const toast = useToast();

  const publicSuccessMsg = "Listing was successfully made public";
  const hiddenSuccessMsg = "Listing was successfully hidden";

  const handleVisibilityChange = async (listingId: string | undefined) => {
    try {
      await listingsCollection
        .doc(listingId)
        .update({ visibility: `${toggleVisibility}` });

      toast({
        title: "Updated Listing",
        description:
          visibility === "public" ? hiddenSuccessMsg : publicSuccessMsg,
        isClosable: true,
        duration: 4000,
        status: "success",
      });
    } catch (e) {
      toast({
        title: "Something went wrong",
        description:
          "An error occurred and we couldn't update your listing. Please try again later.",
        isClosable: true,
        duration: 4000,
        status: "error",
      });
    }
  };

  const onVisibilityUpdate = (listingId: string | undefined) => {
    handleVisibilityChange(listingId);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="sm">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading5>Delete Listing</Heading5>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody mb="1rem">
          <p>Are you sure you want to make the listing,</p>
          <b>{listing?.details.title}</b>
          {` ${toggleVisibility}?`}
        </ModalBody>
        <ModalFooter>
          <ButtonPrimary mr={3} onClick={() => onVisibilityUpdate(listing?.id)}>
            Update
          </ButtonPrimary>
          <ButtonSecondary onClick={onClose}>Cancel</ButtonSecondary>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const LandlordListingTable = (props: ListingProps) => {
  const { listings, userId, listingType } = props;

  const [listingModal, setListingModal] = useState<Listing | undefined>();

  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onClose: onDeleteModalClose,
  } = useDisclosure();

  const {
    isOpen: isVisibilityUpdateModalOpen,
    onOpen: onVisibilityUpdateModalOpen,
    onClose: onVisibilityUpdateModalClose,
  } = useDisclosure();

  const handleOpenModal = (listing: Listing, isDelete?: boolean) => {
    setListingModal(listing);
    if (isDelete) {
      onDeleteModalOpen();
    } else {
      onVisibilityUpdateModalOpen();
    }
  };

  const handleCloseModal = (isDelete?: boolean) => {
    setListingModal(undefined);
    if (isDelete) {
      onDeleteModalClose();
    } else {
      onVisibilityUpdateModalClose();
    }
  };

  return (
    <>
      <Table>
        <Thead>
          <Tr>
            <Th display={["none", "none", "none", "block", "block"]}>Image</Th>
            <Th>Property</Th>
            <Th>Price</Th>
            <Th>Applicants</Th>
            <Th width={0} />
            <Th width={0} />
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
                <Box>{listing.applicants}</Box>
              </Td>
              <Td>
                <NextLink
                  href={listingHrefBuilder(listing.id, userId)}
                  as={listingRouteBuilder(listing.id)}
                  passHref
                >
                  <Link _hover={{ textDecoration: "none" }}>
                    <ButtonSecondary>View Listing</ButtonSecondary>
                  </Link>
                </NextLink>
              </Td>
              <Td>
                <ButtonGroup>
                  <Tooltip
                    label={
                      listingType === "public"
                        ? "Hide Listing"
                        : "Make Listing Public"
                    }
                    hasArrow
                  >
                    <IconButton
                      size="md"
                      variant="ghost"
                      onClick={() => handleOpenModal(listing)}
                      aria-label={
                        listingType === "public"
                          ? "Hide Listing"
                          : "Make Listing Public"
                      }
                      icon={
                        listingType === "public" ? (
                          <ViewOffIcon />
                        ) : (
                          <ViewIcon />
                        )
                      }
                    />
                  </Tooltip>

                  <Tooltip hasArrow label="Delete Listing">
                    <IconButton
                      size="md"
                      variant="ghost"
                      aria-label="Delete Listing"
                      onClick={() => handleOpenModal(listing, true)}
                      icon={<DeleteIcon />}
                    />
                  </Tooltip>
                </ButtonGroup>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => handleCloseModal(true)}
        listing={listingModal}
      />
      <VisibilityConfirmationModal
        isOpen={isVisibilityUpdateModalOpen}
        onClose={() => handleCloseModal()}
        listing={listingModal}
        visibility={listingType}
      />
    </>
  );
};

function ListingsView(): ReactElement {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [visibility, setVisibility] = useState<Visibility>("public");
  const query = useMemo(
    () =>
      user
        ? listingsCollection
            .where("owner.uid", "==", user.uid)
            .where("visibility", "==", visibility)
        : undefined,
    [user, visibility]
  );
  const [snapshot] = useCollection(query);
  const listings = snapshot?.docs.map(
    (doc) =>
      (({
        ...doc.data(),
        id: doc.id,
      } as unknown) as Listing)
  );

  return (
    <DashboardCard>
      <Tabs isLazy>
        <TabList>
          <TabPrimary onClick={() => setVisibility("public")}>
            Listings
          </TabPrimary>
          <TabPrimary onClick={() => setVisibility("hidden")}>
            Hidden
          </TabPrimary>
          <Spacer />
          <Box marginTop="8px" marginBottom="8px" width="2.5in">
            <DashboardSearchInput />
          </Box>
          <Box marginY="auto" marginLeft="64px" marginRight="24px">
            <ButtonPrimary
              onClick={() =>
                router.push(
                  `${RoutePath.Dashboard}/${RoutePathDashboard.Create}`
                )
              }
            >
              Create Listing
            </ButtonPrimary>
          </Box>
        </TabList>

        <TabPanels>
          <TabPanel paddingX={0}>
            <LandlordListingTable
              listingType={visibility}
              userId={user?.uid}
              listings={listings}
            />
          </TabPanel>
          <TabPanel>
            <LandlordListingTable
              listingType={visibility}
              userId={user?.uid}
              listings={listings}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </DashboardCard>
  );
}

export default ListingsView;
