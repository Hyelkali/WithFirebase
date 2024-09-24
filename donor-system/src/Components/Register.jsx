import React, { useState, useEffect } from 'react';
import { Button, Container, Typography, Box, TextField, Alert } from '@mui/material';
import GoogleButton from 'react-google-button'; // Importing react-google-button
import { auth, provider, db, storage } from '../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import DoneIcon from '@mui/icons-material/Done';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false); // State to handle success message
  const navigate = useNavigate();

  // Handle registration form submission
  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null); // Clear any previous error message
    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      let profilePicUrl = '';
      if (profilePic) {
        const storageRef = ref(storage, `users/${user.uid}/profilePicture`);
        await uploadBytes(storageRef, profilePic);
        profilePicUrl = await getDownloadURL(storageRef);
      }

      // Store user data in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        name,
        email,
        address,
        profilePic: profilePicUrl,
        walletBalance: 0, // Example initial data
      });

      // Display success message
      setSuccess(true);
      
      // Clear form fields
      setName('');
      setEmail('');
      setPassword('');
      setAddress('');
      setProfilePic(null);

      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError('This email is already in use. Please try logging in instead.');
      } else if (error.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters.');
      } else {
        setError(error.message);
      }
    }
  };

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    setError(null);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Store user data in Firestore if new
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, {
        profilePic: user.photoURL,
        name: user.displayName,
        email: user.email,
        address: 'N/A', // You can prompt for address later if needed
        walletBalance: 0,
      });

      // Redirect to dashboard
      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
    }
  };

  // Handle profile picture upload
  const handleProfilePicChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  // Clear form fields when the component mounts (e.g., on page refresh)
  useEffect(() => {
    setName('');
    setEmail('');
    setPassword('');
    setAddress('');
    setProfilePic(null);
  }, []);

  return (
    <Container>
      <Box mt={5} textAlign="center">
        <Typography variant="h4" gutterBottom>
          Register
        </Typography>

        {/* Display error messages */}
        {error && <Alert severity="error">{error}</Alert>}
        
        {/* Display success message */}
        {success && (
          <Alert severity="success" icon={<DoneIcon />}>
            Registration successful! 🎉 Redirecting to login...
          </Alert>
        )}

        {/* Profile Picture Upload */}
        <Box mt={2}>
          <Button variant="contained" component="label">
            Upload Profile Picture
            <input type="file" hidden onChange={handleProfilePicChange} />
          </Button>
        </Box>

        {/* Registration Form */}
        <form onSubmit={handleRegister}>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            label="Address"
            fullWidth
            margin="normal"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Register
          </Button>
        </form>

        {/* Google Sign-In Option with react-google-button */}
        <Typography mt={4}>Or sign up with Google</Typography>
        <GoogleButton onClick={handleGoogleSignIn} />
      </Box>
    </Container>
  );
};

export default Register;
