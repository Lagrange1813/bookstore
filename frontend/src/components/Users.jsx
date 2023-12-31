import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import usersService from "../services/users";

const Users = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const action = async () => {
      const user = await usersService.getUserInfo();
      setUser(user);
      console.log(user);
    }
    action();
  }, []);

  return (
    <>
      <h1>Users</h1>
      {user && <UserInfo user={user} />}
    </>
  );
};

const UserInfo = ({ user }) => {
  return (
    <div>
      <h2>User Information</h2>
      <p><b>User ID:</b> {user.UserID}</p>
      <p><b>Username:</b> {user.Username}</p>
      <p><b>Name:</b> {user.Name || 'Not provided'}</p>
      <p><b>Address:</b> {user.Address || 'Not provided'}</p>
      <p><b>Email:</b> {user.Email || 'Not provided'}</p>
      <p><b>Account Balance:</b> ${user.AccountBalance}</p>
      <p><b>Credit Rating:</b> {user.CreditRating}</p>
    </div>
  );
};

UserInfo.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Users;
