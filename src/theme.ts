import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const breakpoints = createBreakpoints({
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
  "2xl": "96em",
});

const theme = extendTheme({
  ...breakpoints,
  colors: {
    brand: {
      primary: "#BC002D",
      primary_hover: "#AD032C",
      primary_active: "#91001F",
    },
    common: {
      dark: "#222324",
      dark_hover: "#000000",
      neutral: "#A0AEC0",
      light: "#FFFFFF",
      light_hover: "#EDF2F7",
      light_active: "#E2E8F0",
    },
    text: {
      primary: "#222324",
      secondary: "#4A5568",
      variant: "#A0AEC0",
      link: "#0366D6",
    },
  },
  fonts: {
    body: "Inter, Arial, Helvetica",
    heading: "Gilroy, Poppins",
  },
  fontWeights: {
    light: 300,
    normal: 400,
    medium: 500,
    bold: 700,
    extrabold: 800,
  },
});

export default theme;
