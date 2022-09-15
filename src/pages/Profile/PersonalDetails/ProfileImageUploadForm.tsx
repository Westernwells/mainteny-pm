import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import _ from 'lodash';
import {useUploadFiles} from 'hooks/reactQuery/useUploadSignedUrl';
import {FileResourceRecord} from 'models/media';
import {FileWithPreview, MyDropZone} from 'components/MyDropZone/MyDropzone';
import {Dialog} from 'components/Dialog';

export interface Props {
  title: string;
  successMessage: string;
  hints?: string[];
  uploadPath: string;
  onSave: (files: FileResourceRecord[]) => void;
  onCancel: () => void;
}

export const ProfileImageUploadForm = ({
  title,
  successMessage,
  hints,
  uploadPath,
  onSave,
  onCancel,
}: Props) => {
  const {t} = useTranslation();
  const [acceptedFiles, setAcceptedFiles] = useState<FileWithPreview[]>([]);
  const {mutateAsync: uploadImages, isLoading} = useUploadFiles(successMessage);

  const updateImages = async (files: FileWithPreview[]) => {
    if (files.length) {
      await uploadImages({files, uploadPath});
    }
  };

  const save = async () => {
    await updateImages(acceptedFiles);
    const files = _.map(acceptedFiles, (file) => ({
      description: file.name,
      type: file.type,
      uri: uploadPath.concat('/').concat(file.name),
    }));
    onSave(files);
  };

  return (
    <Dialog
      title={title}
      isSaving={isLoading}
      disableSaveBtn={!acceptedFiles.length}
      onCancel={() => onCancel()}
      onSave={() => save()}
      dialogProps={{
        maxWidth: 'md',
        open: true,
      }}>
      <MyDropZone
        hints={hints}
        acceptedFileTypes="image/*"
        getAcceptedFiles={(files) => {
          setAcceptedFiles(files);
        }}
        getRejectedFileWithErrors={(file) => {
          console.log(file);
        }}
        maxFiles={1}
        isCropped
        cropperTitle={t('Upload Profile Picture')}
      />
    </Dialog>
  );
};
