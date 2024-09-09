import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import AuthService from '../../services/auth.service';

import {
  Container,
  Box,
  Avatar,
  FormControl,
  TextField,
  Alert,
  Modal,
  Collapse,
  IconButton,
  Typography,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import ErrorIcon from '@mui/icons-material/Error';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LoadingButton from '@mui/lab/LoadingButton';

interface FormValues {
  username: string;
  password: string;
}

const Login = () => {
  const [redirect, setRedirect] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(true);
  const [shouldReload, setShouldReload] = useState(false);

  const handleClose = () => setOpen(false);

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();

    if (currentUser) {
      setRedirect('/profile');
    }

    return () => {
      if (shouldReload) {
        window.location.reload();
      }
    };
  }, [shouldReload]);

  const schema = Yup.object().shape({
    username: Yup.string().required('This field is required!'),
    password: Yup.string().required('This field is required!'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const handleLogin = (formValue: FormValues) => {
    const { username, password } = formValue;

    setMessage('');
    setLoading(true);

    AuthService.login(username, password)
      .then(() => {
        setRedirect('/profile');
        setShouldReload(true);
      })
      .catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        setMessage(resMessage);
      });
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  const formStyles = {
    maxWidth: '360px',
    padding: '40px',
    mt: '40px',
    border: '1px solid #ced4da',
    borderRadius: '10px',
    boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const errorStyles = {
    color: 'red',
    fontSize: '12px',
    mb: '5px',
    display: 'flex',
    alignItems: 'center',
  };

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box sx={formStyles}>
        <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56, mb: 2 }}>
          <LockOutlinedIcon fontSize="large" />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          Login
        </Typography>

        <FormControl sx={{ width: '100%' }}>
          <Box
            component="form"
            onSubmit={handleSubmit(handleLogin)}
            sx={{
              '& .MuiTextField-root': { mb: 2 },
              width: '100%',
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              error={!!errors.username}
              id="outlined-username-input"
              label="Username"
              type="text"
              fullWidth
              {...register('username')}
            />
            {errors.username && (
              <Box sx={errorStyles}>
                <ErrorIcon sx={{ mr: 0.5, width: '15px' }} />
                {errors.username.message}
              </Box>
            )}

            <TextField
              error={!!errors.password}
              id="outlined-password-input"
              label="Password"
              type="password"
              fullWidth
              {...register('password')}
            />
            {errors.password && (
              <Box sx={errorStyles}>
                <ErrorIcon sx={{ mr: 0.5, width: '15px' }} />
                {errors.password.message}
              </Box>
            )}

            <LoadingButton
              type="submit"
              loading={loading}
              variant="contained"
              fullWidth
              sx={{
                height: '50px',
                bgcolor: 'primary.main',
                color: '#fff',
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
              }}
            >
              Login
            </LoadingButton>
          </Box>

          {message && (
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-error-title"
              aria-describedby="modal-error-description"
            >
              <Box
                sx={{
                  position: 'absolute' as const,
                  top: '20%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 400,
                }}
              >
                <Collapse in={open}>
                  <Alert
                    severity="error"
                    action={
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                          setOpen(false);
                        }}
                      >
                        <CloseIcon fontSize="inherit" />
                      </IconButton>
                    }
                  >
                    {message}
                  </Alert>
                </Collapse>
              </Box>
            </Modal>
          )}
        </FormControl>
      </Box>
    </Container>
  );
};

export default Login;
