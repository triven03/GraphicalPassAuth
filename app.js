const express = require("express")
const fs = require("fs")
const session = require('express-session')
const multer = require('multer')
const moment = require("moment")

const port = process.env.PORT || 3000;
const startDb = require("./database/init");
const userModel = require("./database/models/user");
const userController = require("./controllers/User/userController");


startDb();

const app = express();

app.use(express.static("public"));
app.use(express.static("uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const upload = multer({ dest: 'uploads' })

app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true,
	cookie: { secure: false }

}))

app.set("view engine", "ejs");
app.set("views", "./views");


app.route("/").get((req,res)=>{

	if ( req.session.isLoggedIn) {
		res.render("userhome",{user:req.session.user,message:""});
		
	  }
else{

	res.render("home",{ error: "" })
}

})
app.get("/logout", function (req, res) {
	req.session.destroy();
	res.redirect("/");
})

// app.route("/admin").get(AdminControl.getAdmin)
app.route("/login").get(userController.showLogin).post(userController.loginUser)
app.route("/signup").get(userController.showSignup).post(upload.array("passphoto",9),userController.saveAdmin)
app.route("/setPass").post(userController.savePass)
app.route("/passChange").post(userController.changePass)
app.route("/checkMail").post(userController.checkMail)
app.route("/changeImages").post(upload.array("passphoto",9),userController.changeImages)
app.route("/loginimage").post(userController.loginUserWithImg)
app.route("/loginGraphical").post(userController.loginUserImage)
app.route("/changePass").get(userController.showChange)






app.listen(port, () => {
    console.log(`server is start port number ${port}`);
});

