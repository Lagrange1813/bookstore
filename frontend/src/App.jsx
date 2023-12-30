import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import loginService from "./services/login";

import Login from "./components/Login";
import Books from "./components/Books";
import Users from "./components/Users";
import Orders from "./components/Orders";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      console.log(loggedUserJSON);
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    } else {
      console.log("no logged user");
    }
  }, []);

  useEffect(() => {
    const action = async () => {
      const loggedUserJSON = window.localStorage.getItem("loggedUser");
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON);
        const result = await loginService.verify(user.token);
        if (!result) {
          setUser(null);
          window.localStorage.removeItem("loggedUser");
        }
      }
    };
    action();
  }, []);

  const login = async (username, password) => {
    const user = await loginService.login(username, password);
    console.log(user);
    setUser(user);
    window.localStorage.setItem("loggedUser", JSON.stringify(user));
  };

  return (
    <>
      {!user && <Login login={login} />}
      {user && (
        <div>
          <p>{user.username} logged in</p>
          <button
            onClick={() => {
              setUser(null);
              window.localStorage.removeItem("loggedUser");
            }}
          >
            logout
          </button>
          <Router>
            <div>
              <Link to="/">Books</Link>
              <Link to="/orders">Orders</Link>
              <Link to="/users">Users</Link>
            </div>

            <Routes>
              <Route path="/" element={<Books />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/users" element={<Users />} />
            </Routes>

            <div>
              <i>Note app, Department of Computer Science 2022</i>
            </div>
          </Router>
        </div>
      )}
    </>
  );
};

export default App;
