import React, { useState, useContext, useEffect } from "react";
import Firebase from "firebase";
import { AiFillDelete } from 'react-icons/ai';
import moment from "moment";
import Todo from './Todo';
import { AuthContext } from "./Auth";

const Home = () => {
    let [todos, setTodos] = useState("");
    let [name, setName] = useState("");
    let [day, setDay] = useState("");
    const auth = useContext(AuthContext);

    useEffect(() => {
      if(todos == []){
        getUserData();
      } else {
        writeUserData();
      }
    }, [todos]);

    const writeUserData = () => {
      Firebase.database().ref("/"+auth.currentUser.uid+"/").set(todos);
    };

    const getUserData = () => {
      let ref = Firebase.database().ref("/"+auth.currentUser.uid+"/");
      ref.on("value", snapshot => {
        const state = snapshot.val();
        setTodos(state);
      });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      let newTodo = {name: name, day: day};
      if(todos == null){
        console.log("erre");
        setTodos([newTodo]);
      } else {
        setTodos([...todos, newTodo]);
      }
    }

    /**/

    return (
      <>
        <br />
        <div className="row">
          <div className="col-xl-12">
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group col-md-8">
                  <input
                    type="text"
                    //value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="form-control"
                    placeholder="Add a task"
                  />
                </div>
              </div>
              <div className="form-group col-md-4">
                <input
                  type="datetime-local"
                  //value={day}
                  onChange={(event) => setDay(event.target.value)}
                  className="form-control"
                  placeholder="Add a deadline"
                  min={moment().format("YYYY-MM-DDThh:mm")}
                />
              </div>
              <div className="form-group col-md-2">
                <button type="submit" className="btn btn-primary">
                  Create
                </button>
              </div>
            </form>
            <br />
            <button onClick={() => Firebase.auth().signOut()}>Sign out</button>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            {todos ? (todos.map((todo, i) => <Todo todo={todo} key={i} />)): null}
          </div>
        </div>
      </>
    )
}

export default Home;
