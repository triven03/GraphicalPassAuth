console.log("hello hii ");

const photo =document.getElementById("formFileMultiple")
const imdiv=document.getElementById("imDiv")

const addDiv=document.getElementById("addDiv")
const cngDiv=document.getElementById("cngDiv")
const logIn=document.getElementById("logIn")
const email=document.getElementById("id")

const YourPassDiv= document.getElementById("yrPassDiv")
const parentRow= document.getElementById("parentRow")
const imgMessage= document.getElementById("imgMessage")
const Password= document.getElementById("Password")
const errMessage= document.getElementById("errMessage")

const next= document.getElementById("next")
const alertM= document.getElementById("alertM")
const alertMN= document.getElementById("alertMN")
const oldPass= document.getElementById("oldPass")
const oldTPass= document.getElementById("oldTpass")
const oldTPassid= document.getElementById("oldTPassid")
const oldGrid= document.getElementById("GridphotoPsd")
const cngGrid= document.getElementById("GridphotoSet")


const oldIm=document.getElementsByClassName("oldIm")
const Cng=document.getElementsByClassName("Cng")
const Old=document.getElementsByClassName("Old")

function upload() {
    // console.log(photo.files);
    let b=1;
    if (photo.files.length<9 || photo.files.length >9) {
        photo.style.border="2px solid #dc3545"
        imdiv.style.display= "block"
        // imdiv.focus();
      b=0;
     } else {

        photo.style.border="2px solid #cccc"
      imdiv.style.display= "none"
      b=1;
     }

     if (photo.files.length==9) {
        let formData = new FormData();

        // const file=photo.files;

        for (const dt of photo.files) {
            
            formData.append("passphoto", dt);
        }

        formData.append("id", email.value);

        const reqst = new XMLHttpRequest();
        reqst.open("POST", "https://graphicalpassword-3p34g811xx2lcdgtc2c.codequotient.in/changeImages");
        // reqst.setRequestHeader("content-type", "application/json")
        reqst.send(formData);
    
       reqst.addEventListener("load", function () {
             let sts =reqst.status;
             
             let data = JSON.parse(reqst.responseText);

             let images= data.PassImages;
             
             const imG =document.getElementsByClassName("imGone");
             Array.prototype.forEach.call(imG, function(el,i) {
               el.setAttribute("src",`${images[i].img}`)
               el.setAttribute("alt",`${images[i].id}`)
        
            });


            //  console.log(data);


     })
        
     }
    
}



function showAdd() {
   addDiv.style.display="block"
   cngDiv.style.display="none"
   
}

// if (logIn.title.length) {

//     setTimeout(()=>{
//         logIn.click(); 
//     },4500)
    
// }



function hideDiv() {
   addDiv.style.display="none"
   cngDiv.style.display="block"
   
}





var passWord="";



function old(img) {
    removeError();


    alertM.style.display="none"
    

        const parent =img.parentNode;
        
        const pass=img.alt.toString();
        const src= img.src; 
        passWord= passWord+pass;

        parent.style.border="2px solid green"

        console.log(passWord);

  
    

}
function set(img) {


    if (passWord.length<3) {
    errMessage.style.display="none"

        let display = YourPassDiv.style.display;



            if (display !="flex") {

                YourPassDiv.style.display="flex"
            }

        const parent =img.parentNode;
        
        const pass=img.alt.toString();
        const src= img.src; 
        passWord= passWord+pass;

        const div = document.createElement("div");
        div.setAttribute("class","imgContainer")
        div.innerHTML= ` <img src="${src}" class="img-fluid" alt="${pass}" >`

        parentRow.appendChild(div)

        // console.log(img.src);
        // console.log(pass);
        console.log(passWord);
        // console.log(parent);
    }
     else {
        imgMessage.style.display="block"
        
    }

    if(passWord.length==3){
        YourPassDiv.style.border=  "1px solid rgb(11, 193, 32)";
        Password.value= passWord;

    }
    

}



function checkoldPass() {
 const oldGPassword= oldPass.value;
 const oldTPassword= oldTPassid.value;
 const entedPass= oldTPass.value

// console.log(oldTPassword);

if (!passWord.length && ! entedPass.length) {

    showError()

} else {
    if (oldGPassword==passWord || oldTPassword==entedPass) {

        removeError();
        Array.prototype.forEach.call(Old, function(el) {
            el.style.display="none";
    
        });
        Array.prototype.forEach.call(Cng, function(el) {
            el.style.display="block";
    
        });
    
        oldGrid.style.display="none";
        cngGrid.style.display="grid";
        passWord="";
    
        
     } else {
        passWord="";
        YourPassDiv.style.border=  "1px solid  #dc3545";
        Array.prototype.forEach.call(oldIm, function(el) {
            el.style.border="1px solid red";
    
        });
    
        alertM.style.display="block"
        
     }
}


    
}

function resetold() {

    

    passWord="";
    YourPassDiv.style.border=  "1px solid  #dc3545";
    Array.prototype.forEach.call(oldIm, function(el) {
        el.style.border="1px solid red";

    });

    alertM.style.display="none"

   
}


function reset() {

    YourPassDiv.style.display="none";
    imgMessage.style.display="none";
    parentRow.innerHTML="";
    passWord="";
    Password.value=passWord;
    YourPassDiv.style.border=  "1px solid  #dc3545";
    errMessage.style.display="none"



}

function checkPass() {

    if (Password.value.length==3) {
    errMessage.style.display="none"


       return true 
    }

    errMessage.style.display="block"
    return false;
    
}


function enterText() {
    // console.log("clicked");
    removeError();
    
}


function showError() {

    oldTPass.style.border="2px solid red";
    oldGrid.style.border="2px solid red";
    alertMN.style.display="block"


}
function removeError() {

    oldTPass.style.border="2px solid #cccc";
    oldGrid.style.border="none";
    alertMN.style.display="none"
    alertM.style.display="none"


}