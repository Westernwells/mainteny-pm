import {Helmet} from 'react-helmet';
import {PageLayout} from 'components/PageLayout';
import {Login} from 'pages/Login';
import {ResetPassword} from 'pages/ResetPassword';
import {Contracts} from 'pages/Contracts';
import {Invoices} from 'pages/Invoices';
import {InvoiceDetails} from 'pages/InvoiceDetails';
import {Notifications} from 'pages/Notifications';
import {MySettings} from 'pages/MySettings';
import {ContractDetails} from 'pages/ContractDetails';
import {MyUnits} from 'pages/Units';
import {NotFound} from 'pages/NotFound';
import {ProtectedRoutes} from 'routes/ProtectedRoutes';
import {Navigate, Route, Routes} from 'react-router-dom';
import {useUserSession} from 'hooks/reactQuery/useUserSession';
import {AuthRoutes} from './AuthRoutes';

export const Router = () => {
  const titleTail = 'Property Manager Portal';
  const {user} = useUserSession();
  const fullName = `${user?.userAccount.firstName} ${user?.userAccount.lastName}`;

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
        }>
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>
      <Route element={<ProtectedRoutes />}>
        <Route
          path="/"
          element={<Navigate to="/units?pageIndex=1&pageSize=25" />}
        />
        <Route
          path="/units"
          element={
            <>
              <Helmet>
                <title>{`Units - ${titleTail}`}</title>
              </Helmet>
              <PageLayout pageTitle="Units">
                <MyUnits />
              </PageLayout>
            </>
          }
        />
        <Route
          path="/units/details/:id"
          element={
            <>
              <Helmet>
                <title>{`Unit Details - ${titleTail}`}</title>
              </Helmet>
              <PageLayout pageScrollable>{null}</PageLayout>
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
              <PageLayout pageTitle="Contracts">
                <Contracts />
              </PageLayout>
            </>
          }
        />

        <Route
          path="/contracts/details/:id"
          element={
            <>
              <Helmet>
                <title>{`Contract Details - ${titleTail}`}</title>
              </Helmet>
              <PageLayout
                pageTitle="Contract Details"
                showBackAction
                pageScrollable>
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
          path="/invoices/details/:id"
          element={
            <>
              <Helmet>
                <title>{`Invoice Details - ${titleTail}`}</title>
              </Helmet>
              <PageLayout pageScrollable>
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
              <PageLayout excludeSidebar pageScrollable excludeDefaultSpacing>
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
                <title>{`${fullName} - ${titleTail}`}</title>
              </Helmet>
              <PageLayout excludeSidebar excludeDefaultSpacing pageScrollable>
                <MySettings />
              </PageLayout>
            </>
          }
        />
      </Route>

      <Route
        path="*"
        element={
          <>
            <Helmet>
              <title>{`Page not found - ${titleTail}`}</title>
            </Helmet>
            <PageLayout excludeSidebar excludeDefaultSpacing pageScrollable>
              <NotFound />
            </PageLayout>
          </>
        }
      />
    </Routes>
  );
};
