import productModel from '../models/productModel.js'



export const createProduct =async(productData)=>{
    return await productModel.create(productData)
}

export const listAllProduct =async()=>{
    return await productModel.find();
}

export const findProductOne =async(filter,option)=>{
    return await productModel.findOne(filter,option);
}

export const updateProduct = async(productId,productData)=>{
    return await productModel.findOneAndUpdate(productId,productData);
}

export const deleteProduct = async(productData)=>{
    return await productModel.findOneAndDelete(productData);
}