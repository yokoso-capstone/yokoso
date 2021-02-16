import { chakra, Button as ChakraButton } from "@chakra-ui/react";

export const Button = chakra(ChakraButton, {
  baseStyle: {
    color: "red",
  },
});
