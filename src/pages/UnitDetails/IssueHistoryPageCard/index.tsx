import {PageCard} from 'components/PageCard';
import React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';

interface Props {
  children: React.ReactNode;
}

export const IssueHistoryPageCard = ({children}: Props) => (
  <PageCard contentPadding="0" headerLabel="Issue History">
    {children}
  </PageCard>
);
