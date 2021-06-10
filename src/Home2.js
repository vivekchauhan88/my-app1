import React, { useState, useContext, useEffect } from "react";
//import { AuthContext } from "./Auth";
import { AiFillDelete } from 'react-icons/ai';
import Firebase from "firebase";
//import config from "./config";
import moment from "moment";
import { AuthContext } from "./Auth";

const Home = () => {
  const [todos, setTodos] = useState("");
  const [name, setName] = useState("");
  //const [day, setDay] = useState("");
  const {currentUser} = useContext(AuthContext);
  //console.log("From home: "+currentUser.email);
  //console.log(todos?"todos is not null":"todos is null here as well")

  useEffect(() => {
    getUserData();
  }, [])

  /*useEffect(() => {
    writeUserData()
  }, [todos]);
  */

  const handleSubmit = (event) => {
   event.preventDefault();

   if (name) {
     const uid = new Date().getTime().toString();
     //const { todos } = this.state;
     var myTodos = [{name: "hello123", uid: "1623322407957"}];
     myTodos.push({ uid, name });
     setTodos(myTodos);
     console.log(todos);
    }
  }

  const writeUserData = () => {
    let path = "/"+currentUser+"/";
    console.log(todos);
    Firebase.database().ref("/").set(todos);
    //console.log("DATA SAVED");
  };

  const getUserData = () => {
    //console.log(currentUser.uid);
    //let path = "/"+currentUser.uid+"/"
    let ref = Firebase.database().ref("/");
    ref.on("value", snapshot => {
      const state = snapshot.val();
      setTodos(state);
      console.log(todos);
    });
  };

  const removeData = todo => {
    const newState = todos.filter(data => {
      return data.uid !== todo.uid;
    });
    console.log(newState);
    setTodos(newState);
    writeUserData();
  };

  //const updateName = (todo, e) => {
    //this.refs.uid.value = todo.uid;
    //this.refs.name.value = todo.name;
    /*let name1 = e.target.value;
    const devIndex = todos.findIndex(data => {
        return data.uid === todo.uid;
    });
    console.log(name1)
    todos[devIndex].name = name1;
    setTodos(todos);
    console.log("edit")*/
  //};

  //const updateDay = (todo, e) => {
    //this.refs.uid.value = todo.uid;
    //this.refs.name.value = todo.name;
    /*let day1 = e.target.value;
    const devIndex = todos.findIndex(data => {
      return data.uid === todo.uid;
    });
    console.log(day1)
    todos[devIndex].day = day1;
    setTodos(todos);
    console.log("edit")*/
  //};

  //<input type="hidden" ref="uid" />

  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <h1>To-do App</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <input
                    type="text"
                    //value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="form-control"
                    placeholder="Add a task"
                  />
                </div>
                {/*<div className="form-group col-md-4">
                  <input
                    type="datetime-local"
                    //value={day}
                    onChange={(event) => setDay(event.target.value)}
                    className="form-control"
                    placeholder="Add a deadline"
                    min={moment().format("YYYY-MM-DDThh:mm")}
                  />
                </div>*/}
              </div>
              <button type="submit" className="btn btn-primary">
                Create
              </button>
            </form>
            <br />
            <button onClick={() => Firebase.auth().signOut()}>Sign out</button>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-xl-12">
            {todos ? (todos.map(todo => )): null}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Home;
