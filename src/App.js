import "./App.css";
import React, { useState, useEffect } from "react";
import Details from "./Details";
import axios from "axios";

axios.defaults.baseURL = "https://backendapitodo.onrender.com/";
axios.defaults.withCredentials = true;

function App() {
  const [data, setData] = useState();
  const [user, setUser] = useState();
  const [searchInput, setSearchInput] = useState("");

  const fetchJson = () => {
    axios
      .get("/todos")
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        setData(data);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
  useEffect(() => {
    fetchJson();
  }, []);

  const viewUser = (e) => {
    let id = e.currentTarget.id;
    let todoData = data
      .filter((item) => {
        return Number(item.id) === Number(id);
      })
      .map((item) => {
        return { todoId: item.id, todoTitle: item.title, uid: item.userId };
      });

    axios
      .get("/users/" + Number(todoData[0].uid))
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        setUser({ Data: data, TodoData: todoData });
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  const handleClose = () => {
    setUser(null);
  };

  return (
    <>
      <div className="tbl">
        <div>
          <div className="headr">
            <div className="heading">
              <div>
                <h1>ToDos</h1>
              </div>

              <div className="search">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </div>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>ToDo ID</th>
                <th>Title</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {searchInput.length > 0
                ? data
                    .filter((item) => {
                      return item.title
                        .toLowerCase()
                        .includes(searchInput.toLowerCase());
                    })
                    .map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{item.id}</td>
                          <td>{item.title}</td>
                          <td>
                            {item.completed ? "Completed" : "Incompleted"}
                          </td>
                          <td>
                            <button id={item.userId} onClick={viewUser}>
                              View User
                            </button>
                          </td>
                        </tr>
                      );
                    })
                : data &&
                  data.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.title}</td>
                        <td>{item.completed ? "Completed" : "Incompleted"}</td>
                        <td>
                          <button id={item.id} onClick={viewUser}>
                            View User
                          </button>
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
        </div>
      </div>
      <Details user={user} close={handleClose} />
    </>
  );
}

export default App;
