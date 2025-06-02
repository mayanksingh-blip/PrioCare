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
  InputAdornment,
  OutlinedInput,
  Chip,
} from '@mui/material';

const all_symptoms = ['None','Headache', 'Chest pain', 'Fever', 'Nausea', 'Cough', 'Shortness of breath', 'Fatigue' ];
const all_medical_history = ['None', 'Asthma', 'Cancer', 'Diabetes', 'Hypertension', 'Heart Disease', 'Kidney Disease'];

const PatientAdmission = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Age: '',
    Gender: '',
    SystolicBP: '',
    DiastolicBP: '',
    Heart_Rate: '',
    Temperature: '',
    Oxygen_Saturation: '',
    Symptoms: [],
    Medical_History: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMultiSelectChange = (name) => (e) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      [name]: typeof value === 'string' ? value.split(',') : value,
    }));
  };

  const callEmergencyPredictionAPI = async (patientData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://upward-amazed-jawfish.ngrok-free.app/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patientData),
      });
      if (!response.ok) throw new Error('Prediction API error');
      const data = await response.json();
      navigate('/prediction-result', { state: { prediction: data, patientData } });
    } catch (err) {
      setError('Could not get prediction');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    callEmergencyPredictionAPI(formData);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f7fafd 60%, #e3e9f7 100%)',
        py: 8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={4}
          sx={{
            borderRadius: 4,
            p: { xs: 3, sm: 5 },
            boxShadow: '0 4px 32px 0 rgba(25, 118, 210, 0.08)',
          }}
        >
          <Typography
            variant="h4"
            align="center"
            sx={{ fontWeight: 'bold', mb: 1, color: 'primary.main', letterSpacing: 1 }}
          >
            Patient Admission
          </Typography>
          <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 4 }}>
            Enter patient details for emergency prediction
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid item xs={12} sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="Age"
                name="Age"
                type="number"
                value={formData.Age}
                onChange={handleInputChange}
                required
                InputProps={{
                  startAdornment: <InputAdornment position="start">Years</InputAdornment>,
                }}
              />
            </Grid>

            <Grid item xs={12} sx={{ mb: 2 }}>
              <FormControl fullWidth required>
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                  labelId="gender-label"
                  name="Gender"
                  value={formData.Gender}
                  label="Gender"
                  onChange={handleInputChange}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="Systolic BP"
                name="SystolicBP"
                type="number"
                value={formData.SystolicBP}
                onChange={handleInputChange}
                required
                InputProps={{ endAdornment: <InputAdornment position="end">mmHg</InputAdornment> }}
              />
            </Grid>

            <Grid item xs={12} sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="Diastolic BP"
                name="DiastolicBP"
                type="number"
                value={formData.DiastolicBP}
                onChange={handleInputChange}
                required
                InputProps={{ endAdornment: <InputAdornment position="end">mmHg</InputAdornment> }}
              />
            </Grid>

            <Grid item xs={12} sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="Heart Rate"
                name="Heart_Rate"
                type="number"
                value={formData.Heart_Rate}
                onChange={handleInputChange}
                required
                InputProps={{ endAdornment: <InputAdornment position="end">bpm</InputAdornment> }}
              />
            </Grid>

            <Grid item xs={12} sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="Temperature"
                name="Temperature"
                type="number"
                value={formData.Temperature}
                onChange={handleInputChange}
                required
                InputProps={{ endAdornment: <InputAdornment position="end">°F</InputAdornment> }}
              />
            </Grid>

            <Grid item xs={12} sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="Oxygen Saturation"
                name="Oxygen_Saturation"
                type="number"
                value={formData.Oxygen_Saturation}
                onChange={handleInputChange}
                required
                InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }}
              />
            </Grid>

            <Grid item xs={12} sx={{ mb: 2 }}>
              <FormControl fullWidth>
                <InputLabel id="symptoms-label">Symptoms</InputLabel>
                <Select
                  labelId="symptoms-label"
                  multiple
                  name="Symptoms"
                  value={formData.Symptoms}
                  onChange={handleMultiSelectChange('Symptoms')}
                  input={<OutlinedInput label="Symptoms" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                >
                  {all_symptoms.map((symptom) => (
                    <MenuItem key={symptom} value={symptom}>
                      {symptom}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sx={{ mb: 2 }}>
              <FormControl fullWidth>
                <InputLabel id="history-label">Medical History</InputLabel>
                <Select
                  labelId="history-label"
                  multiple
                  name="Medical_History"
                  value={formData.Medical_History}
                  onChange={handleMultiSelectChange('Medical_History')}
                  input={<OutlinedInput label="Medical History" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                >
                  {all_medical_history.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sx={{ mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                sx={{
                  borderRadius: 3,
                  fontWeight: 'bold',
                  boxShadow: 2,
                  py: 1.5,
                  fontSize: '1.1rem',
                  letterSpacing: 1,
                }}
                disabled={loading}
              >
                {loading ? 'Predicting...' : 'GET EMERGENCY PREDICTION'}
              </Button>
            </Grid>
          </form>
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default PatientAdmission;
