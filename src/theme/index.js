import { createTheme } from "@material-ui/core";

const defaultTheme = createTheme({
  typography: {
    fontFamily: ["Raleway", "sans-serif"].join(",")
  },
  palette: {
    primary: {
      main: "#DA8E3B",
      contrastText: "#FFFFFF"
    },
    secondary: {
      main: "#FCD9AF",
      contrastText: "#FFFFFF"
    }
    // text: {
    //   primary: "#000000",
    //   secondary: "#ffffff",
    // },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920
    }
  }
});

const { breakpoints, palette } = defaultTheme;

const theme = {
  ...defaultTheme,
  overrides: {
    MuiContainer: {
      root: {
        paddingTop: "3rem",
        paddingBottom: "3rem",
        maxWidth: "90%",
        "& + &": {
          paddingTop: "1rem"
        }
      }
    },
    MuiDivider: {
      root: {
        backgroundColor: "white",
        height: 2
      }
    },
    MuiButton: {
      contained: {
        textTransform: "none",
        letterSpacing: 0.3,
        fontSize: "1rem",
        backgroundColor: defaultTheme.palette.primary.main,
        "&:hover": {
          backgroundColor: defaultTheme.palette.primary.main
        }
      }
    },
    MuiOutlinedInput: {
      root: {
        borderRadius: 8
      }
    },
    MuiTypography: {
      gutterBottom: {
        marginBottom: "0.5rem"
      },
      h1: {
        fontFamily: "'Raleway', sans-serif",
        fontSize: "2.75rem",
        fontWeight: 700,
        lineHeight: 1,
        [breakpoints.down("xs")]: {
          fontSize: "2.5rem"
        }
      },
      h2: {
        fontFamily: "'Raleway', sans-serif",
        fontSize: "1.3rem",
        fontWeight: 600,
        // lineHeight: 1.3,
        [breakpoints.down("xs")]: {
          fontSize: "1rem"
        }
      },
      h3: {
        fontFamily: "'Raleway', sans-serif",
        fontSize: "2rem",
        [breakpoints.down("xs")]: {
          fontSize: "1rem"
        }
      },
      h4: {
        fontFamily: "'Raleway', sans-serif",
        fontSize: "1.75rem",
        fontWeight: 500,
        [breakpoints.down("xs")]: {
          fontSize: "1.5rem"
        }
      },
      h5: {
        fontFamily: "'Raleway', sans-serif",
        fontSize: "1.3rem",
        fontWeight: 500,
        [breakpoints.down("xs")]: {
          fontSize: "1rem"
        }
      },
      h6: {
        fontFamily: "'Raleway', sans-serif",
        fontSize: "1.2rem",
        fontWeight: 500,
        [breakpoints.down("xs")]: {
          fontSize: "1rem"
        }
      },
      subtitle1: {
        fontSize: "2rem",
        [breakpoints.down("xs")]: {
          fontSize: "1rem"
        }
      },
      subtitle2: {
        fontSize: "2rem",
        [breakpoints.down("xs")]: {
          fontSize: "1rem"
        }
      },
      body1: {
        fontSize: "1rem",
        fontWeight: 600,
        letterSpacing: 0.2,
        wordSpacing: 1,
        fontFamily: "Raleway",
        color: palette.text.primary,
        // "& + &": {
        //   marginTop: "2rem",
        // },
        [breakpoints.down("xs")]: {
          fontSize: "1rem"
        }
      },
      body2: {
        fontSize: "1rem",
        fontWeight: 600,
        [breakpoints.down("xs")]: {
          fontSize: "1rem"
        }
      },
      button: {
        fontSize: "2rem",
        [breakpoints.down("xs")]: {
          fontSize: "1rem"
        }
      },
      caption: {
        fontSize: "2rem",
        [breakpoints.down("xs")]: {
          fontSize: "1rem"
        }
      },
      overline: {
        fontSize: "2rem",
        [breakpoints.down("xs")]: {
          fontSize: "1rem"
        }
      }
    }
  }
};

export default theme;
