import { Router } from "express";

import { getProtocoloCaidas, insertProtocoloCaidas ,deleteProtocoloCaidas, getEvolucionesMedicas,
         quitarMarcaNuevo, getInformes, getAnaliticas, deleteAltaPrevista, insertarAltaPrevista } from "../controllers/pacientes.controller";


const router = Router();


router.get('/api/paciente/protocolocaidas/:subencounter', getProtocoloCaidas);
router.get('/api/paciente/evolucionesmed/:subencounter', getEvolucionesMedicas);
router.get('/api/paciente/informes/:client', getInformes);
router.get('/api/paciente/analiticas/:client', getAnaliticas);

router.post('/api/paciente/protocolocaidas', insertProtocoloCaidas);
router.post('/api/paciente/quitarmarcanuevo', quitarMarcaNuevo);
router.post('/api/paciente/insertaraltaprevista', insertarAltaPrevista);

router.delete('/api/paciente/protocolocaidas', deleteProtocoloCaidas);
router.delete('/api/paciente/deletealtaprevista', deleteAltaPrevista);


export default router;
