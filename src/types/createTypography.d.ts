import * as createTypography from '@mui/material/styles/createTypography';

declare module '@mui/material/styles/createTypography' {
  interface TypographyOptions {
    buttonLarge?: TypographyOptions['h1'];
    buttonMedium?: TypographyOptions['h1'];
    buttonSmall?: TypographyOptions['h1'];
    avatarLetter?: TypographyOptions['h1'];
    inputLabel?: TypographyOptions['h1'];
    helperText?: TypographyOptions['h1'];
    inputText?: TypographyOptions['h1'];
    tooltip?: TypographyOptions['h1'];
  }

  interface Typography {
    buttonLarge: Typography['h1'];
    buttonMedium: Typography['h1'];
    buttonSmall: Typography['h1'];
    avatarLetter: Typography['h1'];
    inputLabel: Typography['h1'];
    helperText: Typography['h1'];
    inputText: Typography['h1'];
    tooltip: Typography['h1'];
  }
}

export default createTypography;
