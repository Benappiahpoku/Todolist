const express = require("express"); // Import express
const connectDB = require("./database"); //  Import the database connection
const cors = require("cors"); // Import cors

// Import routes
const usersRoutes = require("./routes/api/users"); // Import the users routes
const tasksRoutes = require("./routes/api/tasks");  // Import the tasks routes

const app = express(); // Initialize the app

// Connect Database
connectDB();

// Enable CORS
app.use(cors()); // Enable CORS

app.use(express.json({ extended: false })); // Body parser middleware

// Use routes
app.use("/api/users", usersRoutes); // Use the users routes for user management
app.use("/api/auth", usersRoutes); // Reuse the users routes for authentication
app.use("/api/tasks", tasksRoutes); // Use the tasks routes for task management

app.get("/", (req, res) => res.send("MongoDB Running on Port 5001")); // Test route

const PORT = process.env.PORT || 5001; // Set the port

app.listen(PORT, () => console.log(`Server started on port ${PORT}`)); // Start the server
