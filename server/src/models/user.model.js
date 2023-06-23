const {Types, Schema, model} = require('mongoose');
const bcrypt =require('bcrypt');

const DOCUMENT_NAME = 'User';
const COLLECTION_NAME = 'Users';

// Declare the Schema of the Mongo model
var userSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role: {
        type:String,
        enum: ['0','1','2'],
        default: '2'
    },
    cart: {
        type:Array,
        default: []
    },
    address: [
        {type: Types.ObjectId, ref:'Address'}
    ],
    wishlist: [
        {type: Types.ObjectId, ref:'Product'}
    ],
    isBlocked: {
        type: Boolean,
        default: false
    },
    refreshToken: {
        type:String
    },
    passwordChangeAt: {
        type: String
    },
    passwordResetToken: {
        type: String
    },
    passwordResetExpire: {
        type: String
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next()
    }
    const salt = bcrypt.genSaltSync(10)
    this.password = await bcrypt.hash(this.password, salt)

})

//Export the model
module.exports = model(DOCUMENT_NAME, userSchema);