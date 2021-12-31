import {BrowserRouter} from 'react-router-dom';
import {Loading} from 'components/Loading';
import {Router} from 'routes';

export const App = () => (
  <BrowserRouter basename="/pm">
    <Loading />
    <Router />
  </BrowserRouter>
);
