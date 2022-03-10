import {Helmet} from 'react-helmet';
import {PageLayout} from 'components/PageLayout';
import {useUserSession} from 'hooks/reactQuery/useUserSession';
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

export const Router = () => {
  const titleTail = 'Property Manager Portal';
  const {user} = useUserSession();

  return (
    <Routes>
      <Route
        element={
          <>
            <Helmet>
              <title>{`Mainteny - ${titleTail}`}</title>
            </Helmet>
            <AuthRoutes />
          </>
        }
      >
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<PasswordReset />} />
      </Route>
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<Navigate to="/units" />} />
        <Route
          path="/units"
          element={
            <>
              <Helmet>
                <title>{`Units - ${titleTail}`}</title>
              </Helmet>
              <PageLayout>
                <MyUnits />
              </PageLayout>
            </>
          }
        />
        <Route
          path="/units/:id"
          element={
            <>
              <Helmet>
                <title>{`Unit Details - ${titleTail}`}</title>
              </Helmet>
              <PageLayout excludeDefaultSpacing overflowY>
                <UnitsDetail />
              </PageLayout>
            </>
          }
        />

        <Route
          path="/contracts"
          element={
            <>
              <Helmet>
                <title>{`Contracts - ${titleTail}`}</title>
              </Helmet>
              <PageLayout>
                <Contracts />
              </PageLayout>
            </>
          }
        />

        <Route
          path="/contracts/:id"
          element={
            <>
              <Helmet>
                <title>{`Contract Details - ${titleTail}`}</title>
              </Helmet>
              <PageLayout overflowY>
                <ContractDetails />
              </PageLayout>
            </>
          }
        />

        <Route
          path="/invoices"
          element={
            <>
              <Helmet>
                <title>{`Invoices - ${titleTail}`}</title>
              </Helmet>
              <PageLayout>
                <Invoices />
              </PageLayout>
            </>
          }
        />

        <Route
          path="/invoices/:id"
          element={
            <>
              <Helmet>
                <title>{`Invoice Details - ${titleTail}`}</title>
              </Helmet>
              <PageLayout overflowY>
                <InvoiceDetails />
              </PageLayout>
            </>
          }
        />

        <Route
          path="/notifications"
          element={
            <>
              <Helmet>
                <title>{`Notifications - ${titleTail}`}</title>
              </Helmet>
              <PageLayout excludeSidebar excludeDefaultSpacing overflowY>
                <Notifications />
              </PageLayout>
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <Helmet>
                <title>{`${user?.userAccount.firstName} ${user?.userAccount.lastName} - ${titleTail}`}</title>
              </Helmet>
              <PageLayout excludeSidebar excludeDefaultSpacing overflowY>
                <MySettings />
              </PageLayout>
            </>
          }
        />
      </Route>
    </Routes>
  );
};
