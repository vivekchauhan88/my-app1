import React from "react";
//import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import Register from "./Register";
import Signin from "./Signin";
import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";
import PasswordReset from "./PasswordReset";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Signin} />
          <Route exact path="/signup" component={Register} />
          <Route exact path="/reset" component={PasswordReset} />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;