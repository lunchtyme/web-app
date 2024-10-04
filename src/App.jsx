import React from 'react';
import HomePage from './components/pages/HomePage';
import OnboardingOptions from './components/onboarding/OnboardingOptions';
import { HashRouter, Routes, Route } from 'react-router-dom';
import SucessPage from './components/pages/SucessPage';
// import LogInPage from './components/LogInPage';
import CreateAccount from './components/Account/CreateAccount';
import LogInPage from './components/pages/LoginPage';
import VerifyOTP from './components/pages/VerifyOTP';
import CompanyDashboard from './Company/CompanyDashboard';
import AdminDashboard from './Admin/AdminDashboard';
import EmployeeDashboard from './Employee/EmployeeDashboard';
import NotFound from './utils/NotFound';
import RequireAuth from './utils/RequireAuth';
import AdminOnboard from './AdminOnboard';
import Password from './components/forms/Password';
import Password2 from './components/forms/Password2';
import OnboardingEmployee from './components/onboarding/OnboardingEmployee';

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/onboarding" element={<OnboardingOptions />} />
        <Route path="/signup" element={<CreateAccount />} />
        <Route path="/success" element={<SucessPage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/verify" element={<VerifyOTP />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/reset" element={<Password />} />
        <Route path="/reset-password" element={<Password2 />} />
        <Route path="/onboarding2" element={<OnboardingEmployee />} />

        {/**Private route */}
        <Route
          path="/dashboard/*"
          element={
            <RequireAuth>
              <CompanyDashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/admin/*"
          element={
            <RequireAuth>
              <AdminDashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/worker/*"
          element={
            <RequireAuth>
              <EmployeeDashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/auth-onboard"
          element={
            <RequireAuth>
              <AdminOnboard />
            </RequireAuth>
          }
        />

        {/* <Route path="/login" element={<LogInPage />} /> */}

        {/**Indefind Routes */}
      </Routes>
    </HashRouter>
  );
};

export default App;
