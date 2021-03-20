import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { ReactElement } from "react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

interface SearchInputProps {
  placeholder: string;
  ariaLabel: string;
  onSubmit: () => any;
}

function SearchInput(props: SearchInputProps): ReactElement {
  const { placeholder, ariaLabel, onSubmit } = props;

  return (
    <InputGroup height="48px">
      <Input
        type="email"
        paddingLeft="32px"
        paddingRight="56px"
        placeholder={placeholder}
        rounded="full"
        height="100%"
        fontSize="16px"
        background="white"
        color="text.primary"
        borderColor="common.dark"
        _hover={{}}
      />
      <InputRightElement height="100%" marginRight="8px">
        <IconButton
          aria-label={ariaLabel}
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
      </InputRightElement>
    </InputGroup>
  );
}

export default SearchInput;
