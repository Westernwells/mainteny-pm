import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Login} from './pages/Login';

export const App = () => (
  <BrowserRouter basename="/pm">
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>
);
