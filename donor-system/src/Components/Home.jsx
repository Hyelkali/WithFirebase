import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Typography, Box, AppBar, Toolbar, Grid, Card, CardContent, CardHeader } from '@mui/material';
import { ArrowRight, CreditCard, Globe, Lock, Smartphone } from "lucide-react";

const Home = () => {
  const features = [
    { icon: <Globe className="h-10 w-10 mb-4" />, title: "Global Reach", description: "Send money to over 200 countries worldwide" },
    { icon: <Lock className="h-10 w-10 mb-4" />, title: "Secure Transactions", description: "Bank-level encryption to keep your money safe" },
    { icon: <Smartphone className="h-10 w-10 mb-4" />, title: "Mobile-First", description: "Manage your finances on-the-go with our app" },
    { icon: <CreditCard className="h-10 w-10 mb-4" />, title: "Multiple Payment Options", description: "Link your cards, bank accounts, or use PayEase balance" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component={Link} to="/" style={{ flexGrow: 1 }}>
            PayEase
          </Typography>
          <Button color="inherit" component={Link} to="/login">Login</Button>
          <Button color="inherit" component={Link} to="/register">Sign Up</Button>
        </Toolbar>
      </AppBar>

      <main>
        <section className="py-20 bg-gradient-to-b from-primary to-background">
          <Container maxWidth="md" sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h4" gutterBottom>
              Send, Receive, and Manage Your Money with Ease
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Fast, secure, and convenient payments for everyone, everywhere.
            </Typography>
            <Box mt={4}>
              <Grid container spacing={2} justifyContent="center">
                <Grid item>
                  <Button variant="contained" size="large" component={Link} to="/register">
                    Get Started
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" size="large" component={Link} to="/about">
                    Learn More
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </section>

        <section className="py-20">
          <Container maxWidth="md">
            <Typography variant="h5" align="center" gutterBottom>
              Why Choose PayEase?
            </Typography>
            <Grid container spacing={4} justifyContent="center">
              {features.map((feature, index) => (
                <Grid item key={index} xs={12} sm={6} md={3}>
                  <Card variant="outlined">
                    <CardHeader title={feature.title} />
                    <CardContent>
                      <Typography variant="body2" color="textSecondary" component="p">
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </section>

        <section className="py-20 bg-muted">
          <Container maxWidth="md" sx={{ textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom>
              Ready to get started?
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Join millions of users who trust PayEase for their payment needs.
            </Typography>
            <Button variant="contained" size="large" component={Link} to="/register">
              Create Your Account
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Container>
        </section>
      </main>

      <footer className="bg-background py-8">
        <Container maxWidth="md">
          <Grid container spacing={4}>
            <Grid item xs={12} md={3}>
              <Typography variant="h6" gutterBottom>About</Typography>
              <ul>
                <li><Link to="/about">Company</Link></li>
                <li><Link to="/careers">Careers</Link></li>
                <li><Link to="/press">Press</Link></li>
              </ul>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="h6" gutterBottom>Products</Typography>
              <ul>
                <li><Link to="/personal">Personal</Link></li>
                <li><Link to="/business">Business</Link></li>
                <li><Link to="/partners">Partners</Link></li>
              </ul>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="h6" gutterBottom>Resources</Typography>
              <ul>
                <li><Link to="/help">Help Center</Link></li>
                <li><Link to="/docs">Developer Docs</Link></li>
                <li><Link to="/blog">Blog</Link></li>
              </ul>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="h6" gutterBottom>Legal</Typography>
              <ul>
                <li><Link to="/privacy">Privacy Policy</Link></li>
                <li><Link to="/terms">Terms of Service</Link></li>
                <li><Link to="/compliance">Compliance</Link></li>
              </ul>
            </Grid>
          </Grid>
          <Typography variant="body2" align="center" color="textSecondary" gutterBottom>
            &copy; 2024 PayEase. All rights reserved.
          </Typography>
        </Container>
      </footer>
    </div>
  );
};

export default Home;
