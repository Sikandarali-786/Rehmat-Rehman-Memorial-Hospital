import config from "../../src/config"

const apiURL = config.apiUrl;

// Token Generate API endpoint
export const Token = `${apiURL}/token`
export const TokenByMRID = `${apiURL}/token`
export const TokenSummary = `${apiURL}/token-summary`

// Login APi endpoint 
export const Login = `${apiURL}/login`

// Patient API endpoint 
export const AddPatient = `${apiURL}/addpatients`;
export const GetPatient = `${apiURL}/getpatients`;
export const HistoryPatient = `${apiURL}/getpatientshistory`;

// Appointment API endpoints 
export const AddAppointment = `${apiURL}/addappointment`
export const GetAppointmentList = `${apiURL}/getappointment`