const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  Name: String,
  Email:String,
  UserId:String,
  TextPass: String,
  GraphicalPass:  {
    type:String,
    default:""
  },
  PassImages:[],
  isVerified:{
    type:Boolean,
    default:false
  }
  
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;

