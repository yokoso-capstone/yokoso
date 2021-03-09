import { chakra, Button as ChakraButton } from "@chakra-ui/react";

export const Button = chakra(ChakraButton, {
  baseStyle: {
    color: "red",
  },
});

export const RedButton = chakra(ChakraButton, {
  baseStyle: {
    color:"white",
    background:"#ff3030",
    border:"solid",
    width:"100%",
    margin:"0 auto",
    display:"block",
    _hover: {
      bg:"#ffff",
      color: "#ff3030"
    }
  },
});
