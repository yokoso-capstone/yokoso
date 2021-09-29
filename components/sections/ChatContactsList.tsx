import { ReactElement } from "react";
import { DashboardCard } from "@/components/core/Layout";
import { TextBase, Body2 } from "@/components/core/Text";
import { IconButtonSecondary } from "@/components/core/Button";
import { Box, Flex, Grid, Image, Stack } from "@chakra-ui/react";
import { GoKebabVertical } from "react-icons/go";

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
      borderBottomWidth="1px"
      borderBottomStyle="solid"
      borderBottomColor="gray.200"
      _hover={{
        background: "gray.50",
      }}
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

function ChatContactsList(): ReactElement {
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
          <ContactPreview
            photoUrl="https://placekitten.com/300/300"
            name="Tommy Deng"
            message="message"
          />
          <ContactPreview
            photoUrl="https://placekitten.com/300/300"
            name="Personwith Longname ThatOverflows"
            message="message"
          />
          <ContactPreview
            photoUrl="https://placekitten.com/300/300"
            name="Tommy Deng"
            message="A long message that overflows"
          />
        </Flex>
      </Flex>
    </DashboardCard>
  );
}

export default ChatContactsList;
