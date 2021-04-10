import { Input, InputGroup, InputLeftElement, chakra } from "@chakra-ui/react";
import SearchSvg from "../svg/search.svg";

export const SearchIcon = chakra(SearchSvg);

const DashboardSearchInput = () => (
  <>
    <InputGroup height="40px">
      <Input
        type="search"
        placeholder="Search"
        height="100%"
        fontSize="16px"
        color="text.primary"
        borderWidth="0 0 3px 0"
        borderRadius="1px"
        _focus={{ borderColor: "common.dark" }}
      />
      <InputLeftElement>
        <SearchIcon />
      </InputLeftElement>
    </InputGroup>
  </>
);

export default DashboardSearchInput;
