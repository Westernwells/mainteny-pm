import {BrowserRouter} from 'react-router-dom';
import {Loading} from 'components/Loading';
import {Router} from 'routes';
import {QueryCache} from 'react-query';

export const App = () => (
  <BrowserRouter basename={process.env.REACT_APP_BASE_URL}>
    <Loading />
    <Router />
  </BrowserRouter>
);
