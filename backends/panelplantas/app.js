
import express from "express";
import config from "./config";
import medicosRouter from "./routes/medicos.routes"
import camasRouter from "./routes/camas.routes"
import pacientesRouter from "./routes/pacientes.routes"


const bodyParser=require('body-parser');
const cors = require("cors")
const logger=require('morgan');

const app = express ();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(logger('combined'));

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
	next();
});

let port = config.port;
app.use(medicosRouter);
app.use(camasRouter);
app.use(pacientesRouter);

app.use(cors);
app.set("port",port);

export default app;
