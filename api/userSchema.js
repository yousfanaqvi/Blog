const mongoose= require("mongoose");
const passportLocalMongoose=require('passport-local-mongoose')

mongoose.connect(process.env.MONGO_URI);
const UserSchema=new mongoose.Schema({
      fname:String,
      lname:String,
      username:String,
      password:String,
      img:
      {
        type: Buffer,
        required:true   
      }
      
      // profilePicture:String
      
});
UserSchema.plugin(passportLocalMongoose);

module.exports = new mongoose.model('user', UserSchema);          

