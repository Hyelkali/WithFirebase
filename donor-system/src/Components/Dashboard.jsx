// src/components/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, List, ListItem, ListItemText, Divider } from '@mui/material';
import { auth, db } from '../firebaseConfig';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        setUserData(userSnap.data());
      }

      const transactionsRef = collection(db, `users/${auth.currentUser.uid}/transactions`);
      const transactionSnap = await getDocs(transactionsRef);
      const transactionList = transactionSnap.docs.map((doc) => doc.data());
      setTransactions(transactionList);
    };

    fetchData();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        Welcome, {userData?.name}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Wallet Balance: ${userData?.walletBalance}
      </Typography>

      <Box mt={4}>
        <Typography variant="h5">Transaction History</Typography>
        <Divider />
        <List>
          {transactions.map((tx, index) => (
            <ListItem key={index}>
              <ListItemText primary={`Transaction: ${tx.amount}`} secondary={`Date: ${tx.date}`} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default Dashboard;
