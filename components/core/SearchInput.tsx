import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { ReactElement } from "react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

function SearchInput(): ReactElement {
  return (
    <>
      <InputGroup width={["100%", "3.5in", "3in", "3.5in"]} height="45px">
        <Input
          type="email"
          paddingRight="72px"
          placeholder="Where are you staying?"
          rounded="100px"
          height="100%"
          fontFamily="Inter"
          fontSize="14px"
          borderColor="brand.background_on"
          _hover={{}}
          _focus={{}}
        />
        <InputRightElement
          width="32px"
          height="100%"
          justifyContent="flex-end"
          marginRight="10px"
        >
          <IconButton
            aria-label="Search for homes based on location"
            icon={<ArrowForwardIcon w={5} h={5} />}
            isRound
            backgroundColor="black"
            color="white"
            fontSize="16px"
            size="sm"
            _hover={{
              backgroundColor: "#BC002D",
            }}
            _active={{}}
          />
        </InputRightElement>
      </InputGroup>
    </>
  );
}

export default SearchInput;
