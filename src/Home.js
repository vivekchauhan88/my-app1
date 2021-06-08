import React from "react";
//import { AuthContext } from "./Auth";
import { AiFillDelete } from 'react-icons/ai';
import Firebase from "firebase";
//import config from "./config";
import moment from "moment";

class Home extends React.Component {
  constructor(props) {
    super(props);
    //Firebase.initializeApp(config);
    //const {currentUser} = useContext(AuthContext);
    //var message = currentUser?currentUser.email:null
    //console.log("From Home: "+message)
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
    Firebase.database().ref("/user/").set(this.state);
    console.log("DATA SAVED");
  };

  getUserData = () => {
    let ref = Firebase.database().ref("/user/");
    ref.on("value", snapshot => {
      const state = snapshot.val();
      this.setState(state);
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    let name = this.refs.name.value;
    let day = this.refs.day.value;
    //let uid = this.refs.uid.value;
    if (name && day) {
      const uid = new Date().getTime().toString();
      const { todos } = this.state;
      todos.push({ uid, name, day });
      this.setState({ todos });
      console.log("create")
    }

    this.refs.name.value = "";
    this.refs.day.value = "";
    this.refs.uid.value = "";
  };

  removeData = todo => {
    const { todos } = this.state;
    const newState = todos.filter(data => {
      return data.uid !== todo.uid;
    });
    this.setState({ todos: newState });
  };

  updateName = (todo, e) => {
    //this.refs.uid.value = todo.uid;
    //this.refs.name.value = todo.name;
    let name1 = e.target.value;
    const { todos } = this.state;
      const devIndex = todos.findIndex(data => {
        return data.uid === todo.uid;
      });
      console.log(name1)
      todos[devIndex].name = name1;
      this.setState({ todos });
      console.log("edit")
  };

  updateDay = (todo, e) => {
    //this.refs.uid.value = todo.uid;
    //this.refs.name.value = todo.name;
    let day1 = e.target.value;
    const { todos } = this.state;
      const devIndex = todos.findIndex(data => {
        return data.uid === todo.uid;
      });
      console.log(day1)
      todos[devIndex].day = day1;
      this.setState({ todos });
      console.log("edit")
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
                  <div className="form-group col-md-4">
                    <input
                      type="datetime-local"
                      ref="day"
                      className="form-control"
                      placeholder="Add a deadline"
                      min={moment().format("YYYY-MM-DDThh:mm")}
                    />
                  </div>
                  <div className="form-group col-md-2">
                    <button onClick={() => Firebase.auth().signOut()}>Sign out</button>
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
                  <div className="col-md-6">
                    <h5>
                    <input
                      type="text"
                      ref="name1"
                      className="form-control"
                      defaultValue={todo.name}
                      onChange={(e) => this.updateName(todo, e)}
                    />
                    </h5>
                  </div>
                  <div className="col-md-4">
                    <h5>
                    <input
                      type="datetime-local"
                      ref="day1"
                      className="form-control"
                      defaultValue={todo.day}
                      onChange={(e) => this.updateDay(todo, e)}
                      min={moment().format("YYYY-MM-DDThh:mm")}
                    />
                    </h5>
                  </div>
                  
                  <div className="col-md-2">
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

export default Home;