import { useMemo, useState, ReactElement, useEffect } from "react";
import {
  ButtonPrimary,
  ButtonSecondary,
  RedButton,
} from "@/components/core/Button";
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
  Text,
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
  Checkbox,
  Tooltip,
  Stack,
} from "@chakra-ui/react";
import { PropertyImage } from "@/components/sections/Listings";
import { TenantRequestEntry } from "@/src/api/types";
import { auth } from "@/src/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { tenantRequests, listings } from "@/src/api/collections";
import { useCollection } from "react-firebase-hooks/firestore";
import { getUserPublicById, getListingById } from "@/src/api/queries";
import { DeleteIcon, CheckIcon, NotAllowedIcon } from "@chakra-ui/icons";
import { ListingStatus } from "@/src/enum";
import {
  listingRouteBuilder,
  listingHrefBuilder,
} from "@/src/utils/listingRoute";
import { useStore } from "@/src/store";
import { UserType } from "@/src/enum";
import { Heading5 } from "../core/Text";

enum Request {
  TenantUid = "tenantUid",
  LandlordUid = "landlordUid",
}

enum Status {
  Sent = "sent",
  Pending = "pending",
  Accepted = "accepted",
}

interface ButtonGroupProps {
  tenant: TenantRequestEntry;
}

interface DeleteProps {
  isOpen: boolean;
  onClose: () => void;
  request: TenantRequestEntry | undefined;
  modalType: string;
}

const MAX_TITLE_LENGTH = 15;

