import { useState } from "react";
import { chakra, Box, IconButton } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { XsSearchResult } from "@/components/SearchResult";
import LocationPinSvg from "../svg/location-pin.svg";
import { ListingType } from "../../src/types";

interface MapProps {
  defaultLat: number;
  defaultLong: number;
  listings?: ListingType[];
}

const MAPBOX_TOKEN =
  "pk.eyJ1IjoibWVnYW4taG5nIiwiYSI6ImNrbW50cmZ5NTB1cDYyb24zZHZocGl0dnUifQ.k0A3CyrtFjv-Gj7k7E9_9A";

export const LocationPin = chakra(LocationPinSvg);

function Map(props: MapProps) {
  const { defaultLat, defaultLong, listings = [] } = props;
  const streetMap = "streets-v11";
  const darkMap = "dark-v10";
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [popupInfo, setPopupInfo] = useState<ListingType>();
  const [viewport, setViewport] = useState({
    latitude: defaultLat,
    longitude: defaultLong,
    zoom: 12,
  });

  const toggleView = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Box w="100%" h="100%">
      <ReactMapGL
        {...viewport}
        width="100%"
        height="100%"
        onViewportChange={(viewport: any) => setViewport(viewport)}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        mapStyle={`mapbox://styles/mapbox/${isDarkMode ? darkMap : streetMap}`}
      >
        {listings.map((listing: ListingType, index) => (
          <Marker
            key={`marker-${index}`}
            latitude={listing.location.coordinates.latitude}
            longitude={listing.location.coordinates.longitude}
          >
            <LocationPin onClick={() => setPopupInfo(listing)} />
          </Marker>
        ))}

        {popupInfo && (
          <Popup
            offsetLeft={20}
            closeButton={false}
            tipSize={10}
            anchor="bottom"
            longitude={popupInfo.location.coordinates.longitude}
            latitude={popupInfo.location.coordinates.latitude}
            closeOnClick
            onClose={setPopupInfo}
          >
            <XsSearchResult
              key={popupInfo.key}
              imageUrl={popupInfo.imageUrl}
              location={popupInfo.location.city}
              price={popupInfo.price}
              numBaths={popupInfo.numBaths}
              numBeds={popupInfo.numBeds}
              id={popupInfo.key}
              title={popupInfo.title}
              width="100%"
            />
          </Popup>
        )}
        <IconButton
          margin="10px"
          aria-label="Map mode toggle"
          colorScheme={isDarkMode ? "blackAlpha" : "gray"}
          icon={isDarkMode ? <SunIcon /> : <MoonIcon />}
          onClick={toggleView}
        />
      </ReactMapGL>
    </Box>
  );
}

export default Map;
