import {useTranslation} from 'react-i18next';
import {FormInput} from 'components/form/FormInput';
import {PageCard} from 'components/PageCard';

interface Props {
  instructions: string;
  setInstructions: (val: string) => void;
}

export const AddInstructions = ({instructions, setInstructions}: Props) => {
  const {t} = useTranslation();

  return (
    <PageCard headerLabel={t('Instructions')} minHeight="100%">
      <FormInput
        containerStyles={{maxWidth: '27rem'}}
        props={{
          id: 'info',
          label: t('Info'),
          placeholder: t('e.g. Machine room key is at the reception'),
          value: instructions,
          variant: 'outlined',
          multiline: true,
          minRows: 10,
          type: 'text',
          onChange: (e) => setInstructions(e.target.value),
        }}
      />
    </PageCard>
  );
};
