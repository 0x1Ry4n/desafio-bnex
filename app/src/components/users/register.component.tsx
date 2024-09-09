import { useState } from 'react';
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
  Button,
  Alert,
  Modal,
  Collapse,
  IconButton,
  Typography,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import ErrorIcon from '@mui/icons-material/Error';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

type FormData = {
  username: string;
  email: string;
  password: string;
};

type State = {
  successful: boolean;
  message: string;
};

const Register: React.FC = () => {
  const [state, setState] = useState<State>({
    successful: false,
    message: '',
  });

  const [open, setOpen] = useState(true);
  const handleClose = () => setOpen(false);

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required('This field is required!')
      .min(3, 'The username must be at least 3 characters')
      .max(20, 'The username must not exceed 20 characters'),
    email: Yup.string()
      .required('This field is required!')
      .email('Invalid email address'),
    password: Yup.string()
      .required('This field is required!')
      .min(6, 'The password must be at least 6 characters')
      .max(40, 'The password must not exceed 40 characters'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });

  const handleRegister = (formData: FormData) => {
    const { username, email, password } = formData;

    setState((prevState) => ({
      ...prevState,
      message: '',
      successful: false,
    }));

    AuthService.register(username, email, password)
      .then((response) => {
        if (response.id) {
          setState({
            message: 'User registered successfully!',
            successful: true,
          });
        }
      })
      .catch((error) => {
        const resMessage =
          error?.message || 'An unexpected error occurred';

        setState({
          successful: false,
          message: resMessage,
        });
      });
  };

  const { successful, message } = state;

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
          <PersonAddIcon fontSize="large" />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          Sign Up
        </Typography>

        <FormControl sx={{ width: '100%' }}>
          <Box
            component="form"
            onSubmit={handleSubmit(handleRegister)}
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
              error={!!errors.email}
              id="outlined-email-input"
              label="Email"
              type="email"
              fullWidth
              {...register('email')}
            />
            {errors.email && (
              <Box sx={errorStyles}>
                <ErrorIcon sx={{ mr: 0.5, width: '15px' }} />
                {errors.email.message}
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

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 3,
                bgcolor: 'primary.main',
                color: '#fff',
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
              }}
            >
              Sign Up
            </Button>
          </Box>

          {message && (
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
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
                  {successful ? (
                    <Alert
                      severity="success"
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
                  ) : (
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
                  )}
                </Collapse>
              </Box>
            </Modal>
          )}
        </FormControl>
      </Box>
    </Container>
  );
};

export default Register;
