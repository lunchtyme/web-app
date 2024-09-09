import React from 'react';
import HomePage from './components/pages/HomePage';
import OnboardingOptions from './components/onboarding/OnboardingOptions';
import EmployeeForm from './components/forms/EmployeeForm';
import CompanyForm from './components/forms/CompanyForm';
import AdminForm from './components/forms/AdminForm';
import { Routes, Route } from 'react-router-dom';
import SucessPage from './components/pages/SucessPage';
// import LogInPage from './components/LogInPage';
import CreateAccount from './components/Account/CreateAccount';
import LogInPage from './components/pages/LoginPage';
import VerifyOTP from './components/pages/VerifyOTP';
import AdminDashboard from './Admin/AdminDasboard';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/onboarding" element={<OnboardingOptions />} />
        <Route path="/signup" element={<CreateAccount />} />
        <Route path="/employee" element={<EmployeeForm />} />
        <Route path="/company" element={<CompanyForm />} />
        <Route path="/admin" element={<AdminForm />} />
        <Route path="/success" element={<SucessPage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/verify" element={<VerifyOTP />} />

        {/**Private route */}
        <Route path="/dashboard" element={<AdminDashboard />} />

        {/* <Route path="/login" element={<LogInPage />} /> */}
      </Routes>
    </>
  );
};

export default App;
