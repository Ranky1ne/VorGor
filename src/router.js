import { Router } from "express";

import { auth } from "./handlers/auth";
import { newForm } from "./handlers/newForm";
import { update } from "./handlers/update";

export const router = Router();

router.post("/auth", auth);
router.post("/newForm", newForm);
router.post("/update", update);
