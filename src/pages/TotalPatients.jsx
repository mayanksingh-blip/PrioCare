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
  Divider,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
} from '@mui/icons-material';

const TotalPatients = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data - replace with actual API data
  const patients = [
    {
      id: 1,
      name: 'John Doe',
      age: 45,
      gender: 'Male',
      admissionDate: '2024-03-15',
      status: 'Admitted',
      ward: 'General',
      priority: 'High',
    },
    {
      id: 2,
      name: 'Jane Smith',
      age: 32,
      gender: 'Female',
      admissionDate: '2024-03-15',
      status: 'Discharged',
      ward: 'ICU',
      priority: 'Medium',
    },
    {
      id: 3,
      name: 'Mike Johnson',
      age: 28,
      gender: 'Male',
      admissionDate: '2024-03-14',
      status: 'Admitted',
      ward: 'Emergency',
      priority: 'Low',
    },
    // Add more mock data as needed
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
      case 'admitted':
        return 'primary';
      case 'discharged':
        return 'success';
      case 'critical':
        return 'error';
      default:
        return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
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

  // Filter patients by search query
  const filteredPatients = patients.filter((patient) =>
    Object.values(patient)
      .join(' ')
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 'bold',
            color: 'primary.main',
            mb: 1,
            letterSpacing: 1,
            textShadow: '0 2px 8px rgba(25, 118, 210, 0.10)',
          }}
        >
          Patient Records
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
          Complete overview of all patients in the hospital
        </Typography>
      </Box>

      <Grid container justifyContent="center" sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={0}
            sx={{
              p: 0,
              borderRadius: 3,
              boxShadow: '0 2px 12px 0 rgba(25, 118, 210, 0.08)',
              background: 'transparent',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                background: '#f4f8fb',
                borderRadius: 3,
                boxShadow: '0 1px 4px 0 rgba(25, 118, 210, 0.06)',
                px: 2,
                py: 1,
                transition: 'box-shadow 0.2s',
                '&:focus-within': {
                  boxShadow: '0 2px 8px 0 rgba(25, 118, 210, 0.18)',
                  background: '#e3f2fd',
                },
              }}
            >
              <SearchIcon sx={{ color: 'primary.main', fontSize: 28, mr: 1 }} />
              <TextField
                fullWidth
                placeholder="Search patients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                  sx: {
                    fontSize: 18,
                    background: 'transparent',
                    borderRadius: 2,
                    px: 0,
                  },
                }}
                sx={{ background: 'transparent', borderRadius: 2, px: 0 }}
              />
              <IconButton sx={{ ml: 1, color: 'grey.400', '&:hover': { color: 'primary.main', background: 'transparent' }, p: 1 }}>
                <FilterListIcon />
              </IconButton>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Card elevation={4} sx={{ borderRadius: 4, boxShadow: 3, p: 2 }}>
        <CardContent>
          <TableContainer sx={{ borderRadius: 3, overflow: 'hidden' }}>
            <Table>
              <TableHead>
                <TableRow sx={{ background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)' }}>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ID</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Name</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Age</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Gender</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Admission Date</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Ward</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Priority</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredPatients
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((patient, idx) => (
                    <TableRow
                      key={patient.id}
                      sx={{
                        backgroundColor: idx % 2 === 0 ? '#f8fafc' : 'white',
                        transition: 'background 0.2s',
                        '&:hover': {
                          backgroundColor: '#e3f2fd',
                        },
                      }}
                    >
                      <TableCell>{patient.id}</TableCell>
                      <TableCell>{patient.name}</TableCell>
                      <TableCell>{patient.age}</TableCell>
                      <TableCell>{patient.gender}</TableCell>
                      <TableCell>{patient.admissionDate}</TableCell>
                      <TableCell>
                        <Chip
                          label={patient.status}
                          color={getStatusColor(patient.status)}
                          sx={{ fontWeight: 'bold', fontSize: 14, px: 1.5, borderRadius: 1 }}
                        />
                      </TableCell>
                      <TableCell>{patient.ward}</TableCell>
                      <TableCell>
                        <Chip
                          label={patient.priority}
                          color={getPriorityColor(patient.priority)}
                          sx={{ fontWeight: 'bold', fontSize: 14, px: 1.5, borderRadius: 1 }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Divider sx={{ my: 2 }} />
          <TablePagination
            component="div"
            count={filteredPatients.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
            sx={{ '.MuiTablePagination-toolbar': { justifyContent: 'flex-end' } }}
          />
        </CardContent>
      </Card>
    </Container>
  );
};

export default TotalPatients; 