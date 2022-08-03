import {useDropzone} from 'react-dropzone';
import {useCallback, useEffect, useState} from 'react';
import useTheme from '@mui/material/styles/useTheme';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {FileWithPreview} from 'models/misc';
import Cropper from 'react-easy-crop';
import {Area, Point} from 'react-easy-crop/types'; // eslint-disable-line

interface Props {
  getFiles: (files: FileWithPreview[]) => void;
  getFileError: (x: {size: boolean; type: boolean}) => void;
  getPixelCrop?: (x?: Area) => void;
  clear: boolean;
  setClear: (x: boolean) => void;
}

const acceptedFileTypes = ['jpg', 'png', 'bmp', 'jpeg'];

export const MyDropzone = ({
  getFiles,
  getFileError,
  getPixelCrop,
  setClear,
  clear,
}: Props) => {
  const theme = useTheme();
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [crop, setCrop] = useState<Point>({x: 0, y: 0});
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();
  const onCropComplete = useCallback(
    (croppedArea: Area, croppedPixels: Area) => {
      setCroppedAreaPixels(croppedPixels);
    },
    [],
  );
  const [fileError, setFileError] = useState<{size: boolean; type: boolean}>({
    size: false,
    type: false,
  });

  useEffect(() => {
    if (clear) {
      setFiles([]);
      setCrop({x: 0, y: 0});
      setZoom(1);
      setCroppedAreaPixels(undefined);
      setFileError({
        size: false,
        type: false,
      });
      setClear(false);
    }
  }, [clear]);

  const modifyFile = useCallback(
    (x: File[]) => {
      let error = fileError;
      const withPreview = x.map((file) => {
        const fileSize = file.size / 1000;
        const fileType = file.type.split('/');
        if (fileSize > 5000) {
          error = {...fileError, size: true};
        }
        if (!acceptedFileTypes.includes(fileType[1])) {
          error = {...fileError, type: true};
        }
        return Object.assign(file, {
          preview: URL.createObjectURL(file),
        });
      });
      return {fileWithPreview: withPreview, error};
    },
    [fileError],
  );

  const {getRootProps, getInputProps, open, acceptedFiles} = useDropzone({
    noClick: true,
    noKeyboard: true,
    accept: 'image/*',
    onDrop: (theAcceptedFiles) => {
      const result = modifyFile(theAcceptedFiles);
      setFileError(result.error);
      setFiles(result.fileWithPreview);
    },
  });

  useEffect(() => {
    const result = modifyFile(acceptedFiles);
    setFileError(result.error);
    setFiles(result.fileWithPreview);
  }, [acceptedFiles]);

  useEffect(() => {
    getFiles(files);
    getFileError(fileError);
    if (getPixelCrop) {
      getPixelCrop(croppedAreaPixels);
    }
  }, [files, fileError, croppedAreaPixels]);

  const preview = files.map((file) => (
    <Cropper
      image={file.preview}
      crop={crop}
      zoom={zoom}
      aspect={1}
      onCropChange={setCrop}
      onCropComplete={onCropComplete}
      onZoomChange={setZoom}
    />
  ));

  return preview.length && !fileError.size && !fileError.type ? (
    <div>{preview}</div>
  ) : (
    <div
      {...getRootProps({className: 'dropzone'})}
      style={{
        border: '2px dashed rgba(143, 155, 179, 0.5)',
        background: theme.palette.inputBackground.main,
      }}>
      <input {...getInputProps()} />

      <Box sx={{my: '4em'}}>
        <Typography variant="subtitle1" sx={{textAlign: 'center'}}>
          Drag and Drop Image{' '}
        </Typography>
        <br />{' '}
        <Typography variant="subtitle1" sx={{textAlign: 'center', mb: '2em'}}>
          OR
        </Typography>
        <Box sx={{mx: 'auto', width: '12rem'}}>
          <Button
            variant="contained"
            onClick={open}
            autoFocus
            sx={{
              width: '100%',
            }}>
            Browse Files
          </Button>
        </Box>
      </Box>
    </div>
  );
};
