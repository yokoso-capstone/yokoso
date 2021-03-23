import { chakra, Box, Container } from "@chakra-ui/react";

export const ContainerPrimary = chakra(Container, {
  baseStyle: {
    maxWidth: "1640px",
    paddingX: ["0.25in", "0.25in", "0.5in", "0.75in", "1.25in"],
  },
});

export const Card = chakra(Box, {
  baseStyle: {
    background: "white",
    borderRadius: "4px",
    boxShadow: "md",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "gray.200",
  },
});
