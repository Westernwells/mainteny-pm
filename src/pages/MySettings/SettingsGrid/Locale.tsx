import React from 'react';
import {FormTextInput} from './FormTextInput';
import {SettingCard} from './SettingCard';

interface Props {
  locale: {[key: string]: string | any};
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Locale = ({locale, setDrawerOpen}: Props) => (
  <SettingCard header="Language & Region">
    <FormTextInput
      setDrawerOpen={setDrawerOpen}
      label="Language"
      defaultValue={locale?.language}
    />
    <FormTextInput
      setDrawerOpen={setDrawerOpen}
      label="Timezone"
      defaultValue={locale?.timezone}
    />
  </SettingCard>
);
