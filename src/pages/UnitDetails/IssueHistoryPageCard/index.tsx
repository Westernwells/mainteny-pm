import {PageCard} from 'components/PageCard';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

export const IssueHistoryPageCard = ({children}: Props) => (
  <PageCard contentPadding="0" headerLabel="Issue History">
    {children}
  </PageCard>
);
