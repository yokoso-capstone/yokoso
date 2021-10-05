import React from "react";
import { chakra, Heading, Link as ChakraLink, Text } from "@chakra-ui/react";

export const HeadingBase = chakra(Heading, {
  baseStyle: {
    fontFamily: "Gilroy",
    fontWeight: "extrabold",
    lineHeight: "1.1",
    color: "text.primary",
  },
});

export const Heading1 = chakra((props) => <HeadingBase as="h1" {...props} />, {
  baseStyle: {
    fontSize: "96px",
  },
});

export const Heading2 = chakra((props) => <HeadingBase as="h2" {...props} />, {
  baseStyle: {
    fontSize: "60px",
  },
});

export const Heading3 = chakra((props) => <HeadingBase as="h3" {...props} />, {
  baseStyle: {
    fontSize: "48px",
  },
});

export const Heading4 = chakra((props) => <HeadingBase as="h4" {...props} />, {
  baseStyle: {
    fontSize: "36px",
  },
});

export const Heading5 = chakra((props) => <HeadingBase as="h5" {...props} />, {
  baseStyle: {
    fontSize: "24px",
  },
});

export const Heading6 = chakra((props) => <HeadingBase as="h6" {...props} />, {
  baseStyle: {
    fontSize: "20px",
  },
});

export const TextBase = chakra(Text, {
  baseStyle: {
    fontWeight: "normal",
    lineHeight: "1.5",
    color: "text.primary",
  },
});

export const Body1 = chakra(TextBase, {
  baseStyle: {
    fontSize: "16px",
  },
});

export const Body2 = chakra(TextBase, {
  baseStyle: {
    fontSize: "14px",
  },
});

export const Caption = chakra(Text, {
  baseStyle: {
    fontSize: "14px",
    fontWeight: "normal",
    color: "text.secondary",
  },
});

export const Link = chakra(ChakraLink, {
  baseStyle: {
    fontWeight: 700,
    fontSize: "14px",
    color: "text.primary",
    _hover: {
      color: "text.secondary",
    },
  },
});
