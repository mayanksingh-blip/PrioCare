import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import PatientAdmission from './pages/PatientAdmission';
import PriorityQueue from './pages/PriorityQueue';
import TotalPatients from './pages/TotalPatients';
import EmergencyCases from './pages/EmergencyCases';
import DoctorsOnDuty from './pages/DoctorsOnDuty';
import EmergencyPrediction from './pages/EmergencyPrediction';
import Login from './pages/Login';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/*"
            element={
              <Layout>
                <Routes>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="admission" element={<PatientAdmission />} />
                  <Route path="queue" element={<PriorityQueue />} />
                  <Route path="patients" element={<TotalPatients />} />
                  <Route path="emergency" element={<EmergencyCases />} />
                  <Route path="doctors" element={<DoctorsOnDuty />} />
                  <Route path="emergency-prediction" element={<EmergencyPrediction />} />
                </Routes>
              </Layout>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
