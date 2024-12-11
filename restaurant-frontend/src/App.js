import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from "@mui/material";

const App = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [processingTime, setProcessingTime] = useState([]);

  useEffect(() => {
    // Fetch data for top restaurants
    axios.get("http://localhost:5000/api/top-restaurants")
      .then(response => setRestaurants(response.data))
      .catch(error => console.error("Error fetching top restaurants:", error));

    // Fetch data for avg processing time
    axios.get("http://localhost:5000/api/avg-processing-time")
      .then(response => setProcessingTime(response.data))
      .catch(error => console.error("Error fetching avg processing time:", error));
  }, []);

  return (
    <Container maxWidth="lg" sx={{ marginTop: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Restaurant Dashboard
      </Typography>

      {/* Top Restaurants */}
      <Box sx={{ marginBottom: 5 }}>
        <Typography variant="h5" gutterBottom>
          Top 3 Restaurants (By Average Cooking Time)
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Rank</TableCell>
                <TableCell align="center">Restaurant Name</TableCell>
                <TableCell align="center">Average Cooking Time (min)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {restaurants.map((restaurant, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{restaurant.restaurant_name}</TableCell>
                  <TableCell align="center">{restaurant.avg_cooking_time.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Average Processing Time Per Category */}
      <Box>
        <Typography variant="h5" gutterBottom>
          Average Processing Time Per Category
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Category</TableCell>
                <TableCell align="center">Average Processing Time (min)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {processingTime.map((item, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{item.category}</TableCell>
                  <TableCell align="center">{item.avg_processing_time.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default App;
