"use client";
/* mui login imports */
import axios from 'axios';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Cookies from 'js-cookie';
import {useRouter } from 'next/navigation';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useForm} from "react-hook-form";
import { styled } from '@mui/material/styles';
import  style from './../../../public/assets/css/login.module.css';
/* mui login end */


const defaultTheme = createTheme();


export default function SignIn() {
  const {register,handleSubmit,formState: { errors }} = useForm();
  const router = useRouter();

  const CustomTextField = styled(TextField)({
    '& .MuiInputBase-input::placeholder': {
      color: '#fff', // Set the placeholder text color here
      opacity: 1, // Ensure the color is not translucent
    },
  });

  const handleSubmitForm = (data) => {
    axios.post('/api/login',data)
    .then(function (response) {
      if(response.status === 200){
        alert(response.data.message);
        Cookies.set('AuthUser',response.data.token, { expires: 7 });
        router.push('/movies');
      }
    })
    .catch(function (error) {
      alert(error);
    });  
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container className={style.loginPage} component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h3">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit(handleSubmitForm)} noValidate sx={{ mt: 1 }}>
            <TextField
              sx={{
                color: '#fff',
                border: '1px solid transparent',
                borderRadius : '10px',
                backgroundColor : '#224957',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'transparent', // Make sure the border is transparent
                  },
                  '&:hover fieldset': {
                    borderColor: 'transparent', // Ensure no border on hover
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'transparent', // Ensure no border on focus
                  },
                }
              }}
              margin="normal"
              required
              fullWidth
              id="email"
              placeholder="Email Address"
              autoComplete="email"
              autoFocus
              {...register('emails', {
                required: 'Email is required', // Custom error message
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Email regex pattern
                  message: 'Invalid email address', // Custom error message
                },
              })}
            />
            {errors.emails && <span className='text-danger'>{errors.emails.message}</span> }
            <TextField
              sx={{
                            color: '#fff',
                            border: '1px solid transparent',
                            borderRadius : '10px',
                            backgroundColor : '#224957',
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                borderColor: 'transparent', // Make sure the border is transparent
                              },
                              '&:hover fieldset': {
                                borderColor: 'transparent', // Ensure no border on hover
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: 'transparent', // Ensure no border on focus
                              },
                            }
              }}
              margin="normal"
              required
              fullWidth
              placeholder="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register("passwords", { required: 'Password is Required.' })}
            />
             {errors.passwords && <span className='text-danger'>{errors.passwords.message}</span> }
             <div class="text-center "> 
             <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
             </div>
             <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: '#2BD17E',
                  ':hover': {
                    backgroundColor: 'transparent',
                    color: '#fff',
                    border : '1px solid #fff'
                  },
                }}
              >
                Sign In
              </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}