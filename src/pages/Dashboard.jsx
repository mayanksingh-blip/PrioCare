import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Paper, Typography, Box, Container, Divider, Modal, IconButton } from '@mui/material';
import {
  People as PeopleIcon,
  LocalHospital as LocalHospitalIcon,
  Timer as TimerIcon,
  Warning as WarningIcon,
  TrendingUp as TrendingUpIcon,
  AccessTime as AccessTimeIcon,
  Close as CloseIcon,
  Hotel as HotelIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const BedStatusModal = ({ open, onClose, beds }) => {
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxWidth: 800,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    maxHeight: '80vh',
    overflow: 'auto',
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="bed-status-modal"
    >
      <Box sx={modalStyle}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" component="h2">
            Bed Status Overview
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
        <Grid container spacing={2}>
          {beds.map((bed) => (
            <Grid item xs={6} sm={4} md={3} key={bed.id}>
              <Paper
                elevation={2}
                sx={{
                  p: 2,
                  textAlign: 'center',
                  bgcolor: bed.status === 'vacant' ? '#e8f5e9' : '#ffebee',
                  border: '1px solid',
                  borderColor: bed.status === 'vacant' ? '#81c784' : '#e57373',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    transition: 'transform 0.2s',
                  },
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Bed {bed.id}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: bed.status === 'vacant' ? '#2e7d32' : '#c62828',
                    fontWeight: 'bold',
                  }}
                >
                  {bed.status === 'vacant' ? 'Available' : 'Occupied'}
                </Typography>
                {bed.patient && (
                  <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                    Patient: {bed.patient}
                  </Typography>
                )}
                {bed.ward && (
                  <Typography variant="caption" display="block">
                    Ward: {bed.ward}
                  </Typography>
                )}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Modal>
  );
};

const StatCard = ({ title, value, icon, color, subtitle, onClick }) => (
  <Paper
    elevation={3}
    onClick={onClick}
    sx={{
      p: 3,
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`,
      color: 'white',
      transition: 'transform 0.2s',
      cursor: onClick ? 'pointer' : 'default',
      '&:hover': {
        transform: 'translateY(-5px)',
      },
    }}
  >
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <Box>
        <Typography component="h2" variant="h6" gutterBottom sx={{ opacity: 0.9 }}>
          {title}
        </Typography>
        <Typography component="p" variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
          {value}
        </Typography>
        {subtitle && (
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            {subtitle}
          </Typography>
        )}
      </Box>
      <Box
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '50%',
          p: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {icon}
      </Box>
    </Box>
  </Paper>
);

const Dashboard = () => {
  const navigate = useNavigate();
  const [openBedModal, setOpenBedModal] = useState(false);
  
  // Mock bed data
  const beds = [
    { id: 1, status: 'vacant', ward: 'General' },
    { id: 2, status: 'occupied', patient: 'John Doe', ward: 'ICU' },
    { id: 3, status: 'vacant', ward: 'General' },
    { id: 4, status: 'occupied', patient: 'Jane Smith', ward: 'Emergency' },
    { id: 5, status: 'vacant', ward: 'General' },
    { id: 6, status: 'occupied', patient: 'Mike Johnson', ward: 'ICU' },
    { id: 7, status: 'vacant', ward: 'General' },
    { id: 8, status: 'occupied', patient: 'Sarah Wilson', ward: 'Emergency' },
    { id: 9, status: 'vacant', ward: 'General' },
    { id: 10, status: 'occupied', patient: 'David Brown', ward: 'ICU' },
    { id: 11, status: 'vacant', ward: 'General' },
    { id: 12, status: 'vacant', ward: 'General' },
  ];

  const chartData = {
    labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
    datasets: [
      {
        label: 'Emergency Cases',
        data: [12, 19, 15, 25, 22, 30],
        borderColor: '#d32f2f',
        backgroundColor: 'rgba(211, 47, 47, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Regular Cases',
        data: [8, 12, 10, 15, 18, 20],
        borderColor: '#1976d2',
        backgroundColor: 'rgba(25, 118, 210, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
      title: {
        display: true,
        text: 'Patient Admissions (24h)',
        font: {
          size: 16,
          weight: 'bold',
        },
        padding: 20,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Box
          sx={{
            display: 'inline-block',
            px: 3,
            py: 1.5,
            background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)',
            borderRadius: 4,
            boxShadow: '0 4px 24px 0 rgba(25, 118, 210, 0.10)',
            mb: 2,
            mt: 2,
            color: 'white',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              letterSpacing: 1,
              textShadow: '0 2px 8px rgba(25, 118, 210, 0.18)',
              mb: 0,
            }}
          >
            Welcome to PrioCare Hospital Management System
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <StatCard
            title="Total Patients"
            value="150"
            icon={<PeopleIcon sx={{ color: '#1976d2' }} />}
            color="#1976d2"
            onClick={() => navigate('/patients')}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            title="Emergency Cases"
            value="8"
            icon={<LocalHospitalIcon sx={{ color: '#d32f2f' }} />}
            color="#d32f2f"
            onClick={() => navigate('/emergency')}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            title="Available Beds"
            value="25"
            icon={<HotelIcon sx={{ color: '#2e7d32' }} />}
            color="#2e7d32"
            onClick={() => setOpenBedModal(true)}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            title="Doctors On Duty"
            value="12"
            icon={<PersonIcon sx={{ color: '#ed6c02' }} />}
            color="#ed6c02"
            onClick={() => navigate('/doctors')}
          />
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                Patient Admissions Trend
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Last 24 hours admission statistics
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <Line options={chartOptions} data={chartData} />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant="h6" gutterBottom>
              Quick Stats
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <TrendingUpIcon color="success" sx={{ mr: 1 }} />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Admission Rate
                </Typography>
                <Typography variant="h6">+8.2%</Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <AccessTimeIcon color="warning" sx={{ mr: 1 }} />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Peak Hours
                </Typography>
                <Typography variant="h6">14:00 - 16:00</Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <HotelIcon color="info" sx={{ mr: 1 }} />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  ICU Capacity
                </Typography>
                <Typography variant="h6">65%</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <BedStatusModal
        open={openBedModal}
        onClose={() => setOpenBedModal(false)}
        beds={beds}
      />
    </Container>
  );
};

export default Dashboard; 