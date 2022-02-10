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

const fileUrl =
  'https://media-bucket-stage-505a42c.s3.eu-central-1.amazonaws.com/4a156124-a1f1-4877-9059-595416996223/invoices/62a0e86d-ecee-4139-b977-48ff529187f7.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIASIIIXQUANM47FOVI%2F20220210%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20220210T103046Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDGV1LWNlbnRyYWwtMSJGMEQCIC75BJMpWDH7thS7glbjvfdnfvJ5hmUxbMHpiVM2ApD1AiB3%2Bv712mtytjaX9a9DdBTT%2BJNkVKWo95O%2Be7oYLtolhiqmAggsEAIaDDE1NTE3NDAxMjE2MCIMCNWvA4vmbW0Pk9bvKoMCI4vJz1fuIr%2FUFa9VUPVF9Vmz%2Bct6ML3rNFScbjfY6OWDhoHMYgalInb0PiUEyNS6m5w8K6KzwhDahmvWUGFvIB9UigYvWEVddknz38LuZy31UHo6ocY5Jq0rZiSiwaMEDMdwVUJosQ8HvL9R3mnqUNgmGC1I9OnA7sy33UR6B6JaJKwhjBhbnhVv4q2pfZMX%2BkSlQpVIoZI2%2FJHH47RD7p4LOQ1cGZvtq5Hl5oaPuKQHH85tTguAkLPngb3YCI84vWzsTkUJL8gEgv1fSQUqPueDoFSDBBpn08MzcT5S%2Fi0wyozZ4N4LdBVJVxh47xOQZtuoAG24GA6IQjeeXjPdrjUU%2BDDQ0pOQBjqbAdytxzkJ5KSLEXjDP%2FRSadwLPoNaVWFsL4FJ9Gx4E1wk46zpMQZYznDHVfgu8jEs%2FxMOscLPY90rwYgW1FUs%2FFowVGvm4bBF%2BqWzY%2BHxN%2BCW%2Bea8jQI%2Fa%2BM%2F0ZUpDOGJBwXW5nLjlSS9uX2Jj6nBmPhI9pnZE%2BXUWOcNw0uyLX9%2F7M%2FZQ8B%2FH8%2BxrnXIK9mWtDT3GAZa5WNZYlEP&X-Amz-Signature=6f873a9432bb914889f866109b933d9cc8edb58fe3f96c590bf3ce0fc8b16853&X-Amz-SignedHeaders=host';

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
      <img src={fileUrl} crossOrigin="anonymous" alt="" />
      <Document file="/pm/INV000128.pdf">
        <Page renderTextLayer={false} pageNumber={1} />
      </Document>
    </Box>
  </Box>
);
