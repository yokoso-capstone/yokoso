import { ChangeEvent, ReactElement, useEffect, useRef, useState } from "react";
import NextLink from "next/link";
import { ButtonPrimary, ButtonSecondary } from "@/components/core/Button";
import {
  IconButtonPrimary,
  IconButtonSecondary,
} from "@/components/core/IconButton";
import { DashboardCard } from "@/components/core/Layout";
import { Body2 } from "@/components/core/Text";
import {
  Box,
  Grid,
  Flex,
  Image,
  Input,
  Link,
  Modal,
  Tooltip,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { GoKebabVertical } from "react-icons/go";
import firebase from "firebase/app";
import { ChatRoom, Listing, Message, UserPublic } from "@/src/api/types";
import { CollectionName, chatRooms } from "@/src/api/collections";
import { serverTimestamp } from "@/src/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { listingRouteBuilder } from "@/src/utils/listingRoute";
import { checkRequestStatus } from "@/src/utils/tenantRequest";

const Header = (props: {
  photoUrl?: string;
  name: string;
  listing?: Listing;
  user?: firebase.User | null;
}) => {
  const { photoUrl, name, listing, user } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [requestDisabled, setRequestDisabled] = useState(false);
  const [isLandlord, setIsLandlord] = useState(false);

  let disabledRequestErrorMsg = "";

  if (isLandlord) {
    disabledRequestErrorMsg = "Can't send a tenant request to yourself";
  } else {
    disabledRequestErrorMsg = "Tenant request has already been sent";
  }

  const handleModalOpen = () => {
    if (listing && user) {
      checkRequestStatus(
        listing,
        user.uid,
        listing.owner.uid,
        setRequestDisabled
      );

      setIsLandlord(listing?.owner.uid === user.uid);
    }
    onOpen();
  };

  return (
    <>
      <Grid
        templateColumns="min-content 1fr min-content"
        alignItems="center"
        padding="1rem 2rem"
        shadow="md"
        position="absolute"
        top={0}
        width="100%"
        background="white"
        borderBottomWidth="1px"
        borderBottomStyle="solid"
        borderBottomColor="gray.200"
        gap={4}
        zIndex={1}
      >
        <Box width="48px">
          <Image
            src={photoUrl}
            fallback={
              <Box bg="gray.100" width="48px" height="48px" rounded="full" />
            }
            borderRadius="full"
          />
        </Box>
        <Flex flexDirection="column">
          <Body2
            fontWeight="bold"
            display="-webkit-box"
            style={{ WebkitLineClamp: 1, WebkitBoxOrient: "vertical" }}
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {name}
          </Body2>
          <Body2
            color="text.variant"
            display="-webkit-box"
            style={{ WebkitLineClamp: 1, WebkitBoxOrient: "vertical" }}
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {listing
              ? `Interested in your "${listing.details.title} listing" at ${
                  listing.location.unitNumber
                    ? `${listing.location.unitNumber} `
                    : ""
                }${listing.location.address}, ${listing.location.cityName}, ${
                  listing.location.province
                }`
              : ""}
          </Body2>
        </Flex>
        <IconButtonSecondary
          aria-label="More"
          border="none"
          fontSize="24px"
          icon={<GoKebabVertical />}
          background="transparent"
          onClick={handleModalOpen}
        />
      </Grid>

      <Modal isOpen={isOpen} onClose={onClose} size="xs" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Actions</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              {/* TODO: handle error situation of no listing or ID (shouldn't happen?) */}
              <Tooltip label="test">
                <NextLink href={listingRouteBuilder(listing?.id)} passHref>
                  <Link>
                    <ButtonSecondary isFullWidth>View listing</ButtonSecondary>
                  </Link>
                </NextLink>
              </Tooltip>
              <Tooltip
                isDisabled={!requestDisabled}
                hasArrow
                label={disabledRequestErrorMsg}
              >
                <Box>
                  <ButtonSecondary isFullWidth isDisabled={requestDisabled}>
                    Send Tenant Request
                  </ButtonSecondary>
                </Box>
              </Tooltip>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <ButtonPrimary onClick={onClose} isFullWidth>
              Close
            </ButtonPrimary>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const DarkChatMessage = (props: { message: string }) => {
  const { message } = props;

  return (
    <Flex role="row" justifyContent="flex-end">
      <Box
        bg="common.dark"
        maxWidth="min(6in, 80%)"
        padding="12px"
        borderRadius="8px"
      >
        <Body2 color="white">{message}</Body2>
      </Box>
    </Flex>
  );
};

const LightChatMessage = (props: { message: string }) => {
  const { message } = props;

  return (
    <Flex role="row" justifyContent="flex-start">
      <Box
        bg="gray.100"
        maxWidth="min(6in, 80%)"
        padding="12px"
        borderRadius="8px"
      >
        <Body2 color="text.primary">{message}</Body2>
      </Box>
    </Flex>
  );
};

const Body = (props: { user?: firebase.User | null; messages: Message[] }) => {
  const { user, messages } = props;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elem = ref.current;

    if (elem) {
      elem.scrollTop = elem.scrollHeight;
    }
  }, [ref, messages]);

  return (
    <Stack
      ref={ref}
      overflowY="auto"
      paddingX="2rem"
      paddingY="1rem"
      marginTop="80px"
      marginBottom="73px"
      height="calc(100% - 80px - 73px)"
      style={{ scrollbarColor: "#ccc transparent" }}
      sx={{
        "::-webkit-scrollbar": { width: "8px" },
        "::-webkit-scrollbar-thumb": {
          backgroundColor: "#ccc",
          borderRadius: "8px",
        },
        "::-webkit-scrollbar-track": { backgroundColor: "transparent" },
      }}
    >
      <Body2 textAlign="center" color="text.variant">
        {messages.length ? "Beginning of conversation" : ""}
      </Body2>
      {messages.map((message) =>
        message.uid === user?.uid ? (
          <DarkChatMessage key={message.id} message={message.text} />
        ) : (
          <LightChatMessage key={message.id} message={message.text} />
        )
      )}
    </Stack>
  );
};

const Footer = (props: {
  user?: firebase.User | null;
  messagesCollection?: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>;
  currentContact?: UserPublic;
}) => {
  const { user, messagesCollection, currentContact } = props;

  const [messageValue, setMessageValue] = useState("");
  const [isLoading, setLoading] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setMessageValue(inputValue);
  };

  const handleSend = async () => {
    if (!messageValue) {
      return;
    }

    setLoading(true);

    try {
      if (user && currentContact?.uid !== undefined && messagesCollection) {
        const messageData: Message = {
          uid: user.uid,
          members: [user.uid, currentContact.uid],
          text: messageValue,
          createdAt: serverTimestamp,
        };

        await messagesCollection.add(messageData);
        setMessageValue("");
      }
    } catch (err) {
      // TODO: handle error
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: { key: string }) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <Grid
      templateColumns="1fr min-content"
      gap={2}
      position="absolute"
      width="100%"
      bottom={0}
      background="white"
      paddingX="2rem"
      paddingY="1rem"
      borderTopWidth="1px"
      borderTopStyle="solid"
      borderTopColor="gray.200"
    >
      <Box height="40px">
        <Input
          disabled={currentContact === undefined}
          value={messageValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          resize="none"
          fontSize="14px"
          rows={1}
          height="100%"
        />
      </Box>
      <IconButtonPrimary
        aria-label="Send"
        icon={<ArrowForwardIcon w={5} h={5} />}
        isLoading={isLoading}
        onClick={handleSend}
      />
    </Grid>
  );
};

function ChatMessagingArea(props: {
  user?: firebase.User | null;
  chatRoomsCollection?: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>;
  currentChatRoomIdx?: number;
  currentContact?: UserPublic;
}): ReactElement {
  const {
    user,
    chatRoomsCollection,
    currentChatRoomIdx,
    currentContact,
  } = props;
  const [messageCollection, setMessageCollection] = useState<
    firebase.firestore.CollectionReference<firebase.firestore.DocumentData>
  >();
  const [messagesQuery, setMessagesQuery] = useState<
    firebase.firestore.Query<firebase.firestore.DocumentData>
  >();
  const [messageValues, ,] = useCollection(messagesQuery);
  const messages: Message[] = [];

  const currentRoomCollection = chatRoomsCollection?.docs[
    currentChatRoomIdx || 0
  ]?.data() as ChatRoom | undefined;
  // Take most recent associated listing
  const associatedListing =
    currentRoomCollection &&
    Object.values(currentRoomCollection.listings)
      .sort(
        (a, b) =>
          (a.initiatedAt as firebase.firestore.Timestamp).toMillis() -
          (b.initiatedAt as firebase.firestore.Timestamp).toMillis()
      )
      .map((listing) => listing.data)
      .pop();

  if (messageValues) {
    messageValues.docs.forEach((messageDoc) =>
      messages.push({ ...messageDoc.data(), id: messageDoc.id } as Message)
    );
  }

  useEffect(() => {
    if (user && chatRoomsCollection && currentChatRoomIdx !== undefined) {
      const chatRoomIds = chatRoomsCollection.docs.map((doc) => doc.id);
      const currentChatRoomId = chatRoomIds[currentChatRoomIdx];

      const messagesRef = chatRooms
        .doc(currentChatRoomId)
        .collection(CollectionName.Messages);

      const query = messagesRef.orderBy("createdAt", "asc");

      setMessageCollection(messagesRef);
      setMessagesQuery(query);
    }
  }, [user, chatRoomsCollection, currentChatRoomIdx]);

  return (
    <DashboardCard padding={0} overflow="hidden" position="relative">
      <Header
        photoUrl={currentContact?.profilePicture}
        user={user}
        name={
          currentContact
            ? `${currentContact.firstName} ${currentContact.lastName}`
            : ""
        }
        listing={associatedListing}
      />
      <Body user={user} messages={messages} />
      <Footer
        user={user}
        messagesCollection={messageCollection}
        currentContact={currentContact}
      />
    </DashboardCard>
  );
}

export default ChatMessagingArea;
