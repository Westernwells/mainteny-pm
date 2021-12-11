import {useRef} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LoadingBar, {LoadingBarRef} from 'react-top-loading-bar';
import {AppTopBar} from './components/AppTopBar';
import {Login} from './pages/Login';
import {MyUnits} from './pages/my-units/MyUnits';

interface LoadingProps extends LoadingBarRef {
  continuousStart: (startingValue?: number, refreshRate?: number) => void;
}

export const App = () => {
  const ref = useRef<LoadingProps>(null);

  return (
    <>
      <LoadingBar color="#222B45" ref={ref} />
      <BrowserRouter basename="/pm">
        <AppTopBar startLoading={() => ref.current!.continuousStart()} />
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
        </Routes>
      </BrowserRouter>
    </>
  );
};
