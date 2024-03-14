import mongoose from "mongoose";

const categoiresSchema = new mongoose.Schema({
    "categoireName":{
        type:String,
        required:true,
        unique:true,
    },
    "isActive":{
        type:Boolean,
        default:true,
    },
    "isDeleted":{
        type:Boolean,
        default:false,
    },
    createdAt:{
        type:Number
    },
    updatedAt:{
        type:Number
    }
},
{
    timestamps:true,
})

const categoriesModel = mongoose.model('Categories',categoiresSchema);

export default categoriesModel;