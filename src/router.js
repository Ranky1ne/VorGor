import { Router } from "express";

import { auth } from "./handlers/auth.js";
import { newForm } from "./handlers/newForm.js";
import { update } from "./handlers/update.js";
import { login } from "./handlers/login.js";
import { deleteForm } from "./handlers/deleteForm.js";
import { deleteCar } from "./handlers/deleteCar.js";
import { addCar } from "./handlers/addCar.js";
import { moveCars } from "./handlers/moveCars.js";

export const router = Router();

router.post("/auth", auth);
router.post("/newForm", newForm);
router.post("/update", update);
router.get('/', login);
router.post('/delete', deleteForm);
router.post('/deleteCar', deleteCar);
router.post('/addCar', addCar);
router.post('/moveCars', moveCars);

