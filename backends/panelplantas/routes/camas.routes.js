import { Router } from "express";

import { getCamas, getCamasMed } from "../controllers/camas.controller";

const router = Router();

router.get('/api/camas/', getCamas);
router.get('/api/camasmed/', getCamasMed);

export default router;