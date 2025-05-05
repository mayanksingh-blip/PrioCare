import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Avatar,
  useTheme,
} from '@mui/material';
import { Visibility, VisibilityOff, LocalHospital } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Allow any email and password for now
    localStorage.setItem('isLoggedIn', 'true');
    navigate('/dashboard');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(120deg, #e3f2fd 0%, #bbdefb 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="xs">
        <Card
          elevation={6}
          sx={{
            borderRadius: 4,
            p: 3,
            boxShadow: '0 8px 32px 0 rgba(25, 118, 210, 0.15)',
            background: 'white',
          }}
        >
          <CardContent sx={{ textAlign: 'center' }}>
            <Avatar
              sx={{
                bgcolor: theme.palette.primary.main,
                width: 64,
                height: 64,
                mx: 'auto',
                mb: 2,
                boxShadow: 2,
              }}
            >
              <LocalHospital sx={{ fontSize: 40 }} />
            </Avatar>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 'bold',
                color: theme.palette.primary.main,
                mb: 1,
                letterSpacing: 1,
              }}
            >
              Hospital Login
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Welcome back! Please sign in to continue.
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                margin="normal"
                label="Email or Username"
                name="email"
                value={form.email}
                onChange={handleChange}
                autoComplete="username"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocalHospital color="primary" />
                    </InputAdornment>
                  ),
                }}
                required
              />
              <TextField
                fullWidth
                margin="normal"
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={handleChange}
                autoComplete="current-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword((show) => !show)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocalHospital color="primary" />
                    </InputAdornment>
                  ),
                }}
                required
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                sx={{ mt: 3, borderRadius: 2, fontWeight: 'bold', boxShadow: 2 }}
              >
                Login
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Login; 