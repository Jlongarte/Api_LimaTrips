require("dotenv").config();
const express = require("express");
const { connectDB } = require("./src/config/db");
const { connectCloudinary } = require("./src/config/cloudinary");
const tripRoutes = require("./src/routes/trips.routes");

const app = express();

// Connect to database
connectDB();
connectCloudinary();

// Middleware to parse JSON bodies
app.use(express.json());

app.use("/trips", tripRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Define and start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto: ${PORT}`);
});
