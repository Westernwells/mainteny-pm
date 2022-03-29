import {ChangeEvent, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import useTheme from '@mui/material/styles/useTheme';
import Box from '@mui/material/Box';
import {ReactComponent as EditIcon} from 'assets/icons/Edit.svg';
import CheckCircleRounded from '@mui/icons-material/CheckCircleRounded';
import CancelIcon from '@mui/icons-material/Cancel';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import {MyDropzone} from 'components/MyDropZone';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import {FileWithPreview} from 'models/misc';
import {CustomButtonUnstyled} from 'components/CustomButtonUnstyled';
import {Area} from 'react-easy-crop/types'; // eslint-disable-line
import {getUploadSignedUrl} from 'hooks/reactQuery/useUploadSignedUrl';
import {usePropertyManager} from 'hooks/reactQuery/usePropertyManager';
import {FormikProps} from 'formik';
import {useDownloadUrl} from 'hooks/reactQuery/useDownloadUrl';
import {FormInput} from './FormInput';
import {SettingCard} from './SettingCard';
import {FormFeilds} from '..';

interface Props {
  formik: FormikProps<FormFeilds>;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
}

interface FileWithBlob {
  blob: Blob;
  url: string;
  name: string;
}

export const PersonalDetails = ({formik, onChange, handleSubmit}: Props) => {
  const theme = useTheme();
  const {data: user} = usePropertyManager();
  const [uploadMode, setUploadMode] = useState(false);
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [clear, setClear] = useState(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();
  const [fileError, setFileError] = useState<{size: boolean; type: boolean}>({
    size: false,
    type: false,
  });
  const {data: downloadUrl} = useDownloadUrl(
    formik.values.userAvatar ? [formik.values.userAvatar] : [],
  );

  const handleClose = () => {
    setOpen(false);
  };

  const getArrayBuffer = (file: FileWithBlob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file.blob);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const uploadImage = async (file: FileWithBlob) => {
    const arrayBuffer = (await getArrayBuffer(file)) as string;
    const serviceCompanyId = user?.propertyOwner.serviceCompany.id;
    if (serviceCompanyId) {
      const response = await getUploadSignedUrl(
        [file.name],
        user?.propertyOwner.serviceCompany.id,
      );

      await fetch(response[file.name], {
        method: 'PUT',
        headers: {
          'Content-Type': file.blob.type,
        },
        body: arrayBuffer,
      });

      await handleSubmit();
      setOpen(false);
      setUploadMode(false);
    }
  };

  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener('load', () => resolve(image));
      image.addEventListener('error', (error) => reject(error));
      image.src = url;
    });

  const getCroppedImage = async (file: FileWithPreview, pixelCrop: Area) => {
    const image = await createImage(file.preview);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      return null;
    }

    // set canvas size to match dimensions
    canvas.width = image.width;
    canvas.height = image.height;

    // draw  image
    ctx.drawImage(image, 0, 0);

    // extract the cropped image using these values
    const data = ctx.getImageData(
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
    );

    // set canvas width to final desired crop size - this will clear existing context
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.putImageData(data, 0, 0);

    // As a blob
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve({
          blob,
          name: file.name,
          url: URL.createObjectURL(blob as Blob),
        });
      }, file.type);
    });
  };

  const renderDialog = () => (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={handleClose}
      sx={{minWidth: '5rem'}}>
      <DialogTitle id="alert-dialog-title">Upload Profile Picture</DialogTitle>
      <DialogContent
        sx={{
          position: 'relative',
          height: 300,
          width: 'auto',
          minWidth: {sm: 500},
        }}>
        <MyDropzone
          getFileError={(x: {size: boolean; type: boolean}) => setFileError(x)}
          getFiles={(item: FileWithPreview[]) => {
            formik.setFieldValue('userAvatar', item.length ? item[0].name : '');
            setFiles(item);
          }}
          getPixelCrop={(item?: Area) => setCroppedAreaPixels(item)}
          clear={clear}
          setClear={setClear}
        />
      </DialogContent>

      <DialogActions sx={{flexDirection: 'column'}}>
        <Box width="100%" display="flex" justifyContent="space-between">
          <Box>
            <Box display="flex" mt="0.5em">
              {files.length === 0 ? (
                <CheckCircleRounded sx={{color: theme.palette.text.disabled}} />
              ) : files.length && fileError.type ? (
                <CancelIcon sx={{color: theme.palette.error.main}} />
              ) : (
                <CheckCircleRounded sx={{color: theme.palette.success.main}} />
              )}

              <Box sx={{ml: '0.5em'}}>
                <Typography variant="body1">JPG, PNG or BMP only</Typography>
              </Box>
            </Box>

            <Box display="flex" mt="0.5em">
              {files.length === 0 ? (
                <CheckCircleRounded sx={{color: theme.palette.text.disabled}} />
              ) : files.length && fileError.size ? (
                <CancelIcon sx={{color: theme.palette.error.main}} />
              ) : (
                <CheckCircleRounded sx={{color: theme.palette.success.main}} />
              )}
              <Box sx={{ml: '0.5em'}}>
                <Typography variant="body1">
                  File size less than 5MB only
                </Typography>
              </Box>
            </Box>
          </Box>
          {files?.length ? (
            <Box>
              <CustomButtonUnstyled
                label="Change picture"
                size="small"
                onClick={() => setClear(true)}
                styles={{
                  border: 'none',

                  ml: '1em',
                  '&:hover': {
                    background: 'transparent',
                  },
                }}
              />
            </Box>
          ) : null}
        </Box>
        {files.length && !fileError.size && !fileError.type ? (
          <>
            <Divider sx={{background: 'red'}} variant="fullWidth" />
            <Box
              width="100%"
              display="flex"
              justifyContent="flex-end"
              sx={{borderTop: '1px solid #E5E5E5', py: '1em', mt: '0.5em'}}>
              <CustomButtonUnstyled
                label="Cancel"
                size="small"
                onClick={handleClose}
              />
              <CustomButtonUnstyled
                label="Upload"
                size="small"
                onClick={async () => {
                  const res = (await getCroppedImage(
                    files[0],
                    croppedAreaPixels!,
                  )) as FileWithBlob;
                  await uploadImage(res);
                }}
                styles={{
                  background: theme.palette.primary.main,
                  color: '#fff',
                  ml: '1em',
                  '&:hover': {
                    background: theme.palette.primary.main,
                  },
                }}
              />
            </Box>
          </>
        ) : null}
      </DialogActions>
    </Dialog>
  );

  return (
    <SettingCard header="Personal Details">
      <Box display="flex" gap={4}>
        <Box
          sx={{position: 'relative'}}
          onClick={() => setOpen(true)}
          onMouseLeave={() => setUploadMode(false)}
          onMouseEnter={() => setUploadMode(true)}>
          <Avatar
            alt={formik.values.fullName}
            src={downloadUrl ? downloadUrl[0] : ''}
            variant="circular"
            sx={{
              width: '120px',
              height: '120px',
              aspectRatio: '1',
              opacity: uploadMode ? 0.5 : 1,
              cursor: uploadMode ? 'pointer' : 'auto',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 90,
              left: 75,
              display: uploadMode ? 'block' : 'none',
              cursor: uploadMode ? 'pointer' : 'auto',
            }}>
            <EditIcon />
          </Box>
        </Box>
        <Box flexGrow={1}>
          <FormInput
            label="Name"
            id="fullName"
            value={formik.values.fullName}
            onChange={onChange}
          />
          <FormInput
            label="Designation"
            id="userDesignation"
            value={formik.values.userDesignation}
            onChange={onChange}
            disabled
          />
          <FormInput
            label="Phone"
            id="userPhone"
            value={formik.values.userPhone}
            onChange={onChange}
          />
        </Box>
      </Box>
      {renderDialog()}
    </SettingCard>
  );
};
