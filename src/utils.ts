import { ParsedUrlQuery } from "querystring";
import { Coordinate } from "@/src/types";

export function getUTCMonthString(date: Date) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const index = date.getUTCMonth();

  return months[index];
}

export function getQueryValue(query: ParsedUrlQuery, key: string) {
  const value = query[key];

  if (value && typeof value !== "string") {
    return value[0];
  }

  return value;
}

// TODO: do for real with geocoding API
export function cityToLatLong(city: string) {
  const cityMapping: { [city: string]: Coordinate | undefined } = {
    ottawa: {
      locationName: "Ottawa",
      latitude: 45.421532,
      longitude: -75.697189,
    },
    montreal: {
      locationName: "Montreal",
      latitude: 45.50169,
      longitude: -73.567253,
    },
    toronto: {
      locationName: "Toronto",
      latitude: 43.653225,
      longitude: -79.383186,
    },
    vancouver: {
      locationName: "Vancouver",
      latitude: 49.28273,
      longitude: -123.120735,
    },
  };

  return cityMapping[city] || ({ latitude: 0, longitude: 0 } as Coordinate);
}
