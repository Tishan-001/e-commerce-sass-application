import expres, { Router } from "express";
import { userRegistation } from "../controller/auth.controller";

const router: Router = expres.Router();

router.post("/user-registration", userRegistation);

export default router;