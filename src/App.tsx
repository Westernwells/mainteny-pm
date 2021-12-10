import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Header} from './components/Header';
import {About} from './pages/About';
import {Home} from './pages/Home';
import {Profile} from './pages/Profile';

// import {request} from './utils/axios-utils';

export const App = () => (
  <BrowserRouter basename="/pm">
    <div className="App">
      <Header />
    </div>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  </BrowserRouter>
);
