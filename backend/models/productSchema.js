import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  productName: { type: String, required: true, trim: true },
  price: { type: Number, required: true, trim: true },
  details: { type: String, required: true, trim: true },
  category:{type:String, required:true, trim:true},
  images: [{ type: String, required: true }]
});

const productModel = mongoose.model("product", productSchema);

export default productModel;