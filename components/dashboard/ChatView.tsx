import { ReactElement } from "react";
import ChatContactsList from "@/components/sections/ChatContactsList";
import ChatMessagingArea from "@/components/sections/ChatMessagingArea";
import { Grid } from "@chakra-ui/react";

function ChatView(): ReactElement {
  return (
    <Grid
      templateColumns="320px 1fr"
      gap={4}
      height="calc(100vh - 78px - 2*64px)"
    >
      <ChatContactsList />
      <ChatMessagingArea />
    </Grid>
  );
}

export default ChatView;
