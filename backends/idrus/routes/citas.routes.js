
import auth from "./auth";

import {getCitasCEX, getCitasPr} from '../controllers/citas.controller'

var express = require ('express');

const router = express.Router();


router.get('/api/idrus/citas/', auth(),  getCitasCEX);
router.get('/api/idrus/pruebas/', auth(),  getCitasPr);


export default router;


