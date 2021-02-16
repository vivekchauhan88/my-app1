import React from "react";

import { AiFillEdit, AiFillDelete } from 'react-icons/ai';

import Firebase from "firebase";
import config from "./config";

class App extends React.Component {
  constructor(props) {
    super(props);
    Firebase.initializeApp(config);

    this.state = {
      todos: []
    };
  }

  componentDidMount() {
    this.getUserData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      this.writeUserData();
    }
  }

  writeUserData = () => {
    Firebase.database()
      .ref("/")
      .set(this.state);
    console.log("DATA SAVED");
  };

  getUserData = () => {
    let ref = Firebase.database().ref("/");
    ref.on("value", snapshot => {
      const state = snapshot.val();
      this.setState(state);
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    let name = this.refs.name.value;
    let uid = this.refs.uid.value;

    if (uid && name) {
      const { todos } = this.state;
      const devIndex = todos.findIndex(data => {
        return data.uid === uid;
      });
      todos[devIndex].name = name;
      this.setState({ todos });
    } else if (name) {
      const uid = new Date().getTime().toString();
      const { todos } = this.state;
      todos.push({ uid, name });
      this.setState({ todos });
    }

    this.refs.name.value = "";
    this.refs.uid.value = "";
  };

  removeData = todo => {
    const { todos } = this.state;
    const newState = todos.filter(data => {
      return data.uid !== todo.uid;
    });
    this.setState({ todos: newState });
  };

  updateData = todo => {
    this.refs.uid.value = todo.uid;
    this.refs.name.value = todo.name;
  };

  render() {
    const { todos } = this.state;
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
              <form onSubmit={this.handleSubmit}>
                <div className="form-row">
                  <input type="hidden" ref="uid" />
                  <div className="form-group col-md-6">
                    <input
                      type="text"
                      ref="name"
                      className="form-control"
                      placeholder="Add a task"
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">
                  Create
                </button>
              </form>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-xl-12">
              {todos.map(todo => (
                <div
                  key={todo.uid}
                  className="list-group-item" 
                >
                <div className="row">
                  <div className="col-10">
                    <h5>{todo.name}</h5>
                  </div>
                  <div className="col">
                    <icon
                      onClick={() => this.updateData(todo)}
                      className="btn btn-link"
                    >
                      <AiFillEdit />
                    </icon>
                    <icon
                      onClick={() => this.removeData(todo)}
                      className="btn btn-link"
                    >
                      <AiFillDelete />
                    </icon>
                  </div>  
                </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;