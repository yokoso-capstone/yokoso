import { useState } from "react";
import { chakra } from "@chakra-ui/react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import LocationPinSvg from "../svg/location-pin.svg";
import { ListingType } from "../../src/types";
import { XsSearchResult } from "@/components/SearchResult";

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
  const [popupInfo, setPopupInfo] = useState<ListingType>();
  const [viewport, setViewport] = useState({
    latitude: defaultLat,
    longitude: defaultLong,
    zoom: 12,
  });

  return (
    <ReactMapGL
      {...viewport}
      width="100%"
      height="100%"
      onViewportChange={(viewport: any) => setViewport(viewport)}
      mapboxApiAccessToken={MAPBOX_TOKEN}
      mapStyle="mapbox://styles/mapbox/streets-v11"
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
          closeOnClick={true}
          onClose={setPopupInfo}
        >
          <XsSearchResult
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
    </ReactMapGL>
  );
}

export default Map;
