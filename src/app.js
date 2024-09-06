import express from "express";
import 'dotenv/config';
import bodyParser from "body-parser";
import emiRouter from "./routes/emi.route.js";

const app = express();
const port = process.env.PORT || 3000;

// configs
app.use(bodyParser.json());

//routes
app.use('/', emiRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})