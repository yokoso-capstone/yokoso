import { FunctionComponent } from "react";
import { DashboardLabel, UserType } from "@/src/enum";
import StartView from "@/components/dashboard/StartView";
import ListingsView from "@/components/dashboard/ListingsView";
import TenantsView from "@/components/dashboard/TenantsView";
import ChatView from "@/components/dashboard/ChatView";
import CreateListingView from "@/components/dashboard/CreateListingView";
import RequestView from "@/components/dashboard/RequestView";
import RentalView from "@/components/dashboard/RentalView";

enum RoutePath {
  Home = "/",
  Search = "/search",
  Listings = "/listings",
  Dashboard = "/dashboard",
}

export enum RoutePathDashboard {
  Start = "_",
  Listings = "listings",
  Tenants = "tenants",
  Chat = "chat",
  Create = "create",
  Requests = "requests",
  Rentals = "rentals",
}

interface IPathData {
  label: DashboardLabel;
  content: FunctionComponent;
  exclusiveUserType?: UserType;
}

export const pathMapping = new Map<RoutePathDashboard | undefined, IPathData>([
  [
    RoutePathDashboard.Start,
    {
      label: DashboardLabel.Start,
      content: StartView,
    },
  ],
  [
    RoutePathDashboard.Listings,
    {
      label: DashboardLabel.Listings,
      content: ListingsView,
      exclusiveUserType: UserType.Landlord,
    },
  ],
  [
    RoutePathDashboard.Tenants,
    {
      label: DashboardLabel.Tenants,
      content: TenantsView,
      exclusiveUserType: UserType.Landlord,
    },
  ],
  [
    RoutePathDashboard.Requests,
    {
      label: DashboardLabel.Requests,
      content: RequestView,
    },
  ],
  [
    RoutePathDashboard.Create,
    {
      label: DashboardLabel.Create,
      content: CreateListingView,
      exclusiveUserType: UserType.Landlord,
    },
  ],
  [
    RoutePathDashboard.Rentals,
    {
      label: DashboardLabel.Rentals,
      content: RentalView,
      exclusiveUserType: UserType.Tenant,
    },
  ],
  [
    RoutePathDashboard.Chat,
    {
      label: DashboardLabel.Chat,
      content: ChatView,
    },
  ],
]);

export const pathList = Object.values(RoutePathDashboard);

export default RoutePath;
