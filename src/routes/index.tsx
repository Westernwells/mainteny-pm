import {useEffect} from 'react';
import {Helmet} from 'react-helmet';
import {useTranslation} from 'react-i18next';
import {onVisibilityChange} from 'utils/utils';
import {Mixpanel} from 'mixpanel/mixpanel';
import {mixpanelEvents} from 'mixpanel/constants';
import {PageLayout} from 'components/PageLayout';
import ErrorBoundary from 'components/ErrorBoundary';
import {Login} from 'pages/Login';
import {ResetPassword} from 'pages/ResetPassword';
import {Contracts} from 'pages/Contracts';
import {Invoices} from 'pages/Invoices';
import {InvoiceDetails} from 'pages/InvoiceDetails';
import {Notifications} from 'pages/Notifications';
import {MySettings} from 'pages/MySettings';
import {ContractDetails} from 'pages/ContractDetails';
import {MyUnits} from 'pages/Units';
import {UnitDetails} from 'pages/UnitDetails';
import {ReportIssue} from 'pages/ReportIssue';
import {NotFound} from 'pages/NotFound';
import {ProtectedRoutes} from 'routes/ProtectedRoutes';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import {useUserSession} from 'hooks/reactQuery/useUserSession';
import {AuthRoutes} from './AuthRoutes';

export const Router = () => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const titleTail = 'Property Manager Portal';
  const {user} = useUserSession();
  const fullName = `${user?.userAccount.firstName} ${user?.userAccount.lastName}`;

  useEffect(() => {
    onVisibilityChange((visible) => {
      if (visible) {
        Mixpanel.timeEvent(mixpanelEvents.ACTIVE_SESSION);
      } else {
        Mixpanel.identifyAndTrack(mixpanelEvents.ACTIVE_SESSION);
      }
    });
  }, []);

  return (
    <ErrorBoundary navigate={navigate} location={location}>
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
                <PageLayout
                  pageScrollable
                  showBackAction
                  backBtnLabel={`${t('Unit Details')}`}>
                  <UnitDetails />
                </PageLayout>
              </>
            }
          />
          <Route
            path="/units/report-issue"
            element={
              <>
                <Helmet>
                  <title>{`Report Issue - ${titleTail}`}</title>
                </Helmet>
                <PageLayout backBtnLabel="Report Issue" showBackAction>
                  <ReportIssue />
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
                <PageLayout pageTitle="Invoices">
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
                <PageLayout
                  pageScrollable
                  showBackAction
                  backBtnLabel="Invoice Details">
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
    </ErrorBoundary>
  );
};
