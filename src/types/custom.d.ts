import React from 'react';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    largeBtnText: React.CSSProperties;
    mediumBtnText: React.CSSProperties;
    smallBtnText: React.CSSProperties;
    tableHeaderText: React.CSSProperties;
    alertTitleText: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    largeBtnText?: React.CSSProperties;
    mediumBtnText?: React.CSSProperties;
    smallBtnText?: React.CSSProperties;
    tableHeaderText?: React.CSSProperties;
    alertTitleText?: React.CSSProperties;
  }

  interface PaletteColor {
    outlinedHoverBg?: string;
  }
  interface SimplePaletteColorOptions {
    outlinedHoverBg?: string;
  }

  interface Theme {
    state: {
      hover: string;
    };
  }
  interface ThemeOptions {
    state?: {
      hover: string;
    };
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    largeBtnText: true;
    mediumBtnText: true;
    smallBtnText: true;
    tableHeaderText: true;
    alertTitleText: true;
  }
}

// ButtonPropsVariantOverrides
