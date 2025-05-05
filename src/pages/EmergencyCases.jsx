import { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Grid,
  TextField,
  InputAdornment,
  IconButton,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Card,
  CardContent,
  LinearProgress,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Warning as WarningIcon,
  LocalHospital as HospitalIcon,
  AccessTime as AccessTimeIcon,
} from '@mui/icons-material';

const EmergencyCases = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data - replace with actual API data
  const emergencyCases = [
    {
      id: 1,
      name: 'John Doe',
      age: 45,
      gender: 'Male',
      admissionTime: '2024-03-15 14:30',
      symptoms: 'Chest pain, shortness of breath',
      vitalSigns: {
        bloodPressure: '140/90',
        heartRate: '110',
        temperature: '38.5',
        oxygenSaturation: '92%',
      },
      priority: 'Critical',
      assignedDoctor: 'Dr. Smith',
      ward: 'Emergency',
      waitTime: '5m',
    },
    {
      id: 2,
      name: 'Sarah Wilson',
      age: 32,
      gender: 'Female',
      admissionTime: '2024-03-15 15:00',
      symptoms: 'Severe abdominal pain, vomiting',
      vitalSigns: {
        bloodPressure: '130/85',
        heartRate: '95',
        temperature: '37.8',
        oxygenSaturation: '96%',
      },
      priority: 'High',
      assignedDoctor: 'Dr. Johnson',
      ward: 'Emergency',
      waitTime: '10m',
    },
    {
      id: 3,
      name: 'Mike Brown',
      age: 28,
      gender: 'Male',
      admissionTime: '2024-03-15 15:15',
      symptoms: 'Head injury, confusion',
      vitalSigns: {
        bloodPressure: '145/95',
        heartRate: '105',
        temperature: '37.2',
        oxygenSaturation: '94%',
      },
      priority: 'Critical',
      assignedDoctor: 'Dr. Williams',
      ward: 'Emergency',
      waitTime: '2m',
    },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'critical':
        return 'error';
      case 'high':
        return 'warning';
      case 'medium':
        return 'info';
      default:
        return 'default';
    }
  };

  const StatCard = ({ title, value, icon, color }) => (
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
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          Emergency Cases
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Critical and high-priority patient cases requiring immediate attention
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <StatCard
            title="Critical Cases"
            value="5"
            icon={<WarningIcon sx={{ color: '#d32f2f' }} />}
            color="#d32f2f"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            title="Average Wait Time"
            value="8m"
            icon={<AccessTimeIcon sx={{ color: '#ed6c02' }} />}
            color="#ed6c02"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            title="Available Doctors"
            value="3"
            icon={<HospitalIcon sx={{ color: '#2e7d32' }} />}
            color="#2e7d32"
          />
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2, mb: 3 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  placeholder="Search emergency cases..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <IconButton>
                  <FilterListIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Admission Time</TableCell>
                  <TableCell>Symptoms</TableCell>
                  <TableCell>Vital Signs</TableCell>
                  <TableCell>Priority</TableCell>
                  <TableCell>Assigned Doctor</TableCell>
                  <TableCell>Wait Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {emergencyCases
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((patient) => (
                    <TableRow key={patient.id}>
                      <TableCell>{patient.id}</TableCell>
                      <TableCell>{patient.name}</TableCell>
                      <TableCell>{patient.age}</TableCell>
                      <TableCell>{patient.admissionTime}</TableCell>
                      <TableCell>{patient.symptoms}</TableCell>
                      <TableCell>
                        <Box>
                          <Typography variant="caption" display="block">
                            BP: {patient.vitalSigns.bloodPressure}
                          </Typography>
                          <Typography variant="caption" display="block">
                            HR: {patient.vitalSigns.heartRate}
                          </Typography>
                          <Typography variant="caption" display="block">
                            Temp: {patient.vitalSigns.temperature}°C
                          </Typography>
                          <Typography variant="caption" display="block">
                            O2: {patient.vitalSigns.oxygenSaturation}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={patient.priority}
                          color={getPriorityColor(patient.priority)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{patient.assignedDoctor}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography variant="body2" sx={{ mr: 1 }}>
                            {patient.waitTime}
                          </Typography>
                          <LinearProgress
                            variant="determinate"
                            value={70}
                            sx={{
                              width: 50,
                              height: 6,
                              borderRadius: 3,
                              backgroundColor: '#e0e0e0',
                              '& .MuiLinearProgress-bar': {
                                backgroundColor: getPriorityColor(patient.priority),
                              },
                            }}
                          />
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={emergencyCases.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EmergencyCases; 