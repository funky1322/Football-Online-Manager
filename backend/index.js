const cors = require("cors");
const express = require("express");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const teamRoutes = require("./routes/teamRoutes");
const transferRoutes = require("./routes/transferRoutes");

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

const app = express();

connectDB();
app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/transfer", transferRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
