import React, { useState, useEffect } from "react";
import Firebase from "firebase";
import Todo from './Todo';

const Home = () => {
  const [todos, setTodos] = useState("");

  const readData = () => {
    let ref = Firebase.database().ref("/");
    ref.on("value", snapshot => {
      const state = snapshot.val();
      setTodos(state);
    });
  }

  const removeData = () => {
    console.log(removeData);
  }

  /*useEffect(() => {
    readData();
  });*/

  return (
    <div>
    {todos ? todos.map(todo => <Todo todo={todo} delete={removeData} />) : "Loading ..."}
    </div>
  )
}

export default Home;
