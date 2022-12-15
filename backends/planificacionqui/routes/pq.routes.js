import { Router } from "express";

import {getTiposUbicacion, getUbicaciones, postUbicacion, getServicios } from "../controllers/pq.controller";

const router = Router();

router.get('/api/ubicaciones/:facility', getUbicaciones);
router.get('/api/tiposubicacion', getTiposUbicacion);
router.get('/api/servicios/:facility', getServicios);

router.post('/api/ubicacion', postUbicacion);


export default router;