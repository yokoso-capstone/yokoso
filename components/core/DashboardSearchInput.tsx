import { Input, InputGroup, InputLeftElement, chakra } from "@chakra-ui/react";
import SearchSvg from "../svg/search.svg";

export const SearchIcon = chakra(SearchSvg);

const DashboardSearchInput = () => (
  <>
    <InputGroup height="48px">
      <Input
        type="search"
        paddingLeft="36px"
        paddingRight="56px"
        placeholder="Search"
        height="100%"
        fontSize="16px"
        background="white"
        color="text.primary"
        borderWidth="0 0 1px 0"
        borderRadius="0"
        _hover={{}}
      />
      <InputLeftElement height="100%" paddingRight="5px" paddingLeft="5px">
        <SearchIcon />
      </InputLeftElement>
    </InputGroup>
  </>
);

export default DashboardSearchInput;
