import React, { useEffect, useState, ReactElement } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { UserType } from "@/src/enum";
import Sidebar from "@/components/sections/Sidebar";
import DashboardHeader from "@/components/sections/DashboardHeader";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import withAuth from "@/components/withAuth";
import RoutePath, {
  RoutePathDashboard,
  pathList,
  pathMapping,
} from "@/src/routes";
import { useStore } from "@/src/store";

function DashboardPage(): ReactElement {
  const [dashboardPath, setDashboardPath] = useState<RoutePathDashboard>();
  const router = useRouter();
  const userTypeStore = useStore((state) => state.userType);
  const setUserTypeStore = useStore((state) => state.setUserType);

  const pathData = pathMapping.get(dashboardPath);
  const Content = pathData?.content;
  const label = pathData?.label;
  const exclusiveUserType = pathData?.exclusiveUserType;

  const tab =
    typeof router.query.tab === "string" ? router.query.tab : undefined;
  const tabLowercase = tab?.toLowerCase();

  useEffect(() => {
    if (tab) {
      if (pathList.includes(tab as RoutePathDashboard)) {
        setDashboardPath(tab as RoutePathDashboard);
      } else if (pathList.includes(tabLowercase as RoutePathDashboard)) {
        router.push(`${RoutePath.Dashboard}/${tabLowercase}`);
      } else {
        router.push(`${RoutePath.Dashboard}/${RoutePathDashboard.Start}`);
      }
    }
  }, [router, router.query, tab, tabLowercase]);

  useEffect(() => {
    if (dashboardPath && dashboardPath !== RoutePathDashboard.Start) {
      // Defaults to Tenant user type when in ambiguous sidebar tab
      setUserTypeStore(exclusiveUserType ?? userTypeStore ?? UserType.Tenant);
    }
  }, [
    dashboardPath,
    userTypeStore,
    setUserTypeStore,
    tab,
    tabLowercase,
    exclusiveUserType,
  ]);

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
            {Content && <Content />}
          </Box>
        </GridItem>
      </Grid>
    </>
  );
}

export default withAuth(DashboardPage);
