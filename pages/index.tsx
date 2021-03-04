import { ReactElement } from "react";
import { Stack, FormControl, InputGroup, InputLeftAddon, Input, Icon, Flex, Text } from "@chakra-ui/react";

function HomePage(): ReactElement {
  return (
    <Flex justify='center' align='center' paddingTop='30px'>
      <Stack spacing={3} isInline>
        <Stack spacing={3}>
          <Text>Location:</Text>
          <FormControl isRequired>
            <InputGroup>
              <InputLeftAddon children={<Icon name='info' />} />
              <Input type='name' placeholder='City' aria-lable='City'/>
            </InputGroup>
          </FormControl>
        </Stack>
        <Stack spacing={3}>
          <Text>Renters:</Text>
          <FormControl isRequired>
            <InputGroup>
              <Input type='number' placeholder='1' aria-lable='Number of Renters'/>
            </InputGroup>
          </FormControl>
        </Stack>
      </Stack>
    </Flex>
  );
}

export default HomePage;
