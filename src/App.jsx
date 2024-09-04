import React from 'react';
import HomePage from './components/HomePage';
import OnboardingOptions from './components/OnboardingOptions';
import EmployeeForm from './components/EmployeeForm';
import CompanyForm from './components/CompanyForm';
import AdminForm from './components/AdminForm';
import { Routes, Route } from 'react-router-dom';
import SucessPage from './components/SucessPage';
// import LogInPage from './components/LogInPage';
import CreateAccount from './components/CreateAccount';
import LogInPage from './components/LoginPage';
import VerifyOTP from './components/verifyOTP';
import MainDashboard from './Admin/MainDashboard';



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
        <Route path="/dashboard" element={<MainDashboard />} />

        {/* <Route path="/login" element={<LogInPage />} /> */}
      </Routes>
    </>
  );
};

export default App;
