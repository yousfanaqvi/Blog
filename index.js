require('dotenv').config();
const express = require("express");
const cookieParser = require('cookie-parser')
const session = require('express-session');
const passport=require('passport');
const path = require("path");
const cors = require("cors");
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "http://localhost:3000", // allow to server to accept request from different origin
  methods: ['GET','POST','DELETE'],
  credentials: true, // allow session cookie from browser to pass through
  "Access-Control-Allow-Credentials": true

}));

app.use(cookieParser('keyboard cat'));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie : { httpOnly: true, secure : false}
  // cookie: { secure: true }
}))
app.use(passport.initialize());
app.use(passport.session());

const user = require("./api/user");
app.use("/", user);



// mongoose.connect(process.env.MONGO_URI);
// const UserSchema=new mongoose.Schema({
//       fname:String,
//       lname:String,
//       username:String,
//       password:String,
//       // profilePicture:String
      
// });
// UserSchema.plugin(passportLocalMongoose);



// app.get('/loginerror',(req,res) => {
//   console.log("error");
//   res.json("user invalid");
// });

// app.post("/login", (req,res) => {
//    const user = new User({
//        username:req.body.username,
//        password:req.body.password
//    });
//    req.login(user,function(err){
//        if(err)
//        console.log(err)
//        else
//        passport.authenticate('local',{ failureRedirect: '/loginerror', failureMessage: true  })(req, res, function () {
//            res.json('success');
//           //  res.redirect("/getUserData")
//            //console.log(req.user);
//        });
//    })
// });
       


// app.post("/registerUser",(req,res) => {
//    User.register(new User(
//        {
//            fname:req.body.fname,
//            lname:req.body.lname,
//            username:req.body.username})
//            ,req.body.password, function(err, user) {
//        if (err) {
//            console.log(err);
//            res.json("user exists");
//        }
//        else{
//            passport.authenticate('local')(req, res, function () {
//                res.json("user Registerd");
//                console.log(req.user);
//            });
//    }
// });

// });

// app.get("/getUserData", (req, res) => {
//   console.log("hey")
//   // res.json("hello");
//   // console.log("getdata"+req.user);
//   // console.log("hey")
       
// });

 app.use(express.static(path.join(__dirname, "./frontend/build")));


app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./frontend/build/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server Running on port ${port}`));

module.exports = app;
