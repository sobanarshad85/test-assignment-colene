'use client'
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!data.error) {
        setAlert({ open: true, message: 'Login successful!', severity: 'success' });
      } else {
        setAlert({ open: true, message: data.message || 'Login failed!', severity: 'error' });
      }
    } catch (error) {
      setAlert({ open: true, message: 'Network error. Try again!', severity: 'error' });
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Try Login Now</h2>

        <TextField
          required
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
        />

        <TextField
          required
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            py: 1.5,
            backgroundColor: '#007bff',
            '&:hover': { backgroundColor: '#0056b3' },
            borderRadius: '10px',
          }}
          onClick={handleLogin}
        >
          Login
        </Button>
        <Snackbar
          open={alert.open}
          autoHideDuration={4000}
          onClose={() => setAlert({ ...alert, open: false })}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <MuiAlert severity={alert.severity} variant="filled">
            {alert.message}
          </MuiAlert>
        </Snackbar>
      </div>
    </div>
  );
}
