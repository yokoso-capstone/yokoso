import { useState, ChangeEvent, ReactElement, useEffect } from "react";
import { useRouter } from "next/router";
import RoutePath, { RoutePathDashboard } from "@/src/routes";
import { ButtonPrimary, ButtonSecondary } from "@/components/core/Button";
import { Card } from "@/components/core/Layout";
import { Body1, Heading4, Heading5, TextBase } from "@/components/core/Text";
import {
  Box,
  Divider,
  HStack,
  Icon,
  Image,
  SkeletonCircle,
  Stack,
  Textarea,
  Tooltip,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import { getUTCMonthString } from "@/src/utils";
import { CollectionName, chatRooms } from "@/src/api/collections";
import { ChatRoom, Listing, Message } from "@/src/api/types";
import { serverTimestamp } from "@/src/firebase";
import { checkRequestStatus } from "@/src/utils/tenantRequest";
import TenantRequestModal from "./TenantRequestModal";

interface ListingCardProps {
  price: number;
  firstName: string;
  lastName: string;
  profilePicture: string;
  joined: number;
  disabled: boolean;
  userUid: string;
  ownerUid: string;
  availableDate: string;
  listing: Listing;
}

function ListingCard(props: ListingCardProps): ReactElement {
  const {
    price,
    firstName,
    lastName,
    profilePicture,
    joined,
    disabled,
    userUid,
    availableDate,
    ownerUid,
    listing,
  } = props;
  const joinedDate = new Date(joined);
  const [chatValue, setChatValue] = useState("");
  const [requestDisabled, setRequestDisabled] = useState(false);
  const [chatLoading, setChatLoading] = useState(false);
  const [requestLoading, setRequestLoading] = useState(false);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const router = useRouter();
  const toast = useToast();
  const placeholderText = `Hi ${firstName}, I am interested in your listing. Is it still available? When would be a good time to view it?`;
  const isSameUser = userUid === ownerUid;
  let disabledErrorMsg = "";
  let disabledRequestErrorMsg = "";

  if (disabled) {
    disabledErrorMsg = "Create an account or log in to get started";
    disabledRequestErrorMsg = "Create an account or log in to get started";
  } else if (listing.status === "rented") {
    disabledErrorMsg = "This listing has already been rented";
    disabledRequestErrorMsg = "This listing has already been rented";
  } else if (isSameUser) {
    disabledErrorMsg = "Can't send a message to yourself";
    disabledRequestErrorMsg = "Can't send a tenant request to yourself";
  } else {
    disabledErrorMsg = "Enter a message to send";
    disabledRequestErrorMsg = "Tenant request has already been sent";
  }

  const handleFocus = () => {
    if (!chatValue) {
      setChatValue(placeholderText);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target?.value;
    setChatValue(inputValue);
  };

  const handleSend = async () => {
    setChatLoading(true);

    const members = [userUid, ownerUid].sort();
    const chatId = members.join("-");

    try {
      const chatRoomRef = chatRooms.doc(chatId);
      const chatRoomDoc = await chatRoomRef.get();

      // Listing data + metadata that may be set if it's not already recorded as associated with the chat room
      const currentListingData = {
        [listing.id || ""]: {
          initiatedAt: serverTimestamp,
          data: listing,
        },
      };

      if (chatRoomDoc.exists) {
        const chatRoomData = chatRoomDoc.data() as ChatRoom;
        // Merge current and existing listings with existing ones taking priority during conflict
        const listings = { ...currentListingData, ...chatRoomData.listings };

        await chatRoomRef.update({ listings });
      } else {
        const chatRoomData: ChatRoom = {
          members,
          initiatedBy: userUid,
          listings: currentListingData,
          createdAt: serverTimestamp,
        };
        await chatRoomRef.set(chatRoomData);
      }

      const messagesRef = chatRoomRef.collection(CollectionName.Messages);

      const messageData: Message = {
        uid: userUid,
        members,
        text: chatValue,
        createdAt: serverTimestamp,
      };
      await messagesRef.add(messageData);
      router.push(`${RoutePath.Dashboard}/${RoutePathDashboard.Chat}`);
    } catch (err) {
      toast({
        title: "Something went wrong",
        description: "An error occurred. Please try again later.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setChatLoading(false);
    }
  };

  const onTenantRequestSuccess = () => {
    toast({
      title: "Tenant Request Sent!",
      description: `Tenant request was sent for listing, "${listing.details.title}"`,
      status: "success",
      duration: 4000,
      isClosable: true,
    });
  };

  const onTenantRequestError = () => {
    toast({
      title: "Something went wrong",
      description:
        "An error occurred and the listing request couldn't be sent. Please try again later.",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
  };

  const handleCheckRequestStatusError = () => {
    toast({
      title: "Something went wrong",
      description:
        "An error occurred and couldn't fetch requests. Please try again later.",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
  };

  useEffect(() => {
    checkRequestStatus(
      listing,
      userUid,
      ownerUid,
      setRequestDisabled,
      handleCheckRequestStatusError
    );
  }, [listing, userUid, ownerUid, requestLoading]);

  return (
    <>
      <Card
        width="100%"
        padding={["3rem 2rem", "5rem 3rem", "5rem 4rem", "4rem 3rem"]}
      >
        <Stack spacing="24px">
          <HStack align="baseline">
            <Heading4>${price.toLocaleString("en")} </Heading4>{" "}
            <TextBase fontSize="20px">/month</TextBase>
          </HStack>
          <Divider />
          <HStack spacing="24px">
            <Image
              src={profilePicture}
              rounded="full"
              boxSize="48px"
              objectFit="cover"
              fallback={<SkeletonCircle size="48px" />}
            />
            <Stack spacing="4px">
              <HStack>
                <Body1>
                  {firstName} {lastName}
                </Body1>
                <Icon
                  as={FaCheckCircle}
                  color="text.primary"
                  width="16px"
                  height="16px"
                />
              </HStack>
              <Body1 color="text.variant">
                Joined {getUTCMonthString(joinedDate)}{" "}
                {joinedDate.getUTCFullYear()}
              </Body1>
            </Stack>
          </HStack>
          <Divider />
          <Stack spacing="16px">
            <Heading5>Contact</Heading5>
            <Textarea
              disabled={disabled || isSameUser}
              placeholder={placeholderText}
              size="sm"
              borderRadius="4px"
              padding="16px"
              lineHeight="1.5"
              height="100px"
              value={chatValue}
              onChange={handleInputChange}
              onFocus={handleFocus}
            />
            <Tooltip
              isDisabled={Boolean(chatValue)}
              hasArrow
              label={disabledErrorMsg}
            >
              <Box>
                <ButtonPrimary
                  isDisabled={!chatValue}
                  isFullWidth
                  onClick={handleSend}
                  isLoading={chatLoading}
                >
                  Send
                </ButtonPrimary>
              </Box>
            </Tooltip>

            <Tooltip
              isDisabled={!requestDisabled}
              hasArrow
              label={disabledRequestErrorMsg}
            >
              <Box>
                <ButtonSecondary
                  isDisabled={requestDisabled}
                  isFullWidth
                  onClick={onOpen}
                  isLoading={requestLoading}
                >
                  Send Tenant Request
                </ButtonSecondary>
              </Box>
            </Tooltip>
          </Stack>
        </Stack>
      </Card>
      <TenantRequestModal
        isOpen={isOpen}
        onClose={onClose}
        listing={listing}
        availableDate={availableDate}
        userUid={userUid}
        onSuccess={onTenantRequestSuccess}
        onError={onTenantRequestError}
        setLoading={setRequestLoading}
        isLoading={requestLoading}
        requestTooltip={disabledRequestErrorMsg}
      />
    </>
  );
}

export default ListingCard;
