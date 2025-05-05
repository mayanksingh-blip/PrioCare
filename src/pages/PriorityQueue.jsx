import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

const PriorityQueue = () => {
  // Mock data - replace with actual API data
  const [patients] = useState([
    {
      id: 1,
      name: 'John Doe',
      age: 45,
      priority: 'high',
      waitingTime: '5m',
      symptoms: 'Chest pain, shortness of breath',
      status: 'waiting',
    },
    {
      id: 2,
      name: 'Jane Smith',
      age: 32,
      priority: 'medium',
      waitingTime: '15m',
      symptoms: 'Fever, cough',
      status: 'in_progress',
    },
    {
      id: 3,
      name: 'Mike Johnson',
      age: 28,
      priority: 'low',
      waitingTime: '25m',
      symptoms: 'Minor injury',
      status: 'waiting',
    },
  ]);

  const getPriorityColor = (priority) => {
    switch (priority) {
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'waiting':
        return 'info';
      case 'in_progress':
        return 'warning';
      case 'completed':
        return 'success';
      default:
        return 'default';
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Patient Name', width: 200 },
    { field: 'age', headerName: 'Age', width: 100 },
    {
      field: 'priority',
      headerName: 'Priority',
      width: 130,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={getPriorityColor(params.value)}
          size="small"
        />
      ),
    },
    {
      field: 'waitingTime',
      headerName: 'Waiting Time',
      width: 130,
    },
    {
      field: 'symptoms',
      headerName: 'Symptoms',
      width: 250,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: (params) => (
        <Chip
          label={params.value.replace('_', ' ')}
          color={getStatusColor(params.value)}
          size="small"
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Box>
          <Tooltip title="View Details">
            <IconButton size="small">
              <VisibilityIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton size="small">
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Remove">
            <IconButton size="small">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Current Patient Queue
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Real-time display of patients waiting for treatment, sorted by priority
        </Typography>
      </Paper>
      <DataGrid
        rows={patients}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        disableSelectionOnClick
        sx={{
          '& .MuiDataGrid-cell:focus': {
            outline: 'none',
          },
        }}
      />
    </Box>
  );
};

export default PriorityQueue; 