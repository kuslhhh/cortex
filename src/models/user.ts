import { Schema, model } from "mongoose";


const UserSchema = new Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true, match: /.+\@.+\..+/ },
    password: { type: String, required: true }
},
    { timestamps: true }
)

export const UserModel = model('User', UserSchema);
