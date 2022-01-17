/* eslint-disable prefer-template */
import FileDownloadOutlined from '@mui/icons-material/FileDownloadOutlined';
import Button from '@mui/material/Button';
import Box from '@mui/system/Box';
import React from 'react';
import {Document, Page, pdfjs} from 'react-pdf/dist/esm/entry.webpack';
import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

// https://github.com/wojtekmaj/react-pdf/issues/321#issuecomment-451291757
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface InvoiceProps {
  url: string;
}

export const Invoice = ({url}: InvoiceProps) => (
  <Box
    display="flex"
    sx={{
      flexDirection: 'column',
      alignItems: 'flex-end',
      justifyContent: 'center',
    }}
  >
    <Button
      variant="contained"
      size="large"
      onClick={() => window.open(url, '_blank')}
      endIcon={<FileDownloadOutlined />}
    >
      Download PDF
    </Button>

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
        <Page renderTextLayer={false} pageNumber={1} />
      </Document>
    </Box>
  </Box>
);
