console.log("hello");

const pass= document.getElementById("password")

const photo= document.getElementById("formFileMultiple")
const pasdiv= document.getElementById("pasDiv")
const imdiv= document.getElementById("imDiv")
const emailDiv= document.getElementById("emailDiv")

// imdiv.style.display= "block"

// photo.style.border="2px solid #dc3545"

var emailCheck=1;

function checkMail(input) {
   const email= input.value;
   if (email.length) {
      
      const reqst = new XMLHttpRequest();
      reqst.open("POST", "https://graphicalpassword-3p34g811xx2lcdgtc2c.codequotient.in/checkMail");
      reqst.setRequestHeader("content-type", "application/json")
      reqst.send(JSON.stringify({ email: email}));
  
     reqst.addEventListener("load", function () {
           let sts =reqst.status;
           if (sts==400) {
            emailCheck=0;
            input.style.border="2px solid #dc3545";
            emailDiv.style.display= "block";
           }
           else if(sts=200){
            emailCheck=1;
            input.style.border="2px solid #cccc";
            emailDiv.style.display= "none";
           }

   })
 }
  else {

      input.style.border="2px solid #cccc";
            emailDiv.style.display= "none";
   }
   
}


function checkForm() {
   // console.log( pass.value.length);
let a=1;
let b =1;

   if (pass.value.length<8) {
      pasdiv.focus();
    pass.style.border="2px solid #dc3545"
    pasdiv.style.display= "block"
    a=0;
    
   }
   else{
    pass.style.border="2px solid #cccc"
    pasdiv.style.display= "none"
    a=1;
   }
   console.log("selected phtos "+photo.files.length);

   if (photo.files.length<9 || photo.files.length > 9) {
      imdiv.focus();
      photo.style.border="2px solid #dc3545"
    imdiv.style.display= "block"
    b=0;
   } else {
      // imdiv.focus();
      photo.style.border="2px solid #cccc"
    imdiv.style.display= "none"
    b=1;
   }

   if (a && b && emailCheck) {
      return true;
   } 
   return false;
}