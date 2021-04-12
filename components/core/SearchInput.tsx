import { useEffect, useState, ReactElement } from "react";
// import { useRouter } from "next/router";
import { Box, Flex, IconButton } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

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
  const [searchCoordinates, setSearchCoordinates] = useState();

  const { placeholder, ariaLabel, onSubmit } = props;
  // const router = useRouter();
  // const [value, setValue] = useState("");

  // useEffect(() => {
  //   const queryValue = router.query.value;

  //   if (queryValue) {
  //     if (typeof queryValue === "string") {
  //       setValue(queryValue);
  //     } else {
  //       setValue(queryValue[0]);
  //     }
  //   }
  // }, [router.query]);

  useEffect(() => {
    geocoder.setPlaceholder(placeholder);
  }, [placeholder]);

  useEffect(() => {
    geocoder.addTo("#location");
    geocoder.on("result", ({ result }) => {
      setSearchCoordinates(result);
      console.log(searchCoordinates);
    });
  }, []);

  return (
    <>
      <Flex
        borderRadius="50px"
        height="48px"
        bg="white"
        border="1px"
        borderColor="common.dark"
      >
        <Box flex="1" id="location" w="100%" height="100%" />

        <IconButton
          aria-label={ariaLabel}
          margin="8px 8px 0 8px"
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
    </>
  );
}

export default SearchInput;
