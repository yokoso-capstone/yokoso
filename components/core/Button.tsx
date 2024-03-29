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
    fontWeight: "bold",
    color: "white",
    background: "brand.primary",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "brand.primary",
    _hover: {
      background: "brand.primary_hover",
    },
    _active: {
      background: "brand.primary_active",
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

export const ButtonLink = chakra(
  (props) => <Button variant="link" {...props} />,
  {
    baseStyle: {
      fontWeight: "normal",
      fontSize: "14px",
      color: "text.primary",
    },
  }
);

export const SideBarButton = chakra(Button, {
  baseStyle: {
    paddingLeft: "16px",
    width: "100%",
    height: "52px",
    bg: "transparent",
    rounded: "none",
    fontSize: "14px",
    fontWeight: "bold",
    justifyContent: "start",
    borderLeft: "4px",
    borderLeftColor: "transparent",
    _hover: { background: "gray.700" },
    _active: { background: "common.dark" },
  },
});
