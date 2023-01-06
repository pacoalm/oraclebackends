import { Router } from "express";

import {getExisteProgramacion, putProgramacion, deleteProgramacion} from "../controllers/pq.programacion.controller";

const router = Router();

router.get('/api/programacion/existe',getExisteProgramacion);
router.delete('/api/programacion',deleteProgramacion);
router.put('/api/programacion', putProgramacion);


export default router;