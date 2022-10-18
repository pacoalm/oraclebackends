
import auth from "./auth";

import {getCitasCEX} from '../controllers/citas.controller'

var express = require ('express');

const router = express.Router();


router.get('/api/citas/', auth(),  getCitasCEX);



export default router;


