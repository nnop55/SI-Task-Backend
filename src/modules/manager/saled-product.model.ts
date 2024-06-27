import mongoose from "mongoose";

const SaledProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    saledProductCount: {
        type: Number,
        required: true,
    },
    saledAt: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }
});

export default mongoose.model("SaledProduct", SaledProductSchema);