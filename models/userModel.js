import mongoose from "mongoose";

const Schema = mongoose.Schema;
const mySchema = new Schema({
    name: String,
    email: String,
    password: String
});

const User = mongoose.model('users', mySchema );

export default User;