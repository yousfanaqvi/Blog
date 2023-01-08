const mongoose= require("mongoose");
// const passportLocalMongoose=require('passport-local-mongoose')

mongoose.connect(process.env.MONGO_URI);
const postSchema=new mongoose.Schema({
      title:String,
      img:
      {
        type: Buffer,
      },
      postBody:String,
      author:String,
      postDate: { type: Date, default: Date.now },
      category:String,
});

module.exports = new mongoose.model('post', postSchema);          

