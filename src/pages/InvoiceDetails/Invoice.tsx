import useTheme from '@mui/material/styles/useTheme';
import Box from '@mui/material/Box';
import {Document, Page, pdfjs} from 'react-pdf/dist/esm/entry.webpack';
import Typography from '@mui/material/Typography';

// https://github.com/wojtekmaj/react-pdf/issues/321#issuecomment-451291757
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface Props {
  containerStyle?: {[key: string]: string | number};
}

export const Invoice = ({containerStyle}: Props) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.inputBackground.main,
        display: 'flex',
        justifyContent: 'center',
        py: '1em',
        ...containerStyle,
      }}
    >
      <Box>
        <Document file="/pm/INV000128.pdf">
          <Page renderTextLayer={false} pageNumber={1} />
        </Document>
      </Box>
    </Box>
  );
};
