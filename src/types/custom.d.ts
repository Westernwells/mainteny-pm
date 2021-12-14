import React from 'react';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    largeBtnText: React.CSSProperties;
    mediumBtnText: React.CSSProperties;
    smallBtnText: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    largeBtnText?: React.CSSProperties;
    mediumBtnText?: React.CSSProperties;
    smallBtnText?: React.CSSProperties;
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
  }
}

// ButtonPropsVariantOverrides
