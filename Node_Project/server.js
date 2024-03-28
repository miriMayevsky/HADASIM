import express from "express"
import {config} from "dotenv"
import cors from "cors"
import { connectToDB } from "./config/dbConfig.js";
import { errorHandling } from "./middlewares/errorHandlingMiddleware.js";
import userRouter from "./routes/user.js"
import routerCorona from "./routes/corona.js"
import routerVaccination from "./routes/vaccination.js"
import routerSummaryView from "./routes/SummaryView.js"

// call to the file env 
//in env have name and password to mongo
config();

connectToDB();

// Create an Express object (the base for the server).
const app=express();

app.use(cors());

app.use(express.json());
app.use("/api/users",userRouter);
app.use("/api/coronas",routerCorona);
app.use("/api/vaccinations",routerVaccination);
app.use("/api/active-patients-last-month",routerSummaryView);

app.use(errorHandling);

let port=4600;

// Setting up a server

app.listen(port,()=>{
    console.log(`app is listening on port ${port}`);
})