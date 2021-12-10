/* eslint-disable no-console */
import Container from '@mui/material/Container';
import {Button} from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {useFetchContractDetails, useQueryContract} from '../hooks/useContract';

export const Home = () => {
  const dummyContractId = '58ef817f-17b2-4bce-9823-990b6dd1a437';
  const {isLoading, data} = useQueryContract();
  const {data: contractDetails, refetch: fetchDetail} =
    useFetchContractDetails(dummyContractId);

  console.log(isLoading, data);
  console.log(contractDetails, '<<<<<<<<<<<<<<<<<contract details');
  return (
    <Container maxWidth="sm">
      <Box sx={{my: 4}}>
        <Typography variant="h4" component="h1" gutterBottom>
          Hello World
        </Typography>
        <Button variant="outlined" onClick={() => fetchDetail()}>
          Fetch Contract Details
        </Button>
      </Box>
    </Container>
  );
};
