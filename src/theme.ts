import {createTheme} from '@mui/material/styles';

// A custom theme for this app
export const theme = createTheme({
  palette: {
    primary: {
      light: '#457892',
      main: '#0F4C64',
      dark: '#00243A',
      contrastText: '#FFFFFF',
    },
    secondary: {
      light: '#0066ff',
      main: '#6CFFFF',
      dark: '#00A0CC',
      contrastText: '#FFFFFF',
    },
    text: {
      primary: '#222B45',
      secondary: '#8F9BB3',
      disabled: 'rgba(143, 155, 179, 0.5)',
    },
    action: {
      active: '#8F9BB3',
      hover: 'rgba(0, 209, 255, 0.04)',
      selected: 'rgba(0, 209, 255, 0.08)',
      disabled: 'rgba(143, 155, 179, 0.5)',
      disabledBackground: 'rgba(34, 43, 69, 0.12)',
      focus: 'rgba(34, 43, 69, 0.12)',
    },
    error: {
      light: '#FF605A',
      main: '#FF182F',
      dark: '#C30006',
      contrastText: '#FFFFFF',
    },
    info: {
      light: '#64B6F7',
      main: '#2196F3',
      dark: '#0B79D0',
      contrastText: '#FFFFFF',
    },
    warning: {
      light: '#FFB547',
      main: '#ED6C02',
      dark: '#C77700',
      contrastText: '#FFFFFF',
    },
    success: {
      light: '#61FFC0',
      main: '#00D68F',
      dark: '#00A361',
      contrastText: '#FFFFFF',
    },

    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
  typography: {
    fontFamily: ['"Open Sans"', 'Helvetica', 'Arial', 'sans-serif'].join(','),
    h1: {
      fontWeight: 400,
      fontSize: '96px',
      lineHeight: '112px',
      letterSpacing: '-1.5px',
    },
    h2: {
      fontWeight: 400,
      fontSize: '60px',
      lineHeight: '72px',
      letterSpacing: '-0.5px',
    },
    h3: {
      fontWeight: 400,
      fontSize: '48px',
      lineHeight: '56.02px',
    },
    h4: {
      fontWeight: 400,
      fontSize: '34px',
      lineHeight: '41.99px',
      letterSpacing: '0.25px',
    },
    h5: {
      fontWeight: 600,
      fontSize: '24px',
      lineHeight: '32.02px',
      letterSpacing: '-1.5px',
    },
    h6: {
      fontWeight: 600,
      fontSize: '20px',
      lineHeight: '32px',
      letterSpacing: '0.15px',
    },
    subtitle1: {
      fontWeight: 600,
      fontSize: '16px',
      lineHeight: '28px',
      letterSpacing: '0.15px',
    },
    subtitle2: {
      fontWeight: 600,
      fontSize: '14px',
      lineHeight: '21.98px',
      letterSpacing: '0.1px',
    },
    body1: {
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '24px',
      letterSpacing: '0.15px',
    },
    body2: {
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: '20.02px',
      letterSpacing: '0.15px',
    },
    caption: {
      fontWeight: 400,
      fontSize: '12px',
      lineHeight: '19.92px',
      letterSpacing: '0.4px',
    },
    overline: {
      fontWeight: 400,
      fontSize: '12px',
      lineHeight: '31.92px',
      letterSpacing: '1px',
    },
    buttonLarge: {
      fontWeight: 600,
      fontSize: '15px',
      lineHeight: '26px',
      letterSpacing: '0.15px',
    },
    buttonMedium: {
      fontWeight: 600,
      fontSize: '14px',
      lineHeight: '24px',
      letterSpacing: '0.4px',
    },
    buttonSmall: {
      fontWeight: 600,
      fontSize: '13px',
      lineHeight: '22px',
      letterSpacing: '0.46px',
    },
    avatarLetter: {
      fontWeight: 600,
      fontSize: '96px',
      lineHeight: '112px',
      letterSpacing: '-1.5px',
    },
    inputLabel: {},
    helperText: {
      fontWeight: 600,
      fontSize: '96px',
      lineHeight: '112px',
      letterSpacing: '-1.5px',
    },
    inputText: {},
    tooltip: {},
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: {variant: 'large'},
          style: {
            textTransform: 'none',
          },
        },
        {
          props: {variant: 'medium'},
          style: {},
        },
        {
          props: {variant: 'small', color: 'secondary'},
          style: {},
        },
      ],
    },
  },
});
