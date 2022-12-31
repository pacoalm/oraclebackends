import { Router } from "express";

import {getRecursos, getTiposRecurso, postRecurso} from "../controllers/pq.recursos.controller";

const router = Router();

router.get('/api/recursos/:facility', getRecursos);
router.get('/api/tiposrecurso', getTiposRecurso);
router.post('/api/recurso', postRecurso);


export default router;