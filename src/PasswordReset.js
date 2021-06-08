import React from 'react';
import firebase from "firebase";
import { useHistory } from "react-router-dom";

function PasswordReset(){
    let history = useHistory()
    function sendPasswordReset(event) {
        event.preventDefault()
        const email = event.target.email.value
        // [START auth_send_password_reset]
        firebase.auth().sendPasswordResetEmail(email)
          .then(() => {
              alert("Password reset email sent!")
            // Password reset email sent!
            // ..
          })
          .catch((error) => {
            //var errorCode = error.code;
            //var errorMessage = error.message;
            // ..
            alert(error)
          });
        // [END auth_send_password_reset]
    }

    function gotoLogin(event) {
        event.preventDefault()
        history.push("/login")
    }
    return (
        <div>
          <h1>Reset Password</h1>
          <form onSubmit={sendPasswordReset}>
            <label>
              Enter your email{' '}
              <input name="email" type="email" placeholder="Email" />
            </label>
            {' '}
            <button type="submit">Reset Password</button>
          </form>
          <button type="submit" onClick={gotoLogin}>To login</button>
        </div>
    );
}

export default PasswordReset