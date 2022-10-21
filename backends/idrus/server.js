
import express from "express";

import citasRouter from "./routes/citas.routes"
import encuestasRouter from "./routes/encuestas.routes"

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

let port = process.env.PORT;
app.use(citasRouter);
app.use(encuestasRouter);

app.use(cors);
app.set("port",port);

export default app;

app.listen(process.env.PORT);

console.log ("Server listening on port " + port);


