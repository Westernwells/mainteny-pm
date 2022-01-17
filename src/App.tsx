import {BrowserRouter} from 'react-router-dom';
import {Loading} from 'components/Loading';
import {Router} from 'routes';

export const App = () => (
  <BrowserRouter basename={process.env.REACT_APP_BASE_URL}>
    <Loading />
    <Router />
  </BrowserRouter>
);
