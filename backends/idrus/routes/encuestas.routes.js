
import auth from "./auth";

import {getEncuestasHosp, getEncuestasCex, getEncuestasTraReh, getEncuestasPruebas, getEncuestasUrg, getEncuestasCalVida} from '../controllers/encuestas.controller'

var express = require ('express');

const router = express.Router();

router.get('/api/idrus/encuestas/hosp', auth(),  getEncuestasHosp);
router.get('/api/idrus/encuestas/cex', auth(),  getEncuestasCex);
router.get('/api/idrus/encuestas/trareh', auth(),  getEncuestasTraReh);
router.get('/api/idrus/encuestas/pruebas', auth(),  getEncuestasPruebas);
router.get('/api/idrus/encuestas/urg', auth(),  getEncuestasUrg);
router.get('/api/idrus/encuestas/calvida/', auth(),  getEncuestasCalVida);

export default router;

