import expres, { Router } from "express";
import { userRegistation, verifyUser } from "../controller/auth.controller";

const router: Router = expres.Router();

router.post("/user-registration", userRegistation);
router.post("/verify-user", verifyUser);

export default router;