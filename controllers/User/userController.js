// const adminService =require("../../services/admin/adminService")
const userModel=require("../../database/models/user")
const fs = require("fs")


const showLogin = async function(req,res){
    res.render("login",{ error: "" })

}


const showSignup = async function(req,res){
 res.render("signup",{error:"",})
}
const saveAdmin = async function(req,res){
    let passphoto=[];
    req.files.forEach((f,i) => {
        passphoto.push({img:f.filename,id:i+1});
    });


    user = {
        Name: req.body.Name,
        Email:req.body.email,
        TextPass: req.body.password,
        PassImages:passphoto,
        
		    
	}		

	try
	{

		const data=  new userModel(user);
         
         data.save((err,data)=>{
            if (err) {
                console.log(err);
            } else {
                req.session.data=data;
                // console.log(data);
                console.log("saved user");
        
                res.render("signup2",{error:"",status:"",user:data})
            }
        })
	}
	catch(err)
	{
		console.log(err)
        console.log("error aaya");
	}

}
const savePass = async function(req,res){
    // console.log(req.file);
    const id = req.body.id;
    const pass= req.body.Password; 
     
    	

	try
	{
        
		 userModel.findOneAndUpdate({ _id: id }, { '$set': { GraphicalPass:pass}},(err,data)=>{
            if (err) {
                console.log(err);
            } else {
                const err={
                    code:200,
                    message:"User Create SuccesFully"
                }
                console.log("Password saved ");
                res.render("signup2",{error:err,status:"ok",user:req.session.data})


		        //  res.render("signup2",{massage:"password save succes",status:"success"})


            }
         })

	}
	catch(err)
	{
		console.log(err)
        console.log("error aaya");
	}

}
const changePass = async function(req,res){
    // console.log(req.file);
    const id = req.body.id;
    const pass= req.body.Password; 
     
    	

	try
	{
        
		 userModel.findOneAndUpdate({ _id: id }, { '$set': { GraphicalPass:pass}},(err,data)=>{
            if (err) {
                console.log(err);
            } else {
                
                console.log("Password Changed");
                userModel.find({ _id:id}).then((data)=>{

                    // console.log(data);
                    
                    // res.send(data[0])
                    req.session.user=data[0];

                    res.render("userhome",{user:data[0],message:"Password Changed SuccessFully"})
                })


		        //  res.render("signup2",{massage:"password save succes",status:"success"})


            }
         })

	}
	catch(err)
	{
		console.log(err)
        console.log("error aaya");
	}

}

const loginUserWithImg= async function(req,res){

    const mail= req.body.email;
    
    try {
        const user= await userModel.find({Email:mail})
    
        if (user.length) {
            const member=user[0];
            req.session.userImg=user[0];
    
            res.render("login2", { error:"" ,user:member}); 
            
        } else {
            const err={code:400,massage:"User Not Found"}
            res.render("login", { error:err });
            
        }
    
    } catch (error) {
        console.log(error);
    }
    
    //    adminService.getUser(req.body.userid, req.body.password, function (err, user) {
    //         if (user.length) {
    //             req.session.isLoggedIn = true;
    //             req.session.user = user[0];
                
    //             if(!user[0].isVerified)
    //         {
    //             const err={code:400,massage:"Please Verify Your Email"}
    //             res.render("login",{error:err });
    //             return
    //         }
    
    //             res.redirect("/")
    //         }
    //         else {
    //             const err={code:400,massage:"User Not Found"}
    //             res.render("login", { error:err });
    
    //         }
    //     });
    }


const loginUser= async function(req,res){

    const mail= req.body.email;
    const password =req.body.password;
    try {
        const user= await userModel.find({Email:mail,TextPass:password})
    
        if (user.length) {
            const member=user[0];
            // req.session.userImg=user[0];

        req.session.isLoggedIn = true;
        req.session.user = user[0];
        // const member=user[0];

       res.redirect("/")
    
            // res.render("login2", { error:"" ,user:member}); 
            
        } else {
            const err={code:400,massage:"User Not Found"}
            res.render("login", { error:err });
            
        }
    
    } catch (error) {
        console.log(error);
    }
    
    //    adminService.getUser(req.body.userid, req.body.password, function (err, user) {
    //         if (user.length) {
    //             req.session.isLoggedIn = true;
    //             req.session.user = user[0];
                
    //             if(!user[0].isVerified)
    //         {
    //             const err={code:400,massage:"Please Verify Your Email"}
    //             res.render("login",{error:err });
    //             return
    //         }
    
    //             res.redirect("/")
    //         }
    //         else {
    //             const err={code:400,massage:"User Not Found"}
    //             res.render("login", { error:err });
    
    //         }
    //     });
    }
    

const loginUserImage= async function(req,res){

const mail= req.body.email;
const Password= req.body.Password;
// console.log(Password);

try {
    const user= await userModel.find({Email:mail,GraphicalPass:Password})

    if (user.length) {
        req.session.isLoggedIn = true;
        req.session.user = user[0];
        const member=user[0];

       res.redirect("/")


        // res.render("login2", { error:"" ,user:member}); 
        
    } else {
        const err={code:400,massage:"Wrong Password "}
        res.render("login2", { error:err ,user: req.session.userImg}); 

    }

} catch (error) {
    console.log(error);
}

//    adminService.getUser(req.body.userid, req.body.password, function (err, user) {
//         if (user.length) {
//             req.session.isLoggedIn = true;
//             req.session.user = user[0];
            
//             if(!user[0].isVerified)
//         {
//             const err={code:400,massage:"Please Verify Your Email"}
//             res.render("login",{error:err });
//             return
//         }

//             res.redirect("/")
//         }
//         else {
//             const err={code:400,massage:"User Not Found"}
//             res.render("login", { error:err });

//         }
//     });
}




const checkMail= async (req,res)=>{

    const mail =req.body.email;

    try {
     const mailFound= await userModel.find({Email:mail});
     if (mailFound.length) {
        res.status(400);
        res.send("Email Aready taken")
     }
     else{
        res.status(200);
        res.send("Your Email is Unique")
     }
        
    } catch (error) {
        console.log(error);
    }
}

const changeImages =async (req,res)=>{

    const id = req.body.id;
    const files= req.files;

    console.log(id);
    // console.log(files);

    // if (files.length) {
    //     const newUser= await userModel.find({id:id})
    //     const oldPics= newUser[0].PassImages;
    //     try {

    //         oldPics.forEach((f) => {
    //             fs.unlinkSync("../../uploads/" +f.img)  
    //         });
    //     } 
    //     catch (error) {
    //         console.log(error);
    //     }
       
        
    // }

    let passphoto=[];
    req.files.forEach((f,i) => {
        passphoto.push({img:f.filename,id:i+1});
        
    });
  
    try {
         userModel.findOneAndUpdate({ _id:id}, { '$set': { PassImages:passphoto}},(err,data)=>{
            if (err) {
                console.log(err);
            } else {
                
                // console.log("Password saved "+ data);
                userModel.find({ _id:id}).then((data)=>{

                    console.log(data);
                    res.send(data[0])
                })



		        //  res.render("signup2",{massage:"password save succes",status:"success"})


            }
         })
        
    } catch (error) {
        console.log(error);
        
    }



}


function showChange(req,res) {
    const user = req.session.user;

    // console.log(user);
    res.render("changePass",{user:user})
}


module.exports={
saveAdmin,
loginUser,
showSignup,
showLogin,
checkMail,
changeImages,
savePass,
loginUserImage,
showChange,
changePass,
loginUserWithImg
} 