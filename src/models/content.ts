import mongoose, { model, Schema } from "mongoose";

const ContentSchema = new Schema({
    title: String,
    link: String,
    type: String, // Ensure this field is defined if you are using it
    tags: [{ type: mongoose.Types.ObjectId, ref: 'Tag' }],
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true }
});

export const ContentModel = model("Content", ContentSchema);