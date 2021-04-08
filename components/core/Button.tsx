import { chakra, Button } from "@chakra-ui/react";

export const ButtonBase = chakra(Button, {
  baseStyle: {
    fontSize: "14px",
    height: "auto",
    borderRadius: "4px",
    padding: "14px 24px",
  },
});

export const RedButton = chakra(ButtonBase, {
  baseStyle: {
    color: "white",
    background: "brand.primary",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "brand.primary",
    width: "100%",
    margin: "0 auto",
    display: "block",
    _hover: {
      background: "brand.primary_hover",
      borderColor: "brand.primary_hover",
    },
    _active: {
      background: "brand.primary_active",
      borderColor: "brand.primary_active",
    },
  },
});

export const ButtonPrimary = chakra(ButtonBase, {
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

export const ButtonSecondary = chakra(ButtonBase, {
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

export const ButtonSecondaryVariant = chakra(ButtonBase, {
  baseStyle: {
    fontWeight: "normal",
    color: "text.secondary",
    background: "transparent",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "common.neutral",
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

export const SideBarButton = chakra(Button, {
  baseStyle: {
    paddingLeft: "8px",
    width: "100%",
    bg: "transparent",
    rounded: "none",
    fontWeight: "bold",
    justifyContent: "start",
    borderLeft: "4px",
    borderLeftColor: "transparent",
    _hover: { bg: "gray", borderLeftColor: "red" },
  },
});
