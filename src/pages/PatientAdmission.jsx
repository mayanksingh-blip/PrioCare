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
} from '@mui/material';

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
    Symptoms: '',
    Medical_History: '',
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
          <form onSubmit={handleSubmit} >
            {/* <Grid container spacing={2} justifyContent="center"> */}
              {/* AGE */}
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

              {/* GENDER */}
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
                <TextField
                  fullWidth
                  label="Symptoms (comma separated)"
                  name="Symptoms"
                  value={formData.Symptoms}
                  onChange={handleInputChange}
                  helperText="Leave blank if none."
                />
              </Grid>

               <Grid item xs={12} sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  label="Medical History (comma separated)"
                  name="Medical_History"
                  value={formData.Medical_History}
                  onChange={handleInputChange}
                  helperText="Leave blank if none."
                />
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
            {/* </Grid> */}
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

// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Box,
//   Container,
//   Paper,
//   Typography,
//   Grid,
//   TextField,
//   Button,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   InputAdornment,
//   Divider,
// } from '@mui/material';

// const PatientAdmission = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     Age: '',
//     Gender: '',
//     SystolicBP: '',
//     DiastolicBP: '',
//     Heart_Rate: '',
//     Temperature: '',
//     Oxygen_Saturation: '',
//     Symptoms: '',
//     Medical_History: '',
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const callEmergencyPredictionAPI = async (patientData) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await fetch('https://upward-amazed-jawfish.ngrok-free.app/predict', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(patientData),
//       });
//       if (!response.ok) throw new Error('Prediction API error');
//       const data = await response.json();
//       navigate('/prediction-result', { state: { prediction: data, patientData } });
//     } catch (err) {
//       setError('Could not get prediction');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     callEmergencyPredictionAPI(formData);
//   };

//   return (
//     <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f7fafd 60%, #e3e9f7 100%)', py: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//       <Container maxWidth="sm" sx={{ px: { xs: 0, sm: 2 } }}>
//         <Paper elevation={4} sx={{ borderRadius: 4, p: { xs: 2, sm: 5 }, boxShadow: '0 4px 32px 0 rgba(25, 118, 210, 0.08)' }}>
//           <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', mb: 1, color: 'primary.main', letterSpacing: 1 }}>
//             Patient Admission
//           </Typography>
//           <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 4 }}>
//             Enter patient details for emergency prediction
//           </Typography>
//           <form onSubmit={handleSubmit}>
//             <Grid container spacing={2}>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Age"
//                   name="Age"
//                   type="number"
//                   value={formData.Age}
//                   onChange={handleInputChange}
//                   required
//                   InputProps={{ startAdornment: <InputAdornment position="start">Years</InputAdornment> }}
//                 />

//               </Grid>
//               {/* <Grid item xs={12} sm={6}>
//                 <FormControl fullWidth required>
//                   <InputLabel>Gender</InputLabel>
//                   <Select
//                     name="Gender"
//                     value={formData.Gender}
//                     label="Gender"
//                     onChange={handleInputChange}
//                     fullWidth
//                   >
//                     <MenuItem value="Male">Male</MenuItem>
//                     <MenuItem value="Female">Female</MenuItem>
//                     <MenuItem value="Other">Other</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Grid> */}
//               <Grid item xs={12} sm={6}>
//                <InputLabel>Gender</InputLabel>
//                   <Select
//                     name="Gender"
//                     value={formData.Gender}
//                     label="Gender"
//                     onChange={handleInputChange}
//                     fullWidth
//                   >
//                     <MenuItem value="Male">Male</MenuItem>
//                     <MenuItem value="Female">Female</MenuItem>
//                     <MenuItem value="Other">Other</MenuItem>
//                   </Select>
//                 <TextField
//                   fullWidth
//                   label="Systolic BP"
//                   name="SystolicBP"
//                   type="number"
//                   value={formData.SystolicBP}
//                   onChange={handleInputChange}
//                   required
//                   InputProps={{ endAdornment: <InputAdornment position="end">mmHg</InputAdornment> }}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Diastolic BP"
//                   name="DiastolicBP"
//                   type="number"
//                   value={formData.DiastolicBP}
//                   onChange={handleInputChange}
//                   required
//                   InputProps={{ endAdornment: <InputAdornment position="end">mmHg</InputAdornment> }}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Heart Rate"
//                   name="Heart_Rate"
//                   type="number"
//                   value={formData.Heart_Rate}
//                   onChange={handleInputChange}
//                   required
//                   InputProps={{ endAdornment: <InputAdornment position="end">bpm</InputAdornment> }}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Temperature"
//                   name="Temperature"
//                   type="number"
//                   value={formData.Temperature}
//                   onChange={handleInputChange}
//                   required
//                   InputProps={{ endAdornment: <InputAdornment position="end">°F</InputAdornment> }}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Oxygen Saturation"
//                   name="Oxygen_Saturation"
//                   type="number"
//                   value={formData.Oxygen_Saturation}
//                   onChange={handleInputChange}
//                   required
//                   InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Symptoms (comma separated)"
//                   name="Symptoms"
//                   value={formData.Symptoms}
//                   onChange={handleInputChange}
//                   helperText="Leave blank if none."
//                 />
//               </Grid>
//                <Grid item xs={12} sx={{ mb: 2 }}>
//                 <TextField
//                   fullWidth
//                   label="Medical History (comma separated)"
//                   name="Medical_History"
//                   value={formData.Medical_History}
//                   onChange={handleInputChange}
//                   helperText="Leave blank if none."
//                 />
//               </Grid>
//               <Grid item xs={12} sx={{ mt: 2 }}>
//                 <Button
//                   type="submit"
//                   variant="contained"
//                   color="primary"
//                   size="large"
//                   fullWidth
//                   sx={{ borderRadius: 3, fontWeight: 'bold', boxShadow: 2, py: 1.5, fontSize: '1.1rem', letterSpacing: 1 }}
//                   disabled={loading}
//                 >
//                   {loading ? 'Predicting...' : 'GET EMERGENCY PREDICTION'}
//                 </Button>
//               </Grid>
//             </Grid>
//           </form>
//           {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
//         </Paper>
//       </Container>
//     </Box>
//   );
// };

// export default PatientAdmission; 