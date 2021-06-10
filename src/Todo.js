import React from "react";
import { AiFillDelete } from 'react-icons/ai';
import moment from "moment";

const Todo = (props) => {
  const removeData = () => {

  }
  return (
    <>
      <div
        key={props.todo.uid}
        className="list-group-item"
      >
      <div className="row">
          <div className="col-md-6">
            <h5>
            <input
              type="text"
              className="form-control"
              defaultValue={props.todo.name}
              //onChange={(e) => updateName(todo, e)}
            />
            </h5>
          </div>
          <div className="col-md-4">
          <h5>
          <input
            type="datetime-local"
            className="form-control"
            defaultValue={props.todo.day}
            //onChange={(e) => updateDay(todo, e)}
            min={moment().format("YYYY-MM-DDThh:mm")}
          />
          </h5>
        </div>
        <div className="col-md-2">
          <div
            onClick={() => props.removeData}
            className="btn btn-link"
          >
            <AiFillDelete />
          </div>
        </div>
      </div>
      </div>
    </>

  )
}

export default Todo;
