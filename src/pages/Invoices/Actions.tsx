import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import FileDownloadOffOutlinedIcon from '@mui/icons-material/FileDownloadOffOutlined';
import {useDownloadUrl} from 'hooks/reactQuery/useDownloadUrl';
import {InvoiceStatus, InvoiceView} from 'models/invoice';
import {PdfGenerationStatus} from 'models/misc';

interface Props {
  invoice: InvoiceView;
}

export const Actions = ({invoice}: Props) => {
  const {data: downloadUrl} = useDownloadUrl(
    invoice ? [invoice!.additionalInfo.pdfPath] : [],
  );

  return (
    <Box>
      {invoice.status !== InvoiceStatus.DRAFT &&
        (invoice!.additionalInfo.pdfGenerationStatus ===
          PdfGenerationStatus.DONE && downloadUrl ? (
          <IconButton
            onClick={() =>
              window.open(`${Object.values(downloadUrl)[0]}`, '_blank')
            }>
            <FileDownloadOutlinedIcon
              fontSize="small"
              sx={{color: 'action.active'}}
            />
          </IconButton>
        ) : (
          <IconButton disabled>
            <FileDownloadOffOutlinedIcon
              fontSize="small"
              sx={{color: 'action.active', cursor: 'not-allowed'}}
            />
          </IconButton>
        ))}
    </Box>
  );
};