function RequestView(): ReactElement {
  const [tenantRequestList, setTenantRequestList] = useState<
    TenantRequestEntry[]
  >([]);
  const [requestStatus, setRequestStatus] = useState<Status>(Status.Sent);

  const userType = useStore((state) => state.userType);

  const selectedRequest =
    userType && userType === UserType.Tenant
      ? Request.TenantUid
      : Request.LandlordUid;

  const [user] = useAuthState(auth);

  const query = useMemo(
    () =>
      user
        ? tenantRequests
            .where(selectedRequest, "==", user.uid)
            .where("status", "==", requestStatus)
        : undefined,
    [user, selectedRequest, requestStatus, userType]
  );

  const [snapshot] = useCollection(query);

  useEffect(() => {
    const handleTenantRequestPromise = async () => {
      const tenantRequestPromise = snapshot?.docs.map(async (doc) => {
        const requestData = doc.data();
        const publicUserInfo = await getUserPublicById(
          requestData[
            userType === UserType.Tenant
              ? Request.LandlordUid
              : Request.TenantUid
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
    <>
      <DashboardCard>
        <Tabs isLazy>
          <TabList>
            <TabPrimary
              onClick={() => {
                setRequestStatus(Status.Sent);
              }}
            >
              {userType === UserType.Tenant ? "Sent" : "Received"}
            </TabPrimary>
            <TabPrimary
              onClick={() => {
                setRequestStatus(Status.Pending);
              }}
            >
              Pending
            </TabPrimary>
            <TabPrimary
              onClick={() => {
                setRequestStatus(Status.Accepted);
              }}
            >
              Accepted
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
                userView={userType}
                requestStatus={requestStatus}
              />
            </TabPanel>
            <TabPanel>
              <RequestsTable
                tenantRequests={tenantRequestList}
                userId={user?.uid}
                userView={userType}
                requestStatus={requestStatus}
              />
            </TabPanel>
            <TabPanel>
              <RequestsTable
                tenantRequests={tenantRequestList}
                userId={user?.uid}
                userView={userType}
                requestStatus={requestStatus}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </DashboardCard>
    </>
  );
}

const ActionConfirmationModal = (props: DeleteProps) => {
  const { isOpen, onClose, request, modalType } = props;

  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  useEffect(() => {
    const disableCTA = async () => {
      if (request?.listing.id) {
        const listing = await getListingById(request.listing.id);
        setIsDisabled(listing?.status !== ListingStatus.Available);
      }
    };

    if (modalType === "accept") {
      disableCTA();
    }
  }, [modalType, request]);

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
          "An error occurred and we couldn't request deposit. Please try again later.",
        isClosable: true,
        duration: 4000,
        status: "error",
      });
    }
  };

  const handleReject = async (requestId: string | undefined) => {
    try {
      await tenantRequests.doc(requestId).update({ status: "rejected" });

      toast({
        title: "Rejected Tenant Request",
        description: "Successfully rejected tenant request.",
        isClosable: true,
        duration: 4000,
        status: "success",
      });
    } catch (e) {
      toast({
        title: "Something went wrong",
        description:
          "An error occurred and we couldn't reject the tenant request. Please try again later.",
        isClosable: true,
        duration: 4000,
        status: "error",
      });
    }
  };

  const handleAccept = async (
    requestId: string | undefined,
    listingId: string | undefined
  ) => {
    try {
      if (isDisabled) {
        throw Error;
      }
      await listings.doc(listingId).update({ status: "pending" });
      await tenantRequests.doc(requestId).update({ status: "pending" });

      toast({
        title: "Deposit Request",
        description: "Successfully sent request deposit.",
        isClosable: true,
        duration: 4000,
        status: "success",
      });
    } catch (e) {
      toast({
        title: "Something went wrong",
        description:
          "An error occurred and we couldn't send the request deposit. Please try again later.",
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

  const onReject = (requestId: string | undefined) => {
    handleReject(requestId);
    onClose();
  };

  const onAccept = (
    requestId: string | undefined,
    listingId: string | undefined
  ) => {
    handleAccept(requestId, listingId);
    onClose();
  };

  const DeleteModal = () => (
    <>
      <ModalHeader>
        <Heading5>Delete Listing</Heading5>
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody mb="1rem">
        <Stack spacing={3}>
          <Text>
            Are you sure you want to delete the tenant request for listing:
          </Text>
          <Text>{`"${listingTitle}"`}</Text>
          <Text fontWeight="bold">This action cannot be undone.</Text>
        </Stack>
      </ModalBody>
      <ModalFooter>
        <ButtonPrimary mr={3} onClick={() => onDelete(request?.id)}>
          Delete
        </ButtonPrimary>
        <ButtonSecondary onClick={onClose}>Cancel</ButtonSecondary>
      </ModalFooter>
    </>
  );

  const AcceptModal = () => {
    const [checkedItems, setCheckedItems] = useState([false, false]);

    const allChecked = checkedItems.every(Boolean);

    return (
      <>
        <ModalHeader>
          <Heading5>Accept Rental Request</Heading5>
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody mb="1rem">
          <Stack spacing={3}>
            <div>
              <Text>{`Tenant: ${request?.firstName} ${request?.lastName}`}</Text>
              <Text>{`Listing: ${request?.listing.data.details.title}`}</Text>
            </div>
            <Text fontWeight="bold" mb="0.5rem">
              Please confirm the following:
            </Text>
            <Stack pl={3} mt={3} spacing={5}>
              <Checkbox
                isChecked={checkedItems[0]}
                onChange={(e) =>
                  setCheckedItems([e.target.checked, checkedItems[1]])
                }
              >
                I (landlord) have sent the tenant a valid lease agreement for
                the rental unit.
              </Checkbox>
              <Checkbox
                isChecked={checkedItems[1]}
                onChange={(e) =>
                  setCheckedItems([checkedItems[0], e.target.checked])
                }
              >
                I (landlord) have received a signed copy of the lease agreement
                from the tenant.
              </Checkbox>
            </Stack>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Tooltip
            hasArrow
            label={
              isDisabled
                ? "Cannot send deposit request because a pending request for this listing exists."
                : null
            }
          >
            <div>
              <ButtonPrimary
                mr={3}
                isDisabled={!allChecked || isDisabled}
                onClick={() => onAccept(request?.id, request?.listing.id)}
              >
                Request Deposit
              </ButtonPrimary>
            </div>
          </Tooltip>
          <ButtonSecondary onClick={onClose}>Cancel</ButtonSecondary>
        </ModalFooter>
      </>
    );
  };

  const RejectModal = () => (
    <>
      <ModalHeader>
        <Heading5>Reject Rental Request</Heading5>
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody mb="1rem">
        <Stack spacing={4}>
          <Text fontWeight="bold">
            Are you sure you want to reject the rental request:
          </Text>
          <div>
            <Text>{`Tenant: ${request?.firstName} ${request?.lastName}`}</Text>
            <Text>{`Listing: ${request?.listing.data.details.title}`}</Text>
          </div>
          <Text fontWeight="bold">This action cannot be undone.</Text>
        </Stack>
      </ModalBody>
      <ModalFooter>
        <RedButton mr={3} onClick={() => onReject(request?.id)}>
          Reject
        </RedButton>
        <ButtonSecondary onClick={onClose}>Cancel</ButtonSecondary>
      </ModalFooter>
    </>
  );

  const switchModal = (modalType: string) => {
    switch (modalType) {
      case "delete":
        return <DeleteModal />;
      case "accept":
        return <AcceptModal />;
      case "reject":
        return <RejectModal />;
      default:
        return null;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
      <ModalOverlay />
      <ModalContent>{switchModal(modalType)}</ModalContent>
    </Modal>
  );
};

const RequestsTable = (props: {
  tenantRequests?: TenantRequestEntry[];
  userId: string | undefined;
  userView: string | undefined;
  requestStatus: Status;
}) => {
  const { tenantRequests, userId, userView, requestStatus } = props;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [modalType, setModalType] = useState<string>("delete");

  const [tenantRequest, setTenantRequest] = useState<
    TenantRequestEntry | undefined
  >();

  const onActionModalOpen = async (request: TenantRequestEntry | undefined) => {
    setTenantRequest(request);
    onOpen();
  };

  const SentButtonGroups = (props: ButtonGroupProps) => {
    const { tenant } = props;
    return (
      <Tooltip hasArrow label="Delete Tenant Request">
        <IconButton
          size="md"
          variant="ghost"
          aria-label="Delete Listing"
          onClick={() => {
            onActionModalOpen(tenant);
            setModalType("delete");
          }}
          icon={<DeleteIcon />}
        />
      </Tooltip>
    );
  };

  const ReceivedButtonGroups = (props: ButtonGroupProps) => {
    const { tenant } = props;
    return (
      <ButtonGroup isAttached>
        <Tooltip hasArrow label="Accept Tenant">
          <IconButton
            variant="ghost"
            aria-label="Accept Tenant"
            onClick={() => {
              onActionModalOpen(tenant);
              setModalType("accept");
            }}
            icon={<CheckIcon />}
          />
        </Tooltip>

        <Tooltip hasArrow label="Reject Tenant">
          <IconButton
            variant="ghost"
            aria-label="Reject Tenant"
            onClick={() => {
              onActionModalOpen(tenant);
              setModalType("reject");
            }}
            icon={<NotAllowedIcon />}
          />
        </Tooltip>
      </ButtonGroup>
    );
  };

  const PendingButtonGroups = (props: ButtonGroupProps) => {
    const { tenant } = props;
    //add stripe front end logic here!
    return userView === "tenant" ? (
      <ButtonGroup>
        <ButtonPrimary padding={3}>Pay Deposit</ButtonPrimary>
        <Tooltip hasArrow label="Delete Tenant Request">
          <IconButton
            size="md"
            variant="ghost"
            aria-label="Delete Listing"
            onClick={() => {
              onActionModalOpen(tenant);
              setModalType("delete");
            }}
            icon={<DeleteIcon />}
          />
        </Tooltip>
      </ButtonGroup>
    ) : null;
  };

  const landlordButtonGroups = (tenant: TenantRequestEntry) => {
    switch (requestStatus) {
      case Status.Sent:
        return <ReceivedButtonGroups tenant={tenant} />;
      default:
        return null;
    }
  };

  const tenantButtonGroups = (tenant: TenantRequestEntry) => {
    switch (requestStatus) {
      case Status.Sent:
        return <SentButtonGroups tenant={tenant} />;
      case Status.Pending:
        return <PendingButtonGroups tenant={tenant} />;
      default:
        return null;
    }
  };

  return (
    <>
      <Table>
        <Thead>
          <Tr>
            <Th display={["none", "none", "none", "block", "block"]}>Photo</Th>
            <Th width={300}>Listing</Th>
            <Th>First name</Th>
            <Th>Last name</Th>
            <Th>Rent Price</Th>
            <Th>Deposit Price</Th>
            <Th>Sent Date</Th>
            <Th width={0} />
          </Tr>
        </Thead>
        <Tbody>
          {tenantRequests?.map((tenant, index) => {
            const listingTitle =
              tenant.listing.data.details.title.length > MAX_TITLE_LENGTH
                ? tenant.listing.data.details.title.substring(
                    0,
                    MAX_TITLE_LENGTH
                  ) + "..."
                : tenant.listing.data.details.title;

            return (
              <Tr key={index}>
                <Td display={["none", "none", "none", "block", "block"]}>
                  <PropertyImage
                    image={tenant.listing.data.images[0]}
                    size="150px"
                  />
                </Td>
                <Td>{listingTitle}</Td>
                <Td>{tenant.firstName}</Td>
                <Td>{tenant.lastName}</Td>
                <Td>{`$${tenant.listing.data.lease.price}`}</Td>
                <Td>{`$${tenant.listing.data.lease.depositPrice}`}</Td>
                <Td>{tenant.listing.initiatedAt.toDate().toDateString()}</Td>
                <Td>
                  <ButtonGroup spacing={2}>
                    <NextLink
                      href={listingHrefBuilder(tenant.listing.data.id, userId)}
                      as={listingRouteBuilder(tenant.listing.data.id)}
                      passHref
                    >
                      <Link _hover={{ textDecoration: "none" }}>
                        <ButtonSecondary padding={3}>
                          View Listing
                        </ButtonSecondary>
                      </Link>
                    </NextLink>
                    {userView === "tenant"
                      ? tenantButtonGroups(tenant)
                      : landlordButtonGroups(tenant)}
                  </ButtonGroup>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <ActionConfirmationModal
        isOpen={isOpen}
        onClose={onClose}
        request={tenantRequest}
        modalType={modalType}
      />
    </>
  );
};

export default RequestView;
