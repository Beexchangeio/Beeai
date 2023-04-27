import express from "express";
import { body } from "express-validator";
import {
  userRegister,
  userSignIn,
  resetPassword,
} from "../controllers/user.controller.js";
import { tokenAuth } from "../middlewares/token.middleware.js";
import { validate } from "../utils/validator.js";

const router = express.Router();

router.post(
  "/signup",
  body("email").exists().withMessage("email address is required"),
  body("password")
    .exists()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password must have at least 8 characters"),
  validate,
  userRegister
);

router.post(
  "/signin",
  body("email").exists().withMessage("email is required"),
  body("password")
    .exists()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password must have at least 8 characters"),
  validate,
  userSignIn
);

router.post("/reset-password", resetPassword);

router.get("/check-token", tokenAuth, (req, res) =>
  res.status(200).json({
    userId: req.user._id,
    email: req.user.email,
  })
);

export default router;
