import express from "express";
import {
  createResponse,
  getResponsesByForm,
} from "../controllers/responsesController.js";

const router = express.Router();

router.post("/", createResponse);
router.get("/:formId", getResponsesByForm);

export default router;
