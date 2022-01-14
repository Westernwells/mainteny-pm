import FileDownloadOutlined from '@mui/icons-material/FileDownloadOutlined';
import Button from '@mui/material/Button';
import Box from '@mui/system/Box';
import {Document, Page, pdfjs} from 'react-pdf/dist/esm/entry.webpack';

// https://github.com/wojtekmaj/react-pdf/issues/321#issuecomment-451291757
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export const Invoice = () => (
  <Box
    display="flex"
    sx={{
      flexDirection: 'column',
      alignItems: 'flex-end',
      justifyContent: 'center',
    }}
  >
    <form method="get" action="/pm/INV000128.pdf">
      <Button
        variant="contained"
        size="large"
        type="submit"
        endIcon={<FileDownloadOutlined />}
      >
        Download PDF
      </Button>
    </form>
    <Box
      display="flex"
      sx={{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      {' '}
      <Document file="/pm/INV000128.pdf">
        <Page pageNumber={1} />
      </Document>
    </Box>
  </Box>
);
