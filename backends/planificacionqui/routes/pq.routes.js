import { Router } from "express";

import {getTiposUbicacion, getUbicaciones, postUbicacion, getServicios, insertarServicioQUI, borrarServicioQUI } from "../controllers/pq.controller";

const router = Router();

router.get('/api/ubicaciones/:facility', getUbicaciones);
router.get('/api/tiposubicacion', getTiposUbicacion);
router.get('/api/servicios/:facility', getServicios);

router.put('/api/servicios', insertarServicioQUI)
router.delete('/api/servicios', borrarServicioQUI)
router.post('/api/ubicacion', postUbicacion);


export default router;