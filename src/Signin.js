import React from 'react';
import firebase from "firebase";
import { useHistory } from "react-router-dom";

function Signin(){
    let history = useHistory()
    function handleSignin(event){
        event.preventDefault()
        console.log("Signing in..")
        var email = event.target.email.value;
        var password = event.target.password.value;
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          console.log(user.email)
          //console.log(user.emailVerified)
          history.replace("/")
          // ...

        })
        .catch((error) => {
          //var errorCode = error.code;
          var errorMessage = error.message;
          console.error(errorMessage)
          alert(error)
        });
    }

    function resetPage(event) {
        event.preventDefault()
        history.push("/reset")
    }
    return (
        <div>
          <h1>Log in</h1>
          <form onSubmit={handleSignin}>
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
            <button type="submit">Log in</button>
            {' '}
            <button type="submit" onClick={resetPage}>Forgot Password</button>
          </form>
          <a href="/signup">Do not have an account</a>
        </div>
    );
}

export default Signin
