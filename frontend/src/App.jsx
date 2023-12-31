import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import loginService from "./services/login";

import Login from "./components/Login";
import Books from "./components/Books";
import ShoppingList from "./components/ShoppingList";
import Orders from "./components/Orders";
import Users from "./components/Users";
import { setToken } from "./services/apiService";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      console.log(loggedUserJSON);
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      setToken(user.token);
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
          setToken(null);
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
    setToken(user.token);
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
              setToken(null);
              window.localStorage.removeItem("loggedUser");
            }}
          >
            logout
          </button>
          <Router>
            <div>
              <Link to="/">Books</Link>
              <Link to="/shoppingList">ShoppingList</Link>
              <Link to="/orders">Orders</Link>
              <Link to="/users">Users</Link>
            </div>

            <Routes>
              <Route path="/" element={<Books />} />
              <Route path="/shoppingList" element={<ShoppingList />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/users" element={<Users />} />
            </Routes>

            <div>
              <i>Bookstore @2023 Created By LagrangePoint </i>
            </div>
          </Router>
        </div>
      )}
    </>
  );
};

export default App;
