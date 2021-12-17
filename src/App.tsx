import {useRef} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LoadingBar, {LoadingBarRef} from 'react-top-loading-bar';
import {Login} from './pages/Login';
import {MyUnits} from './pages/Units';
import {UnitsDetail} from './pages/UnitDetails';
import {PageLayout} from './components/Layout';
import {Contracts} from './pages/Contracts';
import {PasswordReset} from './pages/PsswordReset';

interface LoadingProps extends LoadingBarRef {
  continuousStart: (startingValue?: number, refreshRate?: number) => void;
}

export const App = () => {
  const ref = useRef<LoadingProps>(null);

  return (
    <BrowserRouter basename="/pm">
      <LoadingBar color="#222B45" ref={ref} />
      <Routes>
        <Route
          path="/"
          element={
            <Login startPageLoad={() => ref.current!.continuousStart()} />
          }
        />
        <Route
          path="/login"
          element={
            <Login startPageLoad={() => ref.current!.continuousStart()} />
          }
        />
        <Route path="/reset-password" element={<PasswordReset />} />
        <Route
          path="/units"
          element={
            <PageLayout startPageLoad={() => ref.current!.continuousStart()}>
              <MyUnits stopLoading={() => ref.current!.complete()} />
            </PageLayout>
          }
        />
        <Route
          path="/units/:id"
          element={
            <PageLayout startPageLoad={() => ref.current!.continuousStart()}>
              <UnitsDetail stopLoading={() => ref.current!.complete()} />
            </PageLayout>
          }
        />

        <Route
          path="/contracts"
          element={
            <PageLayout startPageLoad={() => ref.current!.continuousStart()}>
              <Contracts stopLoading={() => ref.current!.complete()} />
            </PageLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
