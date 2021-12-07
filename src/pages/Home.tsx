import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useFetch } from '../hooks/useFetch';

export const Home = () => {
  const { data, error, loading } = useFetch('/api/versions', {}, 'get');

  if (loading) console.log(loading, '>>>>>component loading');
  if (data) console.log(data, 'component data');
  if (error) console.log(error, 'component error');
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Hello World
        </Typography>
      </Box>
    </Container>
  );
};
