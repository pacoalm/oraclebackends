import { Router } from "express";

import {getPlantillas, getDetallePlantilla, postPlantilla, postDetallePlantilla, deleteDetallePlantilla} from "../controllers/pq.plantillas.controller";

const router = Router();

router.get('/api/plantillas/:facility', getPlantillas);
router.get('/api/detalleplantilla/:sidPlantilla', getDetallePlantilla);
router.post('/api/plantilla', postPlantilla);
router.post('/api/detalleplantilla', postDetallePlantilla);
router.delete('/api/detalleplantilla', deleteDetallePlantilla);

export default router;
