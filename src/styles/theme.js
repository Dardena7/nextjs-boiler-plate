
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: '#200df2',
      100: '#f6f8fe',
      200: '#e8edfc',
      300: '#bac4f7',
      500: '#200df2',
      700: '#081f91',
      900: '#020219',
    },
    secondary: {
      main: '#7e7367',
      100: '#fbfaf9',
      200: '#f1edea',
      300: '#e7dfda',
      500: '#7e7367',
      700: '#463f39',
      900: '#0f0d0a',
    },
    text: {
      primary: '#463f39',
      secondary: '#7e7367',
    }
  },
});

export default theme;