import {PageLayout} from 'components/Layout';
import {Contracts} from 'pages/Contracts';
import {Invoices} from 'pages/Invoices';
import {Login} from 'pages/Login';
import {Notifications} from 'pages/Notifications';
import {PasswordReset} from 'pages/PsswordReset';
import {UnitsDetail} from 'pages/UnitDetails';
import {MyUnits} from 'pages/Units';
import {ProtectedRoutes} from 'routes/ProtectedRoutes';
import {Navigate, Route, Routes} from 'react-router-dom';
import {AuthRoutes} from './AuthRoutes';

export const Router = () => (
  <Routes>
    <Route element={<AuthRoutes />}>
      <Route path="/login" element={<Login />} />
      <Route path="/reset-password" element={<PasswordReset />} />
    </Route>
    <Route element={<ProtectedRoutes />}>
      <Route path="/" element={<Navigate to="/units" />} />
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
    </Route>
  </Routes>
);
