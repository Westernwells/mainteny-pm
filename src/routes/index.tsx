import {PageLayout} from 'components/PageLayout';
import {Contracts} from 'pages/Contracts';
import {Invoices} from 'pages/Invoices';
import {InvoiceDetails} from 'pages/InvoiceDetails';
import {Login} from 'pages/Login';
import {Notifications} from 'pages/Notifications';
import {MySettings} from 'pages/MySettings';
import {PasswordReset} from 'pages/PasswordReset';
import {UnitsDetail} from 'pages/UnitDetails';
import {ContractDetails} from 'pages/ContractDetails';
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
          <PageLayout excludeDefaultSpacing overflowY>
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
        path="/contracts/:id"
        element={
          <PageLayout overflowY>
            <ContractDetails />
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
        path="/invoices/:id"
        element={
          <PageLayout overflowY>
            <InvoiceDetails />
          </PageLayout>
        }
      />

      <Route
        path="/notifications"
        element={
          <PageLayout excludeSidebar excludeDefaultSpacing overflowY>
            <Notifications />
          </PageLayout>
        }
      />
      <Route
        path="/settings"
        element={
          <PageLayout excludeSidebar excludeDefaultSpacing overflowY>
            <MySettings />
          </PageLayout>
        }
      />
    </Route>
  </Routes>
);
