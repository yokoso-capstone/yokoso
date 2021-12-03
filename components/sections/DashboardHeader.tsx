import React, { ReactElement, useEffect, useMemo, useState } from "react";
import { Box, Flex, Stack, IconButton, chakra, Image } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../src/firebase";
import { usersPublic } from "../../src/api/collections";
import { UserPublic } from "../../src/api/types";
import { Heading4 } from "../core/Text";
import NotificationBellSvg from "../svg/notification-bell.svg";

export const NotificationBell = chakra(NotificationBellSvg);

interface DashboardHeaderProps {
  title?: string;
}

function DashboardHeader(props: DashboardHeaderProps): ReactElement {
  const { title } = props;

  const [user] = useAuthState(auth);
  const query = useMemo(() => (user ? usersPublic.doc(user.uid) : undefined), [
    user,
  ]);
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    const getPhotoUrl = async () => {
      if (query) {
        const userPublicDoc = await query.get();

        // Checks if public user data is set to avoid error if account skips it
        if (userPublicDoc.exists) {
          const userPublicData = userPublicDoc.data() as UserPublic;
          setPhotoUrl(userPublicData.profilePicture);
        }
      }
    };

    getPhotoUrl();
  }, [query]);

  return (
    <Box
      bg="white"
      height="78px"
      position="sticky"
      boxShadow="md"
      paddingX="4rem"
      paddingY="1rem"
    >
      <Flex
        as="nav"
        maxWidth="1640px"
        marginX="auto"
        align="center"
        justify="space-between"
      >
        <Heading4>{title}</Heading4>

        <Stack spacing={8} direction="row" align="center">
          <IconButton
            aria-label="Notifications"
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
            aria-label="Profile"
            width="44px"
            height="44px"
            isRound
            icon={<Image borderRadius="full" src={photoUrl} />}
          />
        </Stack>
      </Flex>
    </Box>
  );
}

export default DashboardHeader;
