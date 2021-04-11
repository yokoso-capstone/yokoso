import React, { useEffect, useState, ReactElement } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { DashboardDisplay } from "@/src/enum";
import Sidebar from "@/components/sections/Sidebar";
import DashboardHeader from "@/components/sections/DashboardHeader";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import withAuth from "@/components/withAuth";
import RoutePath, { RoutePathDashboard } from "@/src/routes";

import ListingsView from "@/components/dashboard/ListingsView";
import TenantsView from "@/components/dashboard/TenantsView";
import ChatView from "@/components/dashboard/ChatView";

// TODO: clean up coupling between dashboard name and active tab/path
const pathToName: { [key in RoutePathDashboard]: DashboardDisplay } = {
  [RoutePathDashboard.Listings]: DashboardDisplay.Listings,
  [RoutePathDashboard.Tenants]: DashboardDisplay.Tenants,
  [RoutePathDashboard.Chat]: DashboardDisplay.Chat,
};

const dashboardNameToComponent: {
  [key in DashboardDisplay]: ReactElement;
} = {
  [DashboardDisplay.Listings]: <ListingsView />,
  [DashboardDisplay.Tenants]: <TenantsView />,
  [DashboardDisplay.Chat]: <ChatView />,
};

function DashboardPage(): ReactElement {
  const [dashboardType, setDashboardType] = useState(DashboardDisplay.Listings);
  const router = useRouter();
  const content = dashboardNameToComponent[dashboardType];

  useEffect(() => {
    const tab =
      typeof router.query.tab === "string" ? router.query.tab : undefined;

    if (tab) {
      const paths = Object.values(RoutePathDashboard);

      if (paths.includes(tab as RoutePathDashboard)) {
        setDashboardType(pathToName[tab as RoutePathDashboard]);
      } else if (paths.includes(tab.toLowerCase() as RoutePathDashboard)) {
        router.push(`${RoutePath.Dashboard}/${tab.toLowerCase()}`);
      } else {
        router.push(`${RoutePath.Dashboard}/${RoutePathDashboard.Listings}`);
      }
    }
  }, [router, router.query]);

  return (
    <>
      <Head>
        <title>Yōkoso</title>
        <meta name="description" content="ようこそ. Discover your new home." />
      </Head>

      <Grid
        minHeight="100vh"
        gridTemplateRows="78px 1fr"
        templateColumns={["1fr", "1fr", "1fr", " 1fr", "200px 1fr"]}
      >
        <GridItem
          rowSpan={[0, 0, 0, 3, 3]}
          display={["none", "none", "none", "none", "grid"]}
        >
          <Sidebar activeDashboardType={dashboardType} />
        </GridItem>

        <GridItem rowSpan="auto">
          <DashboardHeader title={dashboardType} />
        </GridItem>

        <GridItem rowSpan={3} height="100%" background="#F9FBFD" padding="4rem">
          <Box maxWidth="1640px" marginX="auto">
            {content}
          </Box>
        </GridItem>
      </Grid>
    </>
  );
}

export default withAuth(DashboardPage);
