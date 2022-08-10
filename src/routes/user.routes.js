import { Router } from "express";
import * as userCtrl from "../controllers/user.controller";
import { authJwt, verifySU } from "../middlewares";

const router = Router();

router.post(
  "/",
  [authJwt.verifyToken, authJwt.isAdmin, verifySU.checkRolesExisted],
  userCtrl.createUser
);

// router.post("/", userCtrl.createUser);

export default router;
