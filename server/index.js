const express = require("express");
const app = express();

const clientRoutes = require("./router/client");
const generalRoutes = require("./router/general");
const managementRoutes = require("./router/management");
const salesRoutes = require("./router/sales");

const connectDB = require("./db/connectDb");

const helmet = require("helmet"); // Provides the API by adding http headers
app.use(helmet());
app.use(helmet.crossOriginEmbedderPolicy({ policy: "require-corp" }));
// or

const cors = require("cors"); // Allows cross origin sharing
app.use(cors());

app.use(express.json());
require("dotenv").config();

const morgan = require("morgan"); // logger for the server
app.use(morgan("common"));

// routes

app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

const PORT = process.env.PORT || 9000;

const {
  dataUser,
  dataProduct,
  dataProductStat,
  dataTransaction,
  dataOverallStat,
  dataAffiliateStat,
} = require("./data/index.js");
const User = require("./model/User");
const Product = require("./model/Product");
const ProductStat = require("./model/ProductStat");
const Transaction = require("./model/Transaction");
const OverallStat = require("./model/OverallStat.js");
const AffiliateStat = require("./model/AffiliateStat");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    console.log(`Database successfully connected...`);
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}...`);
    });
    //Inject the dataUser, dataProduct, dataProductStat, dataTransaction, dataOverallStat, dataAffiliateStat into the databse here
  } catch (error) {
    console.log(error);
  }
};

start();
