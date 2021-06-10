import React from "react";
import Firebase from "firebase";
import Todo from './Todo';

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      todos: []
    };
  }

  componentDidMount(){
    this.getUserData();
  }

  writeUserData = () => {
    Firebase.database().ref("/").set(this.state.todos);
    console.log("DATA SAVED");
  };

  getUserData = () => {
    let ref = Firebase.database().ref("/");
    ref.on("value", snapshot => {
      const state = snapshot.val();
      this.setState({ todos: state });
    });
  };

  render(){
    const { todos } = this.state;
    if(todos == null) return "App loading ...";
    return (
      <div className="row">
        <div className="col-xl-12">
          {
            todos.map(todo => <Todo todo={todo} />)
          }
        </div>
      </div>
    )
  }
}

export default Home;
