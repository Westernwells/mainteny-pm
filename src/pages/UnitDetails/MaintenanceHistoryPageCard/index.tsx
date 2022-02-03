import {PageCard} from 'components/PageCard';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

export const MaintenanceHistoryPageCard = ({children}: Props) => (
  <PageCard contentPadding="0" headerLabel="Maintenance History">
    {children}
  </PageCard>
);
