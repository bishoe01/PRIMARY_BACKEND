import express, { Router } from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import ServiceRouter from "./routers/serviceRouter";
import EmployeeRouter from "./routers/employeeRouter";


const PORT = 4000;
const app = express();

const logger = morgan("dev");
app.use(logger);

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use("/",globalRouter);
app.use("/employee", EmployeeRouter);
app.use("/service", ServiceRouter);



//LISTEN
const handleListening = () => console.log(`♻️Server Listening on port http://localhost:${4000} 🎺`);

app.listen(PORT, handleListening);
