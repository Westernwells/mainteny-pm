import * as Button from '@mui/material/Button/Button';

declare module '@mui/material/Button/Button' {
  export interface ButtonPropsVariantOverrides {
    large: true;
    medium: true;
    small: true;
  }
}

export default Button;
