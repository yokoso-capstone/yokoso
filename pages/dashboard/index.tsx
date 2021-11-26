import { useEffect, ReactElement } from "react";
import { useRouter } from "next/router";
import withAuth from "@/components/withAuth";
import RoutePath, { RoutePathDashboard } from "@/src/routes";
import LoadingScreen from "@/components/LoadingScreen";

function DashboardIndex(): ReactElement {
  const router = useRouter();

  useEffect(() => {
    router.push(`${RoutePath.Dashboard}/${RoutePathDashboard.Start}`);
  }, [router]);

  return <LoadingScreen />;
}

export default withAuth(DashboardIndex);
