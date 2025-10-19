import expres, { Router } from "express";
import {
  loginUser,
  resetUserPassword,
  userForgotPassword,
  userRegistation,
  verifyUser,
} from "../controller/auth.controller";
import { verifyForgotPasswordOtp } from "../utils/auth.helper";

const router: Router = expres.Router();

router.post("/user-registration", userRegistation);
router.post("/verify-user", verifyUser);
router.post("/login-user", loginUser);
router.post("/forgot-password-user", userForgotPassword);
router.post("/reset-password-user", resetUserPassword);
router.post("/verify-forgot-password-user", verifyForgotPasswordOtp);

export default router;
