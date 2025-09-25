import express from "express";
import {
  createForm,
  listForms,
  getFormById,
  getFormBySlug,
  updateForm,
  deleteForm,
} from "../controllers/formsController.js";

const router = express.Router();

router.get("/public/:slug", getFormBySlug);

router.post("/", createForm);
router.get("/", listForms);
router.get("/:id", getFormById);
router.put("/:id", updateForm);
router.delete("/:id", deleteForm);

export default router;
