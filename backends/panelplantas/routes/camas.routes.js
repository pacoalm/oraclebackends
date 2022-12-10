import { Router } from "express";

import { getCamas, getCamasMed, getAltasPrevistas } from "../controllers/camas.controller";

const router = Router();

router.get('/api/camas/', getCamas);
router.get('/api/camasmed/', getCamasMed);
router.get('/api/camas/altasprevistas/', getAltasPrevistas);

export default router;