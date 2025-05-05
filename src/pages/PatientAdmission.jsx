import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  Alert,
  Divider,
  Collapse,
} from '@mui/material';
import {
  Warning as WarningIcon,
  TrendingUp as TrendingUpIcon,
  LocalHospital as HospitalIcon,
  AccessTime as AccessTimeIcon,
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

const PatientAdmission = () => {
  const navigate = useNavigate();
  const [showAssessment, setShowAssessment] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    symptoms: '',
    vitalSigns: {
      bloodPressure: '',
      heartRate: '',
      temperature: '',
      oxygenSaturation: '',
    },
    medicalHistory: '',
    allergies: '',
  });

  const [prediction, setPrediction] = useState({
    emergencyRate: 75,
    riskLevel: 'High',
    recommendedAction: 'Immediate attention required',
    confidence: 85,
  });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    // For now, we'll just navigate to the prediction page
    navigate('/emergency-prediction');
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

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          Patient Admission
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Emergency rate prediction and risk assessment system
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Patient Information
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Patient Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Age"
                    name="age"
                    type="number"
                    value={formData.age}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth required>
                    <InputLabel>Gender</InputLabel>
                    <Select
                      name="gender"
                      value={formData.gender}
                      label="Gender"
                      onChange={handleInputChange}
                    >
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Symptoms"
                    name="symptoms"
                    multiline
                    rows={2}
                    value={formData.symptoms}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>
                    Vital Signs
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={3}>
                      <TextField
                        fullWidth
                        label="Blood Pressure"
                        name="vitalSigns.bloodPressure"
                        value={formData.vitalSigns.bloodPressure}
                        onChange={handleInputChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <TextField
                        fullWidth
                        label="Heart Rate"
                        name="vitalSigns.heartRate"
                        value={formData.vitalSigns.heartRate}
                        onChange={handleInputChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <TextField
                        fullWidth
                        label="Temperature"
                        name="vitalSigns.temperature"
                        value={formData.vitalSigns.temperature}
                        onChange={handleInputChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <TextField
                        fullWidth
                        label="Oxygen Saturation"
                        name="vitalSigns.oxygenSaturation"
                        value={formData.vitalSigns.oxygenSaturation}
                        onChange={handleInputChange}
                        required
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Medical History"
                    name="medicalHistory"
                    multiline
                    rows={2}
                    value={formData.medicalHistory}
                    onChange={handleInputChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Allergies"
                    name="allergies"
                    value={formData.allergies}
                    onChange={handleInputChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                  >
                    Get Emergency Assessment
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>

        <Collapse in={showAssessment} timeout="auto" unmountOnExit>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2 }}>
              Assessment Results
            </Typography>
          </Grid>

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
        </Collapse>
      </Grid>
    </Container>
  );
};

export default PatientAdmission; 