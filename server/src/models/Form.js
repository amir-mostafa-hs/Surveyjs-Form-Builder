import mongoose from "mongoose";
const { Schema } = mongoose;

const FormSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    slug: { type: String, required: true, unique: true },
    json: { type: Schema.Types.Mixed, required: true }, // SurveyJS JSON
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Form", FormSchema);
