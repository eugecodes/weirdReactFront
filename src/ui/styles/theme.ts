import { createTheme } from "@mui/material";
import { colors } from "./colors";
import { esES } from "@mui/material/locale";

const theme = createTheme(
  {
    palette: {
      primary: {
        main: colors["brand-tangerine-accent"]
      },
      secondary: {
        main: colors["grayscale-charcoal-accent"]
      },
      error: {
        main: colors["secondary-alert-red-accent"]
      },
      grey: {
        /*  "100": colors.gray10,
        "900": colors["grayscale-gray-subtle"] */
      }
    },
    typography: {
      fontFamily: ["Inter", "sans-serif"].join(",")
    }
  },
  esES
);

export default theme;
