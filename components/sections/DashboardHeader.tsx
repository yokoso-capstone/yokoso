import React, { ReactElement } from "react";
import { Box, Flex, Stack, IconButton, chakra, Image } from "@chakra-ui/react";
import { Heading4 } from "@/components/core/Text";
import NotificationBellSvg from "../svg/notification-bell.svg";

export const NotificationBell = chakra(NotificationBellSvg);

interface DashboardHeaderProps {
  title: string;
}

function DashboardHeader(props: DashboardHeaderProps): ReactElement {
  const { title } = props;

  return (
    <Box maxWidth="100%">
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding={["8px", "8px", "8px", "1rem", "1rem"]}
        bg="white"
        height="78px"
        position="sticky"
        boxShadow="md"
      >
        <Flex align="center" direction="row" display="block">
          <Heading4 marginLeft="36px">{title}</Heading4>
        </Flex>

        <Stack spacing={8} direction="row" display="block" marginRight="36px">
          <IconButton
            aria-label="Search database"
            width="40px"
            height="40px"
            isRound
            padding="7px"
            bg="none"
            icon={<NotificationBell />}
            _hover={{
              background: "gray.100",
            }}
            _active={{
              background: "gray.200",
            }}
          />

          <IconButton
            aria-label="Search database"
            width="44px"
            height="44px"
            isRound
            icon={
              <Image borderRadius="full" src="http://placekitten.com/300/300" />
            }
          />
        </Stack>
      </Flex>
    </Box>
  );
}

export default DashboardHeader;
