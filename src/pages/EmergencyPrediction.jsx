import {
  Box,
  Container,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Alert,
  Chip,
} from '@mui/material';
import {
  Warning as WarningIcon,
  TrendingUp as TrendingUpIcon,
  LocalHospital as HospitalIcon,
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

const EmergencyPrediction = () => {
  // Mock data for the prediction chart
  const predictionData = {
    labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
    datasets: [
      {
        label: 'Emergency Rate Trend',
        data: [65, 70, 75, 80, 75, 70],
        borderColor: '#d32f2f',
        backgroundColor: 'rgba(211, 47, 47, 0.1)',
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
      },
      title: {
        display: true,
        text: 'Emergency Rate Prediction (24h)',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Emergency Rate (%)',
        },
      },
    },
  };

  const getRiskColor = (risk) => {
    switch (risk.toLowerCase()) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };

  const StatCard = ({ title, value, icon, color, subtitle }) => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box
            sx={{
              backgroundColor: `${color}15`,
              borderRadius: '50%',
              p: 1,
              mr: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {icon}
          </Box>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
        </Box>
        <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
          {value}
        </Typography>
        {subtitle && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {subtitle}
          </Typography>
        )}
      </CardContent>
    </Card>
  );

  // Mock prediction data - in real app, this would come from props or state management
  const prediction = {
    emergencyRate: 75,
    riskLevel: 'High',
    recommendedAction: 'Immediate attention required',
    confidence: 85,
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          Emergency Prediction Results
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Analysis based on patient's vital signs and medical history
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <StatCard
            title="Emergency Rate"
            value={`${prediction.emergencyRate}%`}
            icon={<WarningIcon sx={{ color: '#d32f2f' }} />}
            color="#d32f2f"
            subtitle="Based on current vital signs"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            title="Risk Level"
            value={prediction.riskLevel}
            icon={<TrendingUpIcon sx={{ color: '#ed6c02' }} />}
            color="#ed6c02"
            subtitle="Current assessment"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            title="Prediction Confidence"
            value={`${prediction.confidence}%`}
            icon={<HospitalIcon sx={{ color: '#2e7d32' }} />}
            color="#2e7d32"
            subtitle="Model accuracy"
          />
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Emergency Rate Prediction
            </Typography>
            <Box sx={{ height: 300 }}>
              <Line options={chartOptions} data={predictionData} />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Recommended Action
            </Typography>
            <Alert severity={getRiskColor(prediction.riskLevel)} sx={{ mb: 2 }}>
              {prediction.recommendedAction}
            </Alert>
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Risk Factors
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                <Chip label="High Blood Pressure" color="error" size="small" />
                <Chip label="Elevated Heart Rate" color="warning" size="small" />
                <Chip label="Low Oxygen" color="error" size="small" />
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EmergencyPrediction; 