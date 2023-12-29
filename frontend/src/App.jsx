import { useState, useEffect } from "react";

import loginService from "./services/login";
import bookService from "./services/book";

import Login from "./components/Login";
import Books from "./components/Books";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      bookService.setToken(user.token);
    }
  }, []);

  const login = async (username, password) => {
    const user = await loginService.login(username, password);
    console.log(user);
    bookService.setToken(user.token);
    window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
    setUser(user);
  };

  return (
    <>
      {!user && <Login login={login} />}
      {user && (
        <div>
          <p>{user.username} logged in</p>
          <Books />
        </div>
      )}
    </>
  );
};

export default App;
