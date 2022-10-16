import { Router } from "express";

import { getMedico, getMedicos, updateColorMedico, getAllMedicos } from "../controllers/medicos.controller";

const router = Router();

router.get('/api/medicos', getMedicos);
router.get('/api/medico/:sid', getMedico);
router.put('/api/medico/colors/:sid', updateColorMedico);
router.get('/api/allmedicos', getAllMedicos);

export default router;