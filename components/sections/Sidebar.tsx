import React from "react";
import NextLink from "next/link";
import { chakra, Flex, Icon, Link } from "@chakra-ui/react";
import {
  BsFillHouseDoorFill,
  BsFillPersonFill,
  BsFillChatDotsFill,
} from "react-icons/bs";
import { IconType } from "react-icons/lib";
import { ButtonPrimary, SideBarButton } from "@/components/core/Button";
import { LogoWhite } from "@/components/core/Branding";
import RoutePath, { RoutePathDashboard } from "@/src/routes";
import { auth } from "@/src/firebase";
import { DashboardLabel } from "@/src/enum";

interface SidebarProps {
  activeDashboardPath: RoutePathDashboard;
}

const LogOutButton = chakra(ButtonPrimary, {
  baseStyle: {
    bg: "transparent",
    marginBottom: "32px",
    fontWeight: "bold",
    width: "80%",
    _hover: { background: "common.dark" },
    _active: { background: "transparent" },
  },
});

const sideButtonData: {
  label: DashboardLabel;
  icon: IconType;
  path: RoutePathDashboard;
}[] = [
  {
    label: DashboardLabel.Listings,
    icon: BsFillHouseDoorFill,
    path: RoutePathDashboard.Listings,
  },
  {
    label: DashboardLabel.Tenants,
    icon: BsFillPersonFill,
    path: RoutePathDashboard.Tenants,
  },
  {
    label: DashboardLabel.Requests,
    icon: BsFillPersonFill,
    path: RoutePathDashboard.Requests,
  },
  {
    label: DashboardLabel.Chat,
    icon: BsFillChatDotsFill,
    path: RoutePathDashboard.Chat,
  },
];

const Sidebar = (props: SidebarProps) => {
  const { activeDashboardPath } = props;

  return (
    <Flex
      as="nav"
      paddingTop="32px"
      bg="black"
      color="white"
      width="200px"
      height="100%"
      direction="column"
      position="fixed"
    >
      <Flex justify="center" marginBottom="32px">
        <NextLink href={RoutePath.Home} passHref>
          <Link>
            <LogoWhite width="100px" background="black" />
          </Link>
        </NextLink>
      </Flex>

      <Flex
        direction="column"
        height="100%"
        justify="space-between"
        align="center"
      >
        <Flex direction="column" width="100%">
          {sideButtonData.map((sideButtonData) => (
            <NextLink
              key={sideButtonData.path}
              href={`${RoutePath.Dashboard}/${sideButtonData.path}`}
              passHref
            >
              <Link _hover={{ textDecoration: "none" }}>
                <SideBarButton
                  borderLeftColor={
                    activeDashboardPath === sideButtonData.path
                      ? "brand.primary"
                      : "transparent"
                  }
                  background={
                    activeDashboardPath === sideButtonData.path
                      ? "common.dark"
                      : "transparent"
                  }
                  leftIcon={
                    <Icon
                      as={sideButtonData.icon}
                      width={4}
                      height={4}
                      marginRight="6px"
                    />
                  }
                >
                  {sideButtonData.label}
                </SideBarButton>
              </Link>
            </NextLink>
          ))}
        </Flex>
        <LogOutButton borderColor="white" onClick={() => auth.signOut()}>
          Log out
        </LogOutButton>
      </Flex>
    </Flex>
  );
};

export default Sidebar;
