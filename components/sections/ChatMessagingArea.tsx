import { ReactElement } from "react";
import {
  IconButtonPrimary,
  IconButtonSecondary,
} from "@/components/core/Button";
import { DashboardCard } from "@/components/core/Layout";
import { Body2 } from "@/components/core/Text";
import { Box, Grid, Flex, Image, Stack, Textarea } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { GoKebabVertical } from "react-icons/go";

const Header = (props: {
  photoUrl: string;
  name: string;
  description: string;
}) => {
  const { photoUrl, name, description } = props;
  return (
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
        <Image src={photoUrl} borderRadius="full" />
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
          {description}
        </Body2>
      </Flex>
      <IconButtonSecondary
        aria-label="More"
        border="none"
        fontSize="24px"
        icon={<GoKebabVertical />}
        background="transparent"
      />
    </Grid>
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

const Body = () => (
  <Stack
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
      Beginning of conversation
    </Body2>
    <DarkChatMessage message="hi" />
    <LightChatMessage message="hello!" />
    <DarkChatMessage message="this is me testing some longer text that makes this message reach the maximum width, so that it wraps onto new lines" />
    <DarkChatMessage message="another message from the same person" />
    <LightChatMessage message="i want to have enough messages here to show what the scrolling looks like" />
    <DarkChatMessage message="ok" />
    <LightChatMessage message=":)" />
    <DarkChatMessage message=":D" />
    <LightChatMessage message=":))" />
    <DarkChatMessage message=":DD" />
    <LightChatMessage message="yayy" />
    <DarkChatMessage message="something i should work on is making this scrolled to be bottom by after initial message loading" />
  </Stack>
);

const Footer = () => (
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
      <Textarea
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
    />
  </Grid>
);

function ChatMessagingArea(): ReactElement {
  return (
    <DashboardCard padding={0} overflow="hidden" position="relative">
      <Header
        photoUrl="https://placekitten.com/300/300"
        name="Tommy Deng"
        description="Interested in renting 1234 Sesame St. - “Beautiful apartment with great view”"
      />
      <Body />
      <Footer />
    </DashboardCard>
  );
}

export default ChatMessagingArea;
