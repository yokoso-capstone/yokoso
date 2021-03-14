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
    <>
      <InputGroup height="45px">
        <Input
          type="email"
          paddingRight="72px"
          placeholder={placeholder}
          rounded="full"
          height="100%"
          fontSize="14px"
          borderColor="common.dark"
          _hover={{}}
        />
        <InputRightElement
          width="32px"
          height="100%"
          justifyContent="flex-end"
          marginRight="10px"
        >
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
    </>
  );
}

export default SearchInput;
