import { ReactElement } from "react";
import {
  Stack,
  FormControl,
  InputGroup,
  Input,
  Flex,
  Text,
  Box
} from "@chakra-ui/react";

function HomePage(): ReactElement {
  return (
    <Flex
      justify="center"
      align="center"
      paddingTop="30px"
      bgImage="url('/bg1.jpg')"
      height="calc(100vh - 165px)"
      bgPosition="center"
      bgRepeat="no-repeat"
      bgSize="cover"
    >
      <Stack spacing={3} direction="row">
        <Stack spacing={3}>
          <Text>Location:</Text>
          <FormControl isRequired>
            <InputGroup>
              <Input type="name" placeholder="City" aria-label="City" />
            </InputGroup>
          </FormControl>
        </Stack>
        <Stack spacing={3}>
          <Text>Renters:</Text>
          <FormControl isRequired>
            <InputGroup>
              <Input
                type="number"
                placeholder="1"
                aria-label="Number of Renters"
              />
            </InputGroup>
          </FormControl>
        </Stack>
      </Stack>
    </Flex>
  );
}

export default HomePage;
