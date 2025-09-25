import Response from "../models/Response.js";
import Form from "../models/Form.js";

export const createResponse = async (req, res, next) => {
  try {
    const { formId, answers } = req.body;
    if (!formId || !answers) {
      return res.status(400).json({ message: "formId و answers نیاز است" });
    }

    const form = await Form.findById(formId);
    if (!form) return res.status(404).json({ message: "Form not found" });

    const response = new Response({
      formId,
      answers,
      meta: {
        ip: req.ip,
        userAgent: req.get("User-Agent") || "",
      },
    });
    await response.save();
    res.status(201).json(response);
  } catch (err) {
    next(err);
  }
};

export const getResponsesByForm = async (req, res, next) => {
  try {
    const { formId } = req.params;
    const responses = await Response.find({ formId }).sort({ submittedAt: -1 });
    res.json(responses);
  } catch (err) {
    next(err);
  }
};
