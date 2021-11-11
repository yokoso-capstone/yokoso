import { chakra, IconButton } from "@chakra-ui/react";

export const IconButtonBase = chakra(IconButton, {
  baseStyle: {
    borderRadius: "4px",
  },
});

export const IconButtonPrimary = chakra(IconButtonBase, {
  baseStyle: {
    fontWeight: "bold",
    color: "white",
    background: "common.dark",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "common.dark",
    _hover: {
      background: "common.dark_hover",
    },
    _active: {
      background: "common.dark",
    },
    _disabled: {
      _hover: {
        background: "common.dark_hover",
      },
    },
  },
});

export const IconButtonSecondary = chakra(IconButtonBase, {
  baseStyle: {
    fontWeight: "bold",
    color: "text.primary",
    background: "common.light",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "common.dark_hover",
    _hover: {
      background: "common.light_hover",
    },
    _active: {
      background: "common.light_active",
    },
    _disabled: {
      _hover: {
        background: "common.light_hover",
      },
    },
  },
});
