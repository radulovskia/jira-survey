import React from 'react';
import TemporaryDrawer from './NavigationDrawer';
import { Box, Button, Container, Divider, TextField } from '@mui/material';
// import Grid from '@mui/material/Grid'; // Grid version 1
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { color } from 'chart.js/helpers';
import ChecklistIcon from '@mui/icons-material/Checklist';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import AssessmentIcon from '@mui/icons-material/Assessment';



{/* <nav>
        <Link to="/">Home</Link>
        <Link to="/create">Create Collection</Link>
        <Link to="/all">All Questions</Link>
        <Link to="/answer">Answer</Link>
        <Link to="/analytics">Analytics</Link>
      </nav> */}

const Home = () => {
  return (
    <>
      <TemporaryDrawer />
      <Divider></Divider>
      <Box sx={{ maxWidth: "1600px", margin: "auto", marginTop: "10%" }}>
        <Grid container spacing={5}>
          <Grid xs display="flex" justifyContent="center" alignItems="center" sx={{ border: 1, borderColor: 'grey.300', margin: "1%", height: "350px", width: "350px" }}>
            <Link to="/create">
              <LibraryAddIcon sx={{ fontSize: 250, color: "#2584ff" }} />
              <Typography sx={{ textAlign: "center", color: "black", textDecoration: "none" }} variant="h4" gutterBottom>New Survey</Typography>
            </Link>
          </Grid>
          <Grid xs display="flex" justifyContent="center" alignItems="center" sx={{ border: 1, borderColor: 'grey.300', margin: "1%", height: "350px", width: "350px" }}>
            <Link to="/answer" sx={{ color: "black" }}>
              <ChecklistIcon sx={{ fontSize: 250, color: "#2584ff" }} />
              <Typography sx={{ textAlign: "center", color: "black", textDecoration: "none" }} variant="h4" gutterBottom>Take Survey</Typography>
            </Link>
          </Grid>
          <Grid xs display="flex" justifyContent="center" alignItems="center" sx={{ border: 1, borderColor: 'grey.300', margin: "1%", height: "350px", width: "350px" }}>
            <Link href='/analytics' sx={{ color: "black" }} to="/analytics" >
              <AssessmentIcon sx={{ fontSize: 250, color: "#2584ff" }} />
              <Typography sx={{ textAlign: "center", color: "black", textDecoration: "none" }} variant="h4" gutterBottom>Survey Analytics</Typography>
            </Link>
          </Grid>
        </Grid>
      </Box >
    </>
  );
};

export default Home;
