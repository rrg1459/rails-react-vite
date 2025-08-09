// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ConfirmEmailPage from './pages/ConfirmEmailPage';
import ForgotPasswordForm from './signs/ForgotPasswordForm';
import ResetPasswordForm from './signs/ResetPasswordForm';

function App() {
  return (
    // El Router ya no está aquí, solo las Routes
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<HomePage />} />
      <Route path="/confirm-email" element={<ConfirmEmailPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordForm />} />
      <Route path="/reset-password" element={<ResetPasswordForm />} />
    </Routes>
  );
}

export default App;