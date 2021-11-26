import { useMemo, useState, ReactElement, useEffect } from "react";
import { ButtonPrimary, ButtonSecondary } from "@/components/core/Button";
import { DashboardCard } from "@/components/core/Layout";
import { TabPrimary } from "@/components/core/Tabs";
import NextLink from "next/link";
import DashboardSearchInput from "@/components/core/DashboardSearchInput";
import {
  Link,
  Tabs,
  ButtonGroup,
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
  IconButton,
  useDisclosure,
  useToast,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Modal,
} from "@chakra-ui/react";
import { PropertyImage } from "@/components/sections/Listings";
import { TenantRequestEntry } from "@/src/api/types";
import { auth } from "@/src/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { tenantRequests } from "@/src/api/collections";
import { useCollection } from "react-firebase-hooks/firestore";
import { getUserPublicById } from "@/src/api/queries";
import { DeleteIcon, CloseIcon, CheckIcon } from "@chakra-ui/icons";
import {
  listingRouteBuilder,
  listingHrefBuilder,
} from "@/src/utils/listingRoute";
import { useStore } from "@/src/store";
import { UserType } from "@/src/enum";
import { Heading5 } from "../core/Text";

enum Request {
  Sent = "tenantUid",
  Received = "landlordUid",
}

interface DeleteProps {
  isOpen: boolean;
  onClose: () => void;
  request: TenantRequestEntry | undefined;
}

function RequestView(): ReactElement {
  const [tenantRequestList, setTenantRequestList] = useState<
    TenantRequestEntry[]
  >([]);
  const userType = useStore((state) => state.userType);
  const selectedRequest =
    userType && userType === UserType.Tenant ? Request.Sent : Request.Received;

  const [user] = useAuthState(auth);
  const query = useMemo(
    () =>
      user ? tenantRequests.where(selectedRequest, "==", user.uid) : undefined,
    [user, selectedRequest]
  );

  const [snapshot] = useCollection(query);

  useEffect(() => {
    const handleTenantRequestPromise = async () => {
      const tenantRequestPromise = snapshot?.docs.map(async (doc) => {
        const requestData = doc.data();
        const publicUserInfo = await getUserPublicById(
          requestData[
            selectedRequest === Request.Received ? "tenantUid" : "landlordUid"
          ]
        );

        return {
          ...publicUserInfo,
          ...requestData,
          id: doc.id,
        } as TenantRequestEntry;
      });

      if (tenantRequestPromise) {
        setTenantRequestList(await Promise.all(tenantRequestPromise));
      }
    };

    if (selectedRequest) {
      handleTenantRequestPromise();
    }
  }, [selectedRequest, snapshot]);

  return (
    <DashboardCard>
      <Tabs isLazy>
        <TabList>
          <TabPrimary>
            {selectedRequest && selectedRequest === Request.Received
              ? "Received"
              : "Sent"}
          </TabPrimary>

          <Spacer />
          <Box marginTop="8px" marginBottom="16px">
            <DashboardSearchInput />
          </Box>
        </TabList>
        <TabPanels>
          <TabPanel>
            <RequestsTable
              tenantRequests={tenantRequestList}
              userId={user?.uid}
              requestType="received"
            />
          </TabPanel>
          <TabPanel>
            <RequestsTable
              tenantRequests={tenantRequestList}
              userId={user?.uid}
              requestType="sent"
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </DashboardCard>
  );
}

const DeleteConfirmationModal = (props: DeleteProps) => {
  const { isOpen, onClose, request } = props;

  const listingTitle = request?.listing.data.details.title;

  const toast = useToast();

  const handleDelete = async (requestId: string | undefined) => {
    try {
      await tenantRequests.doc(requestId).delete();
      toast({
        title: "Deleted Tenant Request",
        description: `We successfully deleted your tenant Request for listing: ${listingTitle}`,
        isClosable: true,
        duration: 4000,
        status: "success",
      });
    } catch (e) {
      toast({
        title: "Something went wrong",
        description:
          "An error occurred and we couldn't delete your tenant request. Please try again later.",
        isClosable: true,
        duration: 4000,
        status: "error",
      });
    }
  };

  const onDelete = (requestId: string | undefined) => {
    handleDelete(requestId);
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
          <p>Are you sure you want to delete the tenant request for listing,</p>
          <b>{listingTitle}</b>?<p>This action cannot be undone.</p>
        </ModalBody>
        <ModalFooter>
          <ButtonPrimary mr={3} onClick={() => onDelete(request?.id)}>
            Delete
          </ButtonPrimary>
          <ButtonSecondary onClick={onClose}>Cancel</ButtonSecondary>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const RequestsTable = (props: {
  tenantRequests?: TenantRequestEntry[];
  userId: string | undefined;
  requestType: string;
}) => {
  const { tenantRequests, userId, requestType } = props;

  const [tenantRequest, setTenantRequest] = useState<
    TenantRequestEntry | undefined
  >();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDeleteRequestModal = (
    request: TenantRequestEntry | undefined
  ) => {
    setTenantRequest(request);
    onOpen();
  };

  const handleDeleteRequestModalClose = () => {
    setTenantRequest(undefined);
    onClose();
  };

  return (
    <>
      <Table>
        <Thead>
          <Tr>
            <Th display={["none", "none", "none", "block", "block"]}>Photo</Th>
            <Th>Listing</Th>
            <Th>First name</Th>
            <Th>Last name</Th>
            <Th>Sent Date</Th>
            <Th width={0} />
          </Tr>
        </Thead>
        <Tbody>
          {tenantRequests?.map((tenant, index) => {
            return (
              <Tr key={index}>
                <Td display={["none", "none", "none", "block", "block"]}>
                  <PropertyImage
                    image={tenant.listing.data.images[0]}
                    size="150px"
                  />
                </Td>
                <Td>{tenant.listing.data.details.title}</Td>
                <Td>{tenant.firstName}</Td>
                <Td>{tenant.lastName}</Td>
                <Td>{tenant.listing.initiatedAt.toDate().toDateString()}</Td>
                <Td>
                  <ButtonGroup>
                    <NextLink
                      href={listingHrefBuilder(tenant.listing.data.id, userId)}
                      as={listingRouteBuilder(tenant.listing.data.id)}
                      passHref
                    >
                      <Link _hover={{ textDecoration: "none" }}>
                        <ButtonSecondary>View Listing</ButtonSecondary>
                      </Link>
                    </NextLink>
                    {requestType === "sent" ? (
                      <IconButton
                        size="md"
                        variant="ghost"
                        aria-label="Delete Listing"
                        onClick={() => handleDeleteRequestModal(tenant)}
                        icon={<DeleteIcon />}
                      />
                    ) : (
                      <>
                        <IconButton
                          size="sm"
                          variant="ghost"
                          aria-label="Delete Listing"
                          icon={<CheckIcon />}
                        />
                        <IconButton
                          size="sm"
                          variant="ghost"
                          aria-label="Delete Listing"
                          icon={<CloseIcon />}
                        />
                      </>
                    )}
                  </ButtonGroup>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <DeleteConfirmationModal
        isOpen={isOpen}
        onClose={handleDeleteRequestModalClose}
        request={tenantRequest}
      />
    </>
  );
};

export default RequestView;
