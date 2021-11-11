import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import addressBuilder from "./utils/addressBuilder";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoibWVnYW4taG5nIiwiYSI6ImNrbW50cmZ5NTB1cDYyb24zZHZocGl0dnUifQ.k0A3CyrtFjv-Gj7k7E9_9A";

const Geocoder = new MapboxGeocoder({
  accessToken: MAPBOX_TOKEN,
});

const urlAddressBuilder = (address: string) => {
  const urlAddress = address.split(" ").join("%20").split(",").join("%2C");

  return urlAddress;
};

const mapboxURLBuilder = (ADDRESS_SLUG: string, API_TOKEN: string) => {
  return `https://api.mapbox.com/geocoding/v5/mapbox.places/${ADDRESS_SLUG}.json?access_token=${API_TOKEN}`;
};

const getAddressInfo = async (url: string) => {
  const response = await fetch(url);
  return response.json();
};

const isAddressValid = (response: { features: any[] }) => {
  if (
    !response.features ||
    response.features == null ||
    response.features.length < 1
  ) {
    return false;
  }
  const { features } = response;
  const address = features[0];

  if (address.relevance < 0.95) {
    return false;
  }

  return true;
};

export const fetchCoordinates = async (values: {
  unitNum: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
}) => {
  const { unitNum, address, city, province, postalCode, country } = values;
  const fullAddress = addressBuilder(
    unitNum,
    address,
    city,
    province,
    postalCode,
    country
  );

  const urlAddress = urlAddressBuilder(fullAddress);

  const apiURL = mapboxURLBuilder(urlAddress, MAPBOX_TOKEN);
  const addressResponse = await getAddressInfo(apiURL);

  if (isAddressValid(addressResponse)) {
    const { features } = addressResponse;
    return features[0].center;
  }

  throw Error;
};

export default Geocoder;
