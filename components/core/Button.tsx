import { chakra, Button as ChakraButton } from "@chakra-ui/react";
import theme from "@/src/theme";

export const Button = chakra(ChakraButton, {
  baseStyle: {
    font: "Inter",
    fontSize: "14px",
    height: "auto",
    borderRadius: "4px",
    padding: "16px 24px",
  },
});

export const RedButton = chakra(ChakraButton, {
  baseStyle: {
    color: "white",
    background: "#BC002D",
    border: "1px solid",
    width: "100%",
    margin: "0 auto",
    display: "block",
    _hover: {
      bg: "white",
      color: "#BC002D",
    },
  },
});

export const BlackButton = chakra(ChakraButton, {
  baseStyle: {
    font: "Inter-bold",
    fontWeight: "400",
    color: "white",
    background: "black",
    border: "1px solid black",
    _hover: {
      bg: theme.colors.brand.background_on,
      color: "black",
    },
  },
});

export const WhiteButton = chakra(ChakraButton, {
  baseStyle: {
    font: "Inter-bold",
    fontWeight: "400",
    color: "black",
    background: "white",
    border: "1px solid black",
    _hover: {
      bg: theme.colors.brand.background_on,
      color: "white",
    },
  },
});

export const TransparentButton = chakra(ChakraButton, {
  baseStyle: {
    fontWeight: "400",
    color: "black",
    background: "transparent",
    border: "1px solid #AAAAAA",
    _hover: {
      bg: theme.colors.brand.background_on,
    },
  },
});
