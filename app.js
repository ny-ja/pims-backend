const express = require("express");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const sequelize = require("./config/database");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const departmentRoutes = require("./routes/departmentRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const payrollRoutes = require("./routes/payrollRoutes");
const deductionRoutes = require("./routes/deductionRoutes");
const bonusRoutes = require("./routes/bonusRoutes");
const taxRoutes = require("./routes/taxRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const cors = require("cors");
const logger = require("./config/logger");

const app = express();
const swaggerDocument = YAML.load("./swagger/swagger.yaml");

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(cors());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", departmentRoutes);
app.use("/api/v1", employeeRoutes);
app.use("/api/v1", payrollRoutes);
app.use("/api/v1", deductionRoutes);
app.use("/api/v1", bonusRoutes);
app.use("/api/v1", taxRoutes);
app.use("/api/v1", attendanceRoutes);

process.on("unhandledRejection", (reason, promise) => {
  logger.error("Unhandled Rejection at:", promise, "reason:", reason);
});

process.on("uncaughtException", (error) => {
  logger.error(`Uncaught Exception: ${error.message}`);
  process.exit(1);
});

sequelize
  .sync()
  .then(() => {
    console.log("Database connected successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;
