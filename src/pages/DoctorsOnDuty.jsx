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
  Avatar,
  LinearProgress,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Person as PersonIcon,
  LocalHospital as HospitalIcon,
  AccessTime as AccessTimeIcon,
  Star as StarIcon,
} from '@mui/icons-material';

const DoctorsOnDuty = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data - replace with actual API data
  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Emergency Medicine',
      experience: '15 years',
      currentPatients: 3,
      maxPatients: 5,
      status: 'Available',
      rating: 4.8,
      avatar: 'SJ',
      department: 'Emergency',
      shift: 'Day',
      lastBreak: '2 hours ago',
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'Cardiology',
      experience: '12 years',
      currentPatients: 4,
      maxPatients: 4,
      status: 'Busy',
      rating: 4.9,
      avatar: 'MC',
      department: 'Cardiology',
      shift: 'Day',
      lastBreak: '1 hour ago',
    },
    {
      id: 3,
      name: 'Dr. Emily Williams',
      specialty: 'Pediatrics',
      experience: '8 years',
      currentPatients: 2,
      maxPatients: 6,
      status: 'Available',
      rating: 4.7,
      avatar: 'EW',
      department: 'Pediatrics',
      shift: 'Night',
      lastBreak: '3 hours ago',
    },
    {
      id: 4,
      name: 'Dr. Robert Brown',
      specialty: 'Neurology',
      experience: '20 years',
      currentPatients: 5,
      maxPatients: 5,
      status: 'Busy',
      rating: 4.9,
      avatar: 'RB',
      department: 'Neurology',
      shift: 'Day',
      lastBreak: '4 hours ago',
    },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'available':
        return 'success';
      case 'busy':
        return 'warning';
      case 'off-duty':
        return 'error';
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
          Doctors On Duty
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Current status and information about doctors working in the hospital
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <StatCard
            title="Total Doctors"
            value="12"
            icon={<PersonIcon sx={{ color: '#1976d2' }} />}
            color="#1976d2"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            title="Available Now"
            value="5"
            icon={<HospitalIcon sx={{ color: '#2e7d32' }} />}
            color="#2e7d32"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            title="Average Rating"
            value="4.8"
            icon={<StarIcon sx={{ color: '#ed6c02' }} />}
            color="#ed6c02"
          />
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2, mb: 3 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  placeholder="Search doctors..."
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
                  <TableCell>Doctor</TableCell>
                  <TableCell>Specialty</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Experience</TableCell>
                  <TableCell>Current Patients</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Shift</TableCell>
                  <TableCell>Last Break</TableCell>
                  <TableCell>Rating</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {doctors
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((doctor) => (
                    <TableRow key={doctor.id}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar
                            sx={{
                              bgcolor: '#1976d2',
                              mr: 2,
                            }}
                          >
                            {doctor.avatar}
                          </Avatar>
                          <Typography variant="body2">{doctor.name}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{doctor.specialty}</TableCell>
                      <TableCell>{doctor.department}</TableCell>
                      <TableCell>{doctor.experience}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography variant="body2" sx={{ mr: 1 }}>
                            {doctor.currentPatients}/{doctor.maxPatients}
                          </Typography>
                          <LinearProgress
                            variant="determinate"
                            value={(doctor.currentPatients / doctor.maxPatients) * 100}
                            sx={{
                              width: 50,
                              height: 6,
                              borderRadius: 3,
                              backgroundColor: '#e0e0e0',
                            }}
                          />
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={doctor.status}
                          color={getStatusColor(doctor.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{doctor.shift}</TableCell>
                      <TableCell>{doctor.lastBreak}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <StarIcon sx={{ color: '#ed6c02', fontSize: 16, mr: 0.5 }} />
                          <Typography variant="body2">{doctor.rating}</Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={doctors.length}
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

export default DoctorsOnDuty; 