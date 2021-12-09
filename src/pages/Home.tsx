import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {useFetch} from '../hooks/useFetch';

export const Home = () => {
  const {loading, data, error} = useFetch('/api/version', 'get', {}, {});

  if (loading) {
    return <Typography variant="h4">Loading</Typography>;
  }

  if (error) {
    return <Typography variant="body1">Error</Typography>;
  }
  return (
    <Container maxWidth="sm">
      <Box sx={{my: 4}}>
        <Typography variant="h4" component="h1" gutterBottom>
          Hello World {data}
        </Typography>
      </Box>
    </Container>
  );
};
