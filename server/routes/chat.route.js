import express from "express";
import { tokenAuth } from "../middlewares/token.middleware.js";
import {
  chatCompletion,
  getChatHistory,
  clearChatHistory,
} from "../controllers/chat.controller.js";

const router = express.Router();

router.post("/", tokenAuth, chatCompletion);
router.post("/get", tokenAuth, (req, res) => {
  getChatHistory({ userId: req.body.userId }, (result) => {
    return res.json(result);
  });
});
router.delete("/", tokenAuth, (req, res) => {
  clearChatHistory({}, (result) => {
    return res.json(result);
  });
});

export default router;
