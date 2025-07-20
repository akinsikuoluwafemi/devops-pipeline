const express = require("express");
const { Pool } = require("pg");
require("dotenv").config(); // Load environment variables from .env file
const app = express();
app.use(express.json());
// fix cors issue
const cors = require("cors");
app.use(cors()); // Enable CORS for all routes

// Connect to PostgreSQL using DATABASE_URL from environment variables
const pool = new Pool({ connectionString: process.env.DATABASE_URL });



// Health check endpoint for Kubernetes probes and monitoring
app.get("/healthz", (req, res) => res.json({ status: "ok" }));

// Get all users from the database
app.get("/users", async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM users"); // Query the users table
  console.log("Fetched users:", rows); // Log the fetched users
  res.json(rows); // Send users as JSON
});

// Add a new user to the database
app.post("/users", async (req, res) => {
  const { name } = req.body; // Get name from request body
  // Insert user and return the new record
  const { rows } = await pool.query(
    "INSERT INTO users(name) VALUES($1) RETURNING *",
    [name]
  );
  console.log("Inserted user:", rows[0]); // Log the inserted user
  res.json(rows[0]); // Send the new user as JSON
});

// Start the server on port 3000
app.listen(3000, () => console.log(`Backend running on port http://localhost:3000`));
