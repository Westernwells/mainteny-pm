import {PageLayout} from 'components/PageLayout';
import {Contracts} from 'pages/Contracts';
import {Invoices} from 'pages/Invoices';
import {InvoiceDetails} from 'pages/InvoiceDetails';
import {Login} from 'pages/Login';
import {
  PasswordAuthenticate,
  PasswordRequest,
  PasswordReset,
} from 'pages/PasswordReset';
import {Notifications} from 'pages/Notifications';
import {MySettings} from 'pages/MySettings';
import {UnitsDetail} from 'pages/UnitDetails';
import {ContractDetails} from 'pages/ContractDetails';
import {MyUnits} from 'pages/Units';
import {NotFound} from 'pages/NotFound';
import {ProtectedRoutes} from 'routes/ProtectedRoutes';
import {Navigate, Route, Routes} from 'react-router-dom';
import {AuthRoutes} from './AuthRoutes';

export const Router = () => (
  <Routes>
    <Route element={<AuthRoutes />}>
      <Route path="/login" element={<Login />} />
      <Route
        path="/reset-password"
        element={<Navigate to="/reset-password/request" />}
      />
      <Route path="/reset-password/request" element={<PasswordRequest />} />
      <Route
        path="/reset-password/authenticate"
        element={<PasswordAuthenticate />}
      />
      <Route path="/reset-password/reset" element={<PasswordReset />} />
    </Route>
    <Route element={<ProtectedRoutes />}>
      <Route
        path="/"
        element={<Navigate to="/units?pageIndex=1&pageSize=25" />}
      />
      <Route
        path="/units"
        element={
          <PageLayout>
            <MyUnits />
          </PageLayout>
        }
      />
      <Route
        path="/units/details/:id"
        element={
          <PageLayout excludeDefaultSpacing pageScrollable>
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
        path="/contracts/details/:id"
        element={
          <PageLayout pageScrollable>
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
        path="/invoices/details/:id"
        element={
          <PageLayout pageScrollable>
            <InvoiceDetails />
          </PageLayout>
        }
      />

      <Route
        path="/notifications"
        element={
          <PageLayout excludeSidebar excludeDefaultSpacing pageScrollable>
            <Notifications />
          </PageLayout>
        }
      />

      <Route
        path="/settings"
        element={
          <PageLayout excludeSidebar excludeDefaultSpacing pageScrollable>
            <MySettings />
          </PageLayout>
        }
      />
    </Route>

    <Route path="*" element={<NotFound />} />
  </Routes>
);
