import React from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { Flex, Icon, Link, Stack, Switch, chakra } from "@chakra-ui/react";
import {
  BsFillHouseDoorFill,
  BsFillPersonFill,
  BsFillChatDotsFill,
} from "react-icons/bs";
import { IconType } from "react-icons/lib";
import { ButtonPrimary, SideBarButton } from "@/components/core/Button";
import { LogoWhite } from "@/components/core/Branding";
import { Body2 } from "@/components/core/Text";
import RoutePath, { RoutePathDashboard, pathMapping } from "@/src/routes";
import { auth } from "@/src/firebase";
import { DashboardLabel, UserType } from "@/src/enum";
import { useStore } from "@/src/store";

interface SidebarProps {
  activeDashboardPath?: RoutePathDashboard;
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

interface ISideButton {
  label: DashboardLabel;
  icon: IconType;
  path: RoutePathDashboard;
}

const tenantSideButtonData: ISideButton[] = [
  {
    label: DashboardLabel.Rentals,
    icon: BsFillHouseDoorFill,
    path: RoutePathDashboard.Rentals,
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

const landlordSideButtonData: ISideButton[] = [
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

const sideButtonMapping = new Map<UserType | undefined, ISideButton[]>([
  [UserType.Tenant, tenantSideButtonData],
  [UserType.Landlord, landlordSideButtonData],
]);

const Sidebar = (props: SidebarProps) => {
  const { activeDashboardPath } = props;
  const userTypeStore = useStore((state) => state.userType);
  const toggleUserTypeStore = useStore((state) => state.toggleUserType);
  const router = useRouter();

  const isLandlord = userTypeStore === UserType.Landlord;
  const sideButtonData = sideButtonMapping.get(userTypeStore) ?? [];
  const showSideContent =
    activeDashboardPath && activeDashboardPath !== RoutePathDashboard.Start;
  const tab =
    typeof router.query.tab === "string" ? router.query.tab : undefined;

  const handleSwitchButton = () => {
    const pathData = pathMapping.get(tab as RoutePathDashboard);

    if (!userTypeStore || !pathData) {
      return;
    }

    // Stay on same tab if tab exists for both tenants and landlords
    // Otherwise, switch to a predetermined tab from the other user type
    if (!pathData.exclusiveUserType) {
      toggleUserTypeStore();
    } else {
      const nextTab =
        userTypeStore === UserType.Tenant
          ? RoutePathDashboard.Listings
          : RoutePathDashboard.Rentals;

      router.push(`${RoutePath.Dashboard}/${nextTab}`);
    }
  };

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
        <Flex direction="column" width="100%" grow={1}>
          {showSideContent &&
            sideButtonData.map((sideButtonData) => (
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
        {showSideContent && (
          <Stack mb={12} mt={8} align="center">
            <Body2 color="white">
              {isLandlord ? "Disable" : "Enable"} landlord view
            </Body2>
            <Switch
              colorScheme="red"
              isDisabled={!userTypeStore}
              isChecked={isLandlord}
              onChange={handleSwitchButton}
            />
          </Stack>
        )}
        <LogOutButton borderColor="white" onClick={() => auth.signOut()}>
          Log out
        </LogOutButton>
      </Flex>
    </Flex>
  );
};

export default Sidebar;
