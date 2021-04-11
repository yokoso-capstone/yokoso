import React, { useEffect, useState, ReactElement } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { DashboardLabel } from "@/src/enum";
import Sidebar from "@/components/sections/Sidebar";
import DashboardHeader from "@/components/sections/DashboardHeader";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import withAuth from "@/components/withAuth";
import RoutePath, { RoutePathDashboard } from "@/src/routes";

import ListingsView from "@/components/dashboard/ListingsView";
import TenantsView from "@/components/dashboard/TenantsView";
import ChatView from "@/components/dashboard/ChatView";
import CreateListingView from "@/components/dashboard/CreateListingView";

const pathData: {
  [key in RoutePathDashboard]: {
    label: DashboardLabel;
    content: ReactElement;
  };
} = {
  [RoutePathDashboard.Listings]: {
    label: DashboardLabel.Listings,
    content: <ListingsView />,
  },
  [RoutePathDashboard.Tenants]: {
    label: DashboardLabel.Tenants,
    content: <TenantsView />,
  },
  [RoutePathDashboard.Chat]: {
    label: DashboardLabel.Chat,
    content: <ChatView />,
  },
  [RoutePathDashboard.Create]: {
    label: DashboardLabel.Create,
    content: <CreateListingView />,
  },
};

const pathList = Object.values(RoutePathDashboard);

function DashboardPage(): ReactElement {
  const [dashboardPath, setDashboardPath] = useState(
    RoutePathDashboard.Listings
  );
  const router = useRouter();
  const { content, label } = pathData[dashboardPath];

  useEffect(() => {
    const tab =
      typeof router.query.tab === "string" ? router.query.tab : undefined;

    if (tab) {
      if (pathList.includes(tab as RoutePathDashboard)) {
        setDashboardPath(tab as RoutePathDashboard);
      } else if (pathList.includes(tab.toLowerCase() as RoutePathDashboard)) {
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
          <Sidebar activeDashboardPath={dashboardPath} />
        </GridItem>

        <GridItem rowSpan="auto" position="sticky" top={0} zIndex={100}>
          <DashboardHeader title={label} />
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
