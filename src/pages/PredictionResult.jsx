import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  Typography,
  Grid,
  Button,
  Divider,
  Chip,
  Stack,
} from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BlockIcon from '@mui/icons-material/Block';

const PredictionResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { prediction, patientData } = location.state || {};

  if (!prediction) {
    return (
      <Box sx={{ minHeight: '100vh', background: '#f7fafd', py: 6 }}>
        <Container maxWidth="md">
          <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h5" color="error" gutterBottom>
              No Prediction Data Available
            </Typography>
            <Button
              variant="contained"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate('/admission')}
              sx={{ mt: 2 }}
            >
              Back to Admission Form
            </Button>
          </Paper>
        </Container>
      </Box>
    );
  }

  const isEmergency = prediction.random_forest_prediction === 'emergency' || prediction.logistic_regression_prediction === 'emergency';
  const modelsAgree = prediction.random_forest_prediction === prediction.logistic_regression_prediction;

  const getPredictionLabel = (value) => {
    if (value === "emergency" || value === 1) return "Emergency Admission Required";
    if (value === "no_emergency" || value === 0) return "No Admission in Emergency";
    if (value === "no_admission" || value === -1) return "No Admission at All";
    return "Unknown";
  };

  const getPredictionColor = (value) => {
    if (value === "emergency" || value === 1) return "error";
    if (value === "no_emergency" || value === 0) return "warning";
    if (value === "no_admission" || value === -1) return "success";
    return "default";
  };

  const getPredictionIcon = (value) => {
    if (value === "emergency" || value === 1) return <WarningIcon />;
    if (value === "no_emergency" || value === 0) return <BlockIcon />;
    if (value === "no_admission" || value === -1) return <CheckCircleIcon />;
    return null;
  };

  return (
    <Box sx={{ minHeight: '100vh', background: '#f7fafd', py: 6 }}>
      <Container maxWidth="sm">
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/admission')}
          sx={{ mb: 3, fontWeight: 'bold', color: 'primary.main' }}
        >
          Back to Admission Form
        </Button>
        <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 4, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
            Emergency Prediction Results
          </Typography>
          <Chip
            icon={isEmergency ? <WarningIcon /> : <CheckCircleIcon />}
            label={isEmergency ? "Emergency Admission Required" : "No Emergency Admission Required"}
            color={isEmergency ? "error" : "success"}
            sx={{
              fontSize: '1.1rem',
              py: 2,
              px: 1,
              my: 2,
              width: '100%',
              maxWidth: 400,
              mx: 'auto',
              display: 'flex',
              whiteSpace: 'normal',
              justifyContent: 'center'
            }}
          />
          <Divider sx={{ my: 3 }} />
          <Paper elevation={0} sx={{ p: 2, background: '#f8f9fa', borderRadius: 2, mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Patient Information
            </Typography>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={6} sm={4}>
                <Typography variant="body2" color="text.secondary">Age</Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>{patientData.Age} years</Typography>
              </Grid>
              <Grid item xs={6} sm={4}>
                <Typography variant="body2" color="text.secondary">Gender</Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>{patientData.Gender}</Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="body2" color="text.secondary">Blood Pressure</Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>{patientData.SystolicBP}/{patientData.DiastolicBP} mmHg</Typography>
              </Grid>
              <Grid item xs={6} sm={4}>
                <Typography variant="body2" color="text.secondary">Heart Rate</Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>{patientData.Heart_Rate} bpm</Typography>
              </Grid>
              <Grid item xs={6} sm={4}>
                <Typography variant="body2" color="text.secondary">Temperature</Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>{patientData.Temperature}°C</Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="body2" color="text.secondary">Oxygen Saturation</Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>{patientData.Oxygen_Saturation}%</Typography>
              </Grid>
            </Grid>
          </Paper>
          <Grid container spacing={2} sx={{ mb: 2 }} justifyContent="center">
            <Grid item xs={12} md={8} lg={7}>
              <Paper elevation={0} sx={{ p: 2, background: '#f8f9fa', borderRadius: 2, height: '100%' }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Model Predictions
                </Typography>
                <Stack spacing={2} alignItems="center">
                  <Chip
                    icon={getPredictionIcon(prediction.random_forest_prediction)}
                    label={getPredictionLabel(prediction.random_forest_prediction)}
                    color={getPredictionColor(prediction.random_forest_prediction)}
                    sx={{ fontSize: '1rem', py: 1, px: 1, minWidth: 220 }}
                  />
                  <Chip
                    icon={getPredictionIcon(prediction.logistic_regression_prediction)}
                    label={getPredictionLabel(prediction.logistic_regression_prediction)}
                    color={getPredictionColor(prediction.logistic_regression_prediction)}
                    sx={{ fontSize: '1rem', py: 1, px: 1, minWidth: 220 }}
                  />
                </Stack>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle1" color={modelsAgree ? "success.main" : "warning.main"}>
                  {modelsAgree
                    ? "Both models agree on the prediction"
                    : "Models have different predictions"}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={8} lg={7}>
              <Paper elevation={0} sx={{ p: 2, background: '#f8f9fa', borderRadius: 2, height: '100%', mt: 2 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Additional Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary">Symptoms</Typography>
                    <Typography variant="body1">
                      {patientData.Symptoms || "None reported"}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary">Medical History</Typography>
                    <Typography variant="body1">
                      {patientData.Medical_History || "None reported"}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default PredictionResult; 
