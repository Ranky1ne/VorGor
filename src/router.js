import { Router } from "express";

import { auth } from "./handlers/auth.js";
import { newForm } from "./handlers/newForm.js";
import { update } from "./handlers/update.js";
import { login } from "./handlers/get/login.js";
import { deleteForm } from "./handlers/deleteForm.js";
import { deleteCar } from "./handlers/deleteCar.js";
import { addCar } from "./handlers/addCar.js";
import { moveCars } from "./handlers/moveCars.js";
import { moveCarsBack } from "./handlers/moveCarsBack.js";
import { orderData } from "./handlers/orderData.js";
import { home } from "./handlers/get/home.js";
import { newFormGet } from "./handlers/get/newFormGet.js";
import { changeForm } from "./handlers/get/changeForm.js";
import { carList } from "./handlers/get/carList.js";
import { operator } from "./handlers/get/operator.js";
import { printTTN } from "./handlers/get/printTTN.js";
import { carsData } from "./handlers/get/carsData.js";
import { homeData } from "./handlers/get/homeData.js";
import { dataPrinting } from "./handlers/dataPrinting.js";


export const router = Router();

router.post("/auth", auth);
router.post("/newForm", newForm);
router.post("/update", update);
router.post('/delete', deleteForm);
router.post('/deleteCar', deleteCar);
router.post('/addCar', addCar);
router.post('/moveCars', moveCars);
router.post('/moveCarsBack', moveCarsBack);
router.post('/orderData', orderData);
router.get('/', login);
router.get('/home', home);
router.get ('/newForm', newFormGet);
router.get ('/changeForm', changeForm);
router.get ('/carList', carList);
router.get ('/operator', operator);
router.get ('/printTTN', printTTN);
router.get ('/carsData', carsData);
router.get ('/homeData', homeData);
router.post ('/dataPrinting', dataPrinting);


