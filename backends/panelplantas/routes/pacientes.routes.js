import { Router } from "express";

import { getProtocoloCaidas, insertProtocoloCaidas ,deleteProtocoloCaidas, getEvolucionesMedicas} from "../controllers/pacientes.controller";


const router = Router();


router.get('/api/paciente/protocolocaidas/:subencounter', getProtocoloCaidas);

router.get('/api/paciente/evolucionesmed/:subencounter', getEvolucionesMedicas);

router.post('/api/paciente/protocolocaidas', insertProtocoloCaidas);
router.delete('/api/paciente/protocolocaidas', deleteProtocoloCaidas);

export default router;
