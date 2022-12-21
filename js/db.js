// Import the functions you need from the SDKs you need
import {initializeApp} from "initializeApp"
import {getFirestore,collection,getDocs}from 'getFirestore'
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut} from 'getAuth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBn7aSHT2FchNqq-8swN10mKoVUmzxHQPo",
  authDomain: "not-webdesign-project.firebaseapp.com",
  projectId: "not-webdesign-project",
  storageBucket: "not-webdesign-project.appspot.com",
  messagingSenderId: "574843458667",
  appId: "1:574843458667:web:168d09ae01ebe59a984d2e",
  measurementId: "G-VC4D0MXYRQ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();



const auth = getAuth();
let file=window.location.href.split('/');
if(file[4]=="register.html"){
  let reg=document.getElementById("registerSub").addEventListener('click',register);
}
if(file[3]=="index.html"){
  isLogged();
}
if(file[3]=="signIn.html"){
  let log=document.getElementById("log").addEventListener('click',logIn);
}
function register(){
  console.log("works");
let email=document.getElementById("email").value;
let password=document.getElementById("pass1").value;
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    signInWithEmailAndPassword(auth, email, password);
    window.localStorage.setItem('user', JSON.stringify(auth.currentUser));
    window.location.replace("/index.html")
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
    if(errorMessage=="Firebase: Error (auth/email-already-in-use).")
    {
      alert("Email is already in use");
    }
    else{
    console.log(errorMessage);
    alert(errorMessage);
    }
  });
}


function isLogged(){
  let user =window.localStorage.getItem('user');
  if(user){
    let links=document.getElementById("links");
 links.removeChild(links.lastChild);
 links.removeChild(links.lastChild);
 links.removeChild(links.lastChild);
 links.removeChild(links.lastChild);
 let li=document.createElement('li');
 let a=document.createElement('a');
 a.text="Log Out";
 a.href="/index.html"
 li.appendChild(a);
 links.appendChild(li);
 li.addEventListener('click',logout);

 let ulink=document.getElementById("ulinks");
 let uli=document.createElement("li");
 let final=JSON.parse(user);
 let ua=document.createElement("a");
 ua.text=final.email;
 uli.appendChild(ua);
 uli.style.marginLeft="320px";
 ulink.appendChild(uli);
  }
}

function logout(){
  signOut(auth);
  window.localStorage.removeItem('user');
  isLogged();
}

function logIn(){

  let email=document.getElementById("email").value;
  let password=document.getElementById("pass").value;
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    window.localStorage.setItem('user', JSON.stringify(auth.currentUser));
    window.location.replace("/index.html");
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    if(errorMessage=="Firebase: Error (auth/invalid-value-(email),-starting-an-object-on-a-scalar-field-invalid-value-(password),-starting-an-object-on-a-scalar-field)."){
      alert("Invalid Email or password");
    }
    else{
    alert(errorMessage);
    }
  });
}


