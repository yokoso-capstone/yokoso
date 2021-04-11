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
import { DashboardDisplay } from "@/src/enum";
import { auth } from "@/src/firebase";

interface SidebarProps {
  activeDashboardType: DashboardDisplay;
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

const Sidebar = (props: SidebarProps) => {
  const { activeDashboardType } = props;
  const sideButtons: {
    dashboardType: DashboardDisplay;
    label: string;
    icon: IconType;
    path: RoutePathDashboard;
  }[] = [
    {
      dashboardType: DashboardDisplay.Listings,
      label: "Listings",
      icon: BsFillHouseDoorFill,
      path: RoutePathDashboard.Listings,
    },
    {
      dashboardType: DashboardDisplay.Tenants,
      label: "Tenants",
      icon: BsFillPersonFill,
      path: RoutePathDashboard.Tenants,
    },
    {
      dashboardType: DashboardDisplay.Chat,
      label: "Chat",
      icon: BsFillChatDotsFill,
      path: RoutePathDashboard.Chat,
    },
  ];

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
          {sideButtons.map((sideButtonData) => (
            <NextLink
              key={sideButtonData.path}
              href={`${RoutePath.Dashboard}/${sideButtonData.path}`}
              passHref
            >
              <Link _hover={{ textDecoration: "none" }}>
                <SideBarButton
                  borderLeftColor={
                    activeDashboardType === sideButtonData.dashboardType
                      ? "brand.primary"
                      : "transparent"
                  }
                  background={
                    activeDashboardType === sideButtonData.dashboardType
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
