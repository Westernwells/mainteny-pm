import * as React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Profile } from './pages/Profile';

export default function App() {
  console.log(process.env.NODE_ENV, 'environment')
  console.log(process.env.REACT_APP_BASE_URL)
  return (
    <BrowserRouter>
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
}
