import mongoose, { version } from "mongoose";

const imageSchema = mongoose.Schema({
  productId:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
  },
  imageUrl:{
    type:String,
    required:true,
  } // Update schema to accept an array of objects with the key 'url'
},{
  versionKey:false,
});
  
const ImageProductModel = mongoose.model("ImageProduct", imageSchema);

export default ImageProductModel;
