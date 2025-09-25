import mongoose from "mongoose";
const { Schema } = mongoose;

const ResponseSchema = new Schema({
  formId: { type: Schema.Types.ObjectId, ref: "Form", required: true },
  answers: { type: Schema.Types.Mixed, required: true }, // survey result object
  meta: {
    ip: String,
    userAgent: String,
  },
  submittedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Response", ResponseSchema);
