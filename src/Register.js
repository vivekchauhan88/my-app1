import React from 'react';
import firebase from "firebase";
import { useHistory } from "react-router-dom";

function Register(){
    let history = useHistory()
    function handleSignUp(event){
        event.preventDefault()
        console.log("Signing up..")
        var email = event.target.email.value;
        var password = event.target.password.value;
        firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in 
    var user = userCredential.user;
    console.log(user.email)
    //firebase.auth().currentUser.sendEmailVerification()
    user.sendEmailVerification()
    history.push("/")
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.error(error)
    alert(error)
    // ..
  });
    }
    return (
        <div>
          <h1>Sign up</h1>
          <form onSubmit={handleSignUp}>
            <label>
              Email{' '}
              <input name="email" type="email" placeholder="Email" />
            </label>
            <br />
            <label>
              Password{' '}
              <input name="password" type="password" placeholder="Password" />
            </label>
            <br />
            <button type="submit">Sign Up</button>
          </form>
          <a href="/login">Already have an account</a>
        </div>
    );
}

export default Register;