import mongoose from "mongoose";

const Schema = mongoose.Schema;

const developerSchema = new Schema({
    name: String,
    country: String,
    founded: Number,
    description: String
});

const Developer = mongoose.model('developers', developerSchema);

export default Developer;
