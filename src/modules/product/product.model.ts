import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    productCount: {
        type: Number,
        required: true,
    }
});

export default mongoose.model("Product", ProductSchema);