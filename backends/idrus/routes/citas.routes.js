
import auth from "./auth";

import {getCitasCEX, getCitasPr, getEstadoCita, getEstadoPrueba} from '../controllers/citas.controller'

var express = require ('express');

const router = express.Router();


router.get('/api/idrus/citas/', auth(),  getCitasCEX);
router.get('/api/idrus/citas/estado/', auth(),  getEstadoCita);

router.get('/api/idrus/pruebas/', auth(),  getCitasPr);
router.get('/api/idrus/pruebas/estado/', auth(),  getEstadoPrueba);


export default router;


