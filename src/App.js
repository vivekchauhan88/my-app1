import React from "react";

import { AiFillEdit, AiFillDelete } from 'react-icons/ai';

import Firebase from "firebase";
import config from "./config";

class App extends React.Component {
  constructor(props) {
    super(props);
    Firebase.initializeApp(config);

    this.state = {
      developers: []
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
      const { developers } = this.state;
      const devIndex = developers.findIndex(data => {
        return data.uid === uid;
      });
      developers[devIndex].name = name;
      this.setState({ developers });
    } else if (name) {
      const uid = new Date().getTime().toString();
      const { developers } = this.state;
      developers.push({ uid, name });
      this.setState({ developers });
    }

    this.refs.name.value = "";
    this.refs.uid.value = "";
  };

  removeData = developer => {
    const { developers } = this.state;
    const newState = developers.filter(data => {
      return data.uid !== developer.uid;
    });
    this.setState({ developers: newState });
  };

  updateData = developer => {
    this.refs.uid.value = developer.uid;
    this.refs.name.value = developer.name;
  };

  render() {
    const { developers } = this.state;
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
              {developers.map(developer => (
                <div
                  key={developer.uid}
                  className="list-group-item" 
                >
                <div className="row">
                  <div className="col-9">
                    <h5>{developer.name}</h5>
                  </div>
                  <div className="col">
                    <icon
                      onClick={() => this.updateData(developer)}
                      className="btn btn-link"
                    >
                      <AiFillEdit />
                    </icon>
                    <icon
                      onClick={() => this.removeData(developer)}
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