import express from "express"
import {config} from "dotenv"
import cors from "cors"
import { connectToDB } from "./config/dbConfig.js";
import { errorHandling } from "./middlewares/errorHandlingMiddleware.js";
import userRouter from "./routes/user.js"
import routerCorona from "./routes/corona.js"
import routerVaccination from "./routes/vaccination.js"

config();
connectToDB();
const app=express();
app.use(cors());
app.use(express.json());
app.use("/api/users",userRouter);
app.use("/api/coronas",routerCorona);
app.use("/api/vaccinations",routerVaccination);

app.use(errorHandling);

let port=4600;
app.listen(port,()=>{
    console.log(`app is listening on port ${port}`);
})