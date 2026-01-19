import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import OpenRoute from './routes/OpenRoute';
import ProtectedRoute from './routes/ProtectedRoute';
import AppointmentList from './pages/AppointmentList/AppointmentList';


const Layout = lazy(() => import('./components/layout/Layout'))
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'));
const PatientRegistration = lazy(() => import('./pages/PatientRegistration/PatientRegistration'));
const PatientData = lazy(() => import('./pages/PatientList/PatientData'));
const BookingAppointment = lazy(() => import('./pages/BookingAppointment/BookingAppointment'));
const PatientHistory = lazy(() => import('./pages/PatientRegistration/Components/PatientHistory'));
const Login = lazy(() => import('./pages/Auth/Login'));
const Register = lazy(() => import('./pages/Auth/Register'))
const TokenSummary = lazy(() => import('./pages/Token/TokenSummary'));

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={
        <OpenRoute>
          <Login />
        </OpenRoute>
      } />
      <Route path="/register" element={
        <OpenRoute>
          <Register />
        </OpenRoute>
      } />
      <Route path="/" element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }>
        <Route index element={<Dashboard />} />
        <Route path="patientregister" element={<PatientRegistration />} />
        <Route path="patientdata" element={<PatientData />} />
        <Route path="patients/:id" element={<PatientHistory />} />
        <Route path="bookingappointment" element={<BookingAppointment />} />
        <Route path="appointmentlist" element={<AppointmentList />} />
        <Route path="tokensummary" element={<TokenSummary />} />
      </Route>
    </Routes>
  );
}

export default App;