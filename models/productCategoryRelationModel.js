import mongoose from 'mongoose'

const productCategoryRelationSchema = mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
      },
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    }
},{
    versionKey:false,
})

const productCategoryRelationModel = mongoose.model('productCategoryRelation',productCategoryRelationSchema)

export default productCategoryRelationModel;