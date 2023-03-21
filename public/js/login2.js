console.log("hello hii ");

const photo =document.getElementById("formFileMultiple")



const Password= document.getElementById("Password")
const errMessage= document.getElementById("alertM")
const errMessageq= document.getElementById("alert")
const imgDiv =document.getElementsByClassName("imgDiv")



var passWord="";



function set(img) {


    const parent =img.parentNode;
    parent.style.border="2px solid green";
    errMessage.style.display="none";
    if (errMessageq) {
        
        errMessageq.style.display="none";
    }



    if (passWord.length<3) {
  
        const pass=img.alt.toString();
        
        passWord= passWord+pass;

       
        console.log(passWord);
        // console.log(parent);
    }
     else {
      
        
    }

    if(passWord.length==3){
       
        Password.value= passWord;

    }
    

}



function reset() {

    errMessage.style.display="none"
   
    passWord="";
  
    Password.value= passWord;

    Array.prototype.forEach.call(imgDiv, function(el) {
        el.style.border="1px solid red";

    });

    


  
}


function getRandomNumber(min, max) {
    let step1 = max - min + 1;
    let step2 = Math.random() * step1;
    let result = Math.floor(step2) + min;
    return result;
}

function createArrayOfNumbers(start, end){
    let myArray = [];
    for(let i = start; i <= end; i++) { 
        myArray.push(i);
    }
    return myArray;
}


let numbersArray = createArrayOfNumbers(1,9);

function call() {

    if(numbersArray.length == 0){
        console.log("no more number");
        return;
    }

    let randomIndex = getRandomNumber(0, numbersArray.length-1);
    let randomNumber = numbersArray[randomIndex];
    numbersArray.splice(randomIndex, 1)
    // console.log( randomNumber);
    
   

    return randomNumber;
}

function checkPass() {

    if (Password.value.length==3) {
    
       return true 
    }

    errMessage.style.display="block"
    passWord="";
  
    Password.value= passWord;

    Array.prototype.forEach.call(imgDiv, function(el) {
        el.style.border="1px solid red";

    });
    random();

    return false;
    
}


let a=0;
function random() {
    Array.prototype.forEach.call(imgDiv, function(el) {
        a= call();
        el.style.gridArea=`p${a}`;

    });

    numbersArray = createArrayOfNumbers(1,9);
  
}

random();



