import { useEffect, ReactElement } from "react";
import { useRouter } from "next/router";
import { Box, Flex, IconButton } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import MapboxGeocoder, { Result } from "@mapbox/mapbox-gl-geocoder";
import RoutePath from "@/src/routes";

interface SearchInputProps {
  placeholder: string;
  ariaLabel: string;
  onSubmit?: () => void;
}

const MAPBOX_TOKEN =
  "pk.eyJ1IjoibWVnYW4taG5nIiwiYSI6ImNrbW50cmZ5NTB1cDYyb24zZHZocGl0dnUifQ.k0A3CyrtFjv-Gj7k7E9_9A";

const geocoder = new MapboxGeocoder({
  accessToken: MAPBOX_TOKEN,
});

function SearchInput(props: SearchInputProps): ReactElement {
  const { placeholder, ariaLabel, onSubmit } = props;
  const router = useRouter();

  useEffect(() => {
    const handleResult = (events: { result: Result }) => {
      const { result } = events;

      router.push({
        pathname: RoutePath.Search,
        query: {
          center: result.center,
          place: result.place_name,
          text: result.text,
        },
      });
    };

    geocoder.addTo("#location");
    geocoder.setPlaceholder(placeholder);
    geocoder.on("result", handleResult);

    return () => {
      geocoder.off("result", handleResult);
    };
  }, []);

  return (
    <Flex
      position="relative"
      borderRadius="50px"
      height="48px"
      bg="white"
      border="1px"
      borderColor="common.dark"
      align="center"
    >
      <Box flex="1" id="location" w="100%" height="100%" />

      <IconButton
        position="absolute"
        right={0}
        aria-label={ariaLabel}
        marginRight="10px"
        icon={<ArrowForwardIcon w={5} h={5} />}
        isRound
        backgroundColor="common.dark"
        color="white"
        size="sm"
        _hover={{
          backgroundColor: "brand.primary_hover",
        }}
        _active={{
          backgroundColor: "brand.primary_active",
        }}
        onClick={onSubmit}
      />
    </Flex>
  );
}

export default SearchInput;
