import { Router } from "express";
import * as authCtrl from "../controllers/auth.controller";
import { verifySU } from "../middlewares";

const router = Router();

router.post("/signin", authCtrl.signIn);
router.post(
  "/signup",
  [verifySU.checkDuplicateUsernameOrEmail, verifySU.checkRolesExisted],
  authCtrl.signUp
);

export default router;
