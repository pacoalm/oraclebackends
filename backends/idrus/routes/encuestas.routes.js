
import auth from "./auth";

import {getEncuestasHosp} from '../controllers/encuestas.controller'

var express = require ('express');

const router = express.Router();


router.get('/api/idrus/encuestas/Hosp', auth(),  getEncuestasHosp);


export default router;

