import RoutePath from "../routes";

export const listingRouteBuilder = (listing?: string) =>
  `${RoutePath.Listings}/${listing}`;

export const listingHrefBuilder = (listing?: string, userUID?: string) => ({
  pathname: listingRouteBuilder(listing),
  query: { user: userUID },
})