import mongoose from "mongoose";

const Schema = mongoose.Schema;
const mySchema = new Schema({
    name: String,
    gender: String,
    platform: String,
    release_date:Number,
    description: String
});

const User = mongoose.model('games', mySchema );

export default User;