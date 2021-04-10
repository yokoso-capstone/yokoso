import { useEffect, useState } from "react";
import { chakra, Box, IconButton } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { XsSearchResult } from "@/components/SearchResult";
import { Listing } from "@/src/api/types";
import LocationPinSvg from "../svg/location-pin.svg";

interface MapProps {
  defaultLat: number;
  defaultLong: number;
  zoom: number;
  listings?: Listing[];
}

const MAPBOX_TOKEN =
  "pk.eyJ1IjoibWVnYW4taG5nIiwiYSI6ImNrbW50cmZ5NTB1cDYyb24zZHZocGl0dnUifQ.k0A3CyrtFjv-Gj7k7E9_9A";

export const LocationPin = chakra(LocationPinSvg);

function Map(props: MapProps) {
  const { defaultLat, defaultLong, zoom, listings } = props;
  const streetMap = "streets-v11";
  const darkMap = "dark-v10";
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [popupInfo, setPopupInfo] = useState<Listing & { num: number }>();
  const [viewport, setViewport] = useState({
    latitude: defaultLat,
    longitude: defaultLong,
    zoom: 12,
  });

  const toggleView = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    setViewport({
      latitude: defaultLat,
      longitude: defaultLong,
      zoom,
    });
  }, [defaultLat, defaultLong, zoom]);

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
        {listings &&
          listings.map((listing, index) => (
            <Marker
              key={`marker-${index}`}
              latitude={listing.location.coordinate.latitude}
              longitude={listing.location.coordinate.longitude}
            >
              <LocationPin
                onClick={() => setPopupInfo({ ...listing, num: index })}
              />
            </Marker>
          ))}

        {popupInfo && (
          <Popup
            offsetLeft={20}
            closeButton={false}
            tipSize={10}
            anchor="bottom"
            longitude={popupInfo.location.coordinate.longitude}
            latitude={popupInfo.location.coordinate.latitude}
            closeOnClick
            onClose={setPopupInfo}
          >
            <XsSearchResult
              num={popupInfo.num}
              listing={popupInfo}
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
