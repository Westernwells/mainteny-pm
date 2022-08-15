import {useTranslation} from 'react-i18next';
import {FormInput} from 'components/form/FormInput';
import {PageCard} from 'components/PageCard';

interface Props {
  description: string;
  setDescription: (val: string) => void;
}

export const AddDescription = ({description, setDescription}: Props) => {
  const {t} = useTranslation();

  return (
    <PageCard headerLabel={t('Description')} minHeight="100%">
      <FormInput
        containerStyles={{maxWidth: '27rem'}}
        props={{
          id: 'description',
          label: t('Description'),
          placeholder: t(
            'e. g. Elevator is making loud noise and has been accelerating very slow',
          ),
          value: description,
          variant: 'outlined',
          multiline: true,
          minRows: 10,
          type: 'text',
          onChange: (e) => setDescription(e.target.value),
        }}
      />
    </PageCard>
  );
};
