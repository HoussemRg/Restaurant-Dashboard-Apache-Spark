const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

// Enable CORS
app.use(cors());

// Middleware for parsing JSON bodies
app.use(bodyParser.json());

// Configure PostgreSQL connection
const pool = new Pool({
    user: "postgres",
    host: "postgres-db", // Use the container name in the Docker network
    database: "temp_db", // Correct database name
    password: "passw0rd", // Password from your environment
    port: 5432, // Default PostgreSQL port
});

// Log database connection status
pool.connect((err, client, release) => {
    if (err) {
        console.error("Error connecting to the database:", err.stack);
    } else {
        console.log("Connected to the database successfully");
        release();
    }
});

// Endpoint to retrieve data from top_restaurants table
app.get("/api/top-restaurants", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM top_3_restaurants");
        res.json(result.rows);
    } catch (err) {
        console.error("Error fetching data from top_3_restaurants:", err.stack);
        res.status(500).send("Server error");
    }
});

// Endpoint to retrieve data from avg_processing_time_per_category table
app.get("/api/avg-processing-time", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM avg_processing_time_per_category");
        res.json(result.rows);
    } catch (err) {
        console.error("Error fetching data from avg_processing_time_per_category:", err.stack);
        res.status(500).send("Server error");
    }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
