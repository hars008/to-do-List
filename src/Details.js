import React from 'react'
import './Details.css'
const Details = (props) => {
  if(props.user){
let userDetail=(props.user.Data)
let todoDetail=(props.user.TodoData[0])
// console.log(userDetail , todoDetail)
  
  return (
    <div>
      <div className="pannel">
        <div className="hdr">
          <div className="heading">
            <h1>User Details</h1>
          </div>
          <div className="close" onClick={props.close}>
            <button>X</button>
          </div>
        </div>
        <div className="content">
          <table>
            <thead></thead>
            <tbody>
              <tr>
                <td>ToDo ID</td>
                <td> {todoDetail.todoId}</td>
              </tr>
              <tr>
                <td>ToDo Title</td>
                <td>{todoDetail.todoTitle}</td>
              </tr>
              <tr>
                <td>User ID</td>
                <td>{userDetail.id}</td>
              </tr>
              <tr>
                <td>User Name</td>
                <td>{userDetail.name}</td>
              </tr>
              <tr>
                <td>User Email</td>
                <td>{userDetail.email}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
  }
}

export default Details
