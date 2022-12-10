import { Router } from "express";

import {getTiposUbicacion, getUbicaciones } from "../controllers/pq.controller";

const router = Router();

router.get('/api/ubicaciones', getUbicaciones);
router.get('/api/tiposubicacion', getTiposUbicacion);


export default router;