import {
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { DashboardCard } from "@/components/core/Layout";
import { TextBase, Body2 } from "@/components/core/Text";
import { IconButtonSecondary } from "@/components/core/Button";
import { Box, Flex, Grid, Image, Stack } from "@chakra-ui/react";
import { GoKebabVertical } from "react-icons/go";
import firebase from "firebase/app";
import { ChatRoom, UserPublic } from "@/src/api/types";
import { usersPublic } from "@/src/api/collections";

const Header = () => (
  <Flex
    height="80px"
    padding="1rem 2rem"
    alignItems="center"
    shadow="md"
    zIndex={1}
  >
    <TextBase fontSize="18px" fontWeight="bold">
      Contacts
    </TextBase>
  </Flex>
);

const ContactPreview = (props: {
  photoUrl: string;
  name: string;
  message: string;
}) => {
  const { photoUrl, name, message } = props;

  return (
    <Grid
      templateColumns="min-content 1fr min-content"
      alignItems="center"
      padding="1rem 2rem"
      gap="1rem"
    >
      <Box width="40px">
        <Image src={photoUrl} borderRadius="full" />
      </Box>
      <Stack spacing={0}>
        <Body2
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
          {message}
        </Body2>
      </Stack>
      <IconButtonSecondary
        aria-label="More"
        fontSize="16px"
        border="none"
        size="sm"
        background="transparent"
        icon={<GoKebabVertical />}
      />
    </Grid>
  );
};

function ChatContactsList(props: {
  user?: firebase.User | null;
  chatRoomsCollection?: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>;
  currentChatRoomIdx: number | undefined;
  setCurrentChatRoomIdx: Dispatch<SetStateAction<number | undefined>>;
  setCurrentContact: Dispatch<SetStateAction<UserPublic | undefined>>;
}): ReactElement {
  const {
    user,
    chatRoomsCollection,
    currentChatRoomIdx,
    setCurrentChatRoomIdx,
    setCurrentContact,
  } = props;
  const [contactPreviewData, setContactPreviewData] = useState<UserPublic[]>(
    []
  );

  const handleContactClick = (idx: number) => {
    setCurrentChatRoomIdx(idx);
    setCurrentContact(contactPreviewData[idx]);
  };

  useEffect(() => {
    if (chatRoomsCollection?.size) {
      setCurrentChatRoomIdx(0);
      setCurrentContact(contactPreviewData[0]);
    }
  }, [
    chatRoomsCollection,
    setCurrentChatRoomIdx,
    setCurrentContact,
    contactPreviewData,
  ]);

  useEffect(() => {
    if (user && chatRoomsCollection) {
      const chatRoomsData = chatRoomsCollection.docs.map(
        (doc) => doc.data() as ChatRoom
      );

      const contactUidList: string[] = chatRoomsData
        .map((data) => data.members)
        .flat()
        .filter((member) => member !== user.uid);

      const loadContactPreviewData = async () => {
        const contactListSnapshot = await Promise.all(
          contactUidList.map((uid) => usersPublic.doc(uid).get())
        );
        const contactListData = contactListSnapshot.map(
          (userData) => ({ ...userData.data(), uid: userData.id } as UserPublic)
        );

        setContactPreviewData(contactListData);
      };

      loadContactPreviewData();
    }
  }, [user, chatRoomsCollection]);

  return (
    <DashboardCard padding={0} overflow="hidden" position="relative">
      <Flex direction="column" height="100%">
        <Header />
        <Flex
          direction="column"
          height="calc(100% - 80px)"
          overflowY="auto"
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
          {contactPreviewData.map((contact, idx) => (
            <Box
              key={contact.uid}
              onClick={() => handleContactClick(idx)}
              borderBottomWidth="1px"
              borderBottomStyle="solid"
              borderBottomColor="gray.200"
              borderLeftWidth="4px"
              borderLeftStyle="solid"
              borderLeftColor={
                idx === currentChatRoomIdx ? "brand.primary" : "transparent"
              }
              cursor="pointer"
              _hover={{
                background: "gray.50",
              }}
            >
              <ContactPreview
                photoUrl={contact.profilePicture}
                name={`${contact.firstName} ${contact.lastName}`}
                message=""
              />
            </Box>
          ))}
        </Flex>
      </Flex>
    </DashboardCard>
  );
}

export default ChatContactsList;
