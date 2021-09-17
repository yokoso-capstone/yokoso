import { useEffect, ReactElement, useState } from "react";
import { useRouter } from "next/router";
import { Box, Flex, IconButton, useToast } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import MapboxGeocoder, { Result } from "@mapbox/mapbox-gl-geocoder";
import RoutePath from "@/src/routes";

interface SearchInputProps {
  placeholder: string;
  ariaLabel: string;
}

const MAPBOX_TOKEN =
  "pk.eyJ1IjoibWVnYW4taG5nIiwiYSI6ImNrbW50cmZ5NTB1cDYyb24zZHZocGl0dnUifQ.k0A3CyrtFjv-Gj7k7E9_9A";

const geocoder = new MapboxGeocoder({
  accessToken: MAPBOX_TOKEN,
});

function SearchInput(props: SearchInputProps): ReactElement {
  const { placeholder, ariaLabel } = props;
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");
  const toast = useToast();

  const handleResult = (events: { result: Result }) => {
    const { result } = events;

    toast.closeAll();

    router.push({
      pathname: RoutePath.Search,
      query: {
        center: result.center,
        place: result.place_name,
        text: result.text,
      },
    });
  };

  const handleError = () => {
    toast({
      id: "error",
      title: "Location Not Found",
      description: "Location entered couldn't be found, please try again.",
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  };

  const onSubmit = () => {
    geocoder.query(searchInput);
    geocoder.on("result", handleResult);
  };

  useEffect(() => {
    geocoder.addTo("#location");
    geocoder.setPlaceholder(placeholder);
    geocoder.on("loading", ({ query }) => setSearchInput(query));
    geocoder.on("result", handleResult);
    geocoder.on("error", handleError);

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
