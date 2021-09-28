import { chakra, IconButton } from "@chakra-ui/react";

export const IconButtonBase = chakra(IconButton, {
  baseStyle: {
    fontSize: "14px",
    height: "auto",
    borderRadius: "4px",
    padding: "14px 24px",
  },
});

export const IconButtonPrimary = chakra(IconButtonBase, {
  baseStyle: {
    fontWeight: "bold",
    color: "white",
    background: "common.dark",
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
