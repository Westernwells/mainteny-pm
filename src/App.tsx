import {useRef} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {LoadingBarRef} from 'react-top-loading-bar';
import {Login} from 'pages/Login';
import {MyUnits} from 'pages/Units';
import {UnitsDetail} from 'pages/UnitDetails';
import {PageLayout} from 'components/Layout';
import {Contracts} from 'pages/Contracts';
import {PasswordReset} from 'pages/PsswordReset';
import {Invoices} from 'pages/Invoices';
import {Loading} from 'components/Loading';
import {Notifications} from 'pages/Notifications';

interface LoadingProps extends LoadingBarRef {
  continuousStart: (startingValue?: number, refreshRate?: number) => void;
}

export const App = () => {
  const ref = useRef<LoadingProps>(null);

  return (
    <BrowserRouter basename="/pm">
      <Loading />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<PasswordReset />} />
        <Route
          path="/units"
          element={
            <PageLayout>
              <MyUnits />
            </PageLayout>
          }
        />
        <Route
          path="/units/:id"
          element={
            <PageLayout>
              <UnitsDetail />
            </PageLayout>
          }
        />

        <Route
          path="/contracts"
          element={
            <PageLayout>
              <Contracts />
            </PageLayout>
          }
        />

        <Route
          path="/invoices"
          element={
            <PageLayout>
              <Invoices />
            </PageLayout>
          }
        />

        <Route
          path="/notifications"
          element={
            <PageLayout excludeSidebar>
              <Notifications />
            </PageLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
