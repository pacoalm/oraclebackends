
import auth from "./auth";

import {getCitas, getCamas} from '../controllers/citas.controller'

var express = require ('express');

const router = express.Router();


router.get('/api/citas/', auth(),  getCitas);



export default router;


