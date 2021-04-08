import { chakra, Tab } from "@chakra-ui/react";

export const TabBase = chakra(Tab, {
  baseStyle: {
    fontSize: "16px",
    height: "auto",
    padding: "0px 14px",
  },
});

export const TabPrimary = chakra(TabBase, {
  baseStyle: {
    fontWeight: "bold",
    _selected: {
      color: "brand.primary",
    },
  },
});
