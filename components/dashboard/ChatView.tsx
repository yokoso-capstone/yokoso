import { ReactElement, useState } from "react";
import ChatContactsList from "@/components/sections/ChatContactsList";
import ChatMessagingArea from "@/components/sections/ChatMessagingArea";
import { Grid } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { chatRooms } from "@/src/api/collections";
import { UserPublic } from "@/src/api/types";
import { auth } from "@/src/firebase";

function ChatView(): ReactElement {
  const [user, ,] = useAuthState(auth);
  // Uses "~" as arbritrary default user uid in case it undefined values case issues
  const [chatRoomsCollection, ,] = useCollection(
    chatRooms.where("members", "array-contains", user?.uid || "~")
    // TODO: figure out why sorting wasn't working
    // .orderBy("createdAt", "desc")
  );
  const [currentChatRoomIdx, setCurrentChatRoomIdx] = useState<number>();
  const [currentContact, setCurrentContact] = useState<UserPublic>();

  return (
    <Grid
      templateColumns="320px 1fr"
      gap={4}
      height="calc(100vh - 78px - 2*64px)"
    >
      <ChatContactsList
        user={user}
        chatRoomsCollection={chatRoomsCollection}
        currentChatRoomIdx={currentChatRoomIdx}
        setCurrentChatRoomIdx={setCurrentChatRoomIdx}
        setCurrentContact={setCurrentContact}
      />
      <ChatMessagingArea
        user={user}
        chatRoomsCollection={chatRoomsCollection}
        currentChatRoomIdx={currentChatRoomIdx}
        currentContact={currentContact}
      />
    </Grid>
  );
}

export default ChatView;
