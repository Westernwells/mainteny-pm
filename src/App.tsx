import {useRef} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LoadingBar, {LoadingBarRef} from 'react-top-loading-bar';
import Box from '@mui/material/Box';
import {AppTopBar} from './components/AppTopBar';
import {Login} from './pages/Login';
import {MyUnits} from './pages/my-units/MyUnits';
import {UnitsDetail} from './pages/units-detail/UnitsDetail';

interface LoadingProps extends LoadingBarRef {
  continuousStart: (startingValue?: number, refreshRate?: number) => void;
}

export const App = () => {
  const ref = useRef<LoadingProps>(null);

  return (
    <Box>
      <LoadingBar color="#222B45" ref={ref} />
      <BrowserRouter basename="/pm">
        <AppTopBar startLoading={() => ref.current!.continuousStart()} />
        <AppDrawer />

        <Routes>
          <Route
            path="/"
            element={
              <Login startLoading={() => ref.current!.continuousStart()} />
            }
          />
          <Route
            path="/login"
            element={
              <Login startLoading={() => ref.current!.continuousStart()} />
            }
          />
          <Route
            path="/my-units"
            element={<MyUnits stopLoading={() => ref.current!.complete()} />}
          />
          <Route
            path="/units/:id"
            element={
              <UnitsDetail stopLoading={() => ref.current!.complete()} />
            }
          />
        </Routes>

        <Box sx={{background: '#F2F6F8'}} pt={15} pl={15}>
          <Routes>
            <Route
              path="/my-units"
              element={<MyUnits stopLoading={() => ref.current!.complete()} />}
            />
          </Routes>
        </Box>
      </BrowserRouter>
    </Box>
  );
};
