import Form from "../models/Form.js";
import { generateSlug } from "../utils/slugify.js";

export const createForm = async (req, res, next) => {
  try {
    const { title, description, json, isPublished } = req.body;
    if (!title || !json) {
      return res.status(400).json({ message: "title و json الزامی است" });
    }
    const slug = generateSlug(title);
    const form = new Form({ title, description, json, slug, isPublished });
    await form.save();
    res.status(201).json(form);
  } catch (err) {
    next(err);
  }
};

export const listForms = async (req, res, next) => {
  try {
    const forms = await Form.find().sort({ createdAt: -1 });
    res.json(forms);
  } catch (err) {
    next(err);
  }
};

export const getFormById = async (req, res, next) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form) return res.status(404).json({ message: "Form not found" });
    res.json(form);
  } catch (err) {
    next(err);
  }
};

export const getFormBySlug = async (req, res, next) => {
  try {
    const form = await Form.findOne({ slug: req.params.slug });
    if (!form) return res.status(404).json({ message: "Form not found" });
    res.json({
      id: form._id,
      title: form.title,
      description: form.description,
      json: form.json,
    });
  } catch (err) {
    next(err);
  }
};

export const updateForm = async (req, res, next) => {
  try {
    const { title, description, json, isPublished } = req.body;
    const form = await Form.findById(req.params.id);
    if (!form) return res.status(404).json({ message: "Form not found" });

    if (title) form.title = title;
    if (description) form.description = description;
    if (json) form.json = json;
    if (typeof isPublished === "boolean") form.isPublished = isPublished;

    await form.save();
    res.json(form);
  } catch (err) {
    next(err);
  }
};

export const deleteForm = async (req, res, next) => {
  try {
    const form = await Form.findByIdAndDelete(req.params.id);
    if (!form) return res.status(404).json({ message: "Form not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    next(err);
  }
};
