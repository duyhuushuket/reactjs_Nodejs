import express from "express";
import bodyParser from "body-parser";
// query, params, headers...
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./routers/web";
import checkConnectDB from "./config/dbconnect";
import cors from "cors";
require("dotenv").config();

let app = express();
const corsOption = {
  credentials: true,
  origin: ['http://localhost:3000']
}

app.use(cors(corsOption));
//app.use(cors({ origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRoutes(app);
checkConnectDB();

let port = process.env.PORT || 3000;
app.listen(port, () => {
  // callback
  console.log("App listening on port " + port);
});
