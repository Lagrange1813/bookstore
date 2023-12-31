import { useState, useEffect } from "react";
import { Card } from 'antd';
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
      {user && <UserInfo user={user} />}
    </>
  );
};

const UserInfo = ({ user }) => {
  return (
    <div className="m-4">
      <Card title="User Information" bordered={false} className="max-w-lg mx-auto bg-white">
        <p><b>User ID:</b> {user.UserID}</p>
        <p><b>Username:</b> {user.Username}</p>
        <p><b>Name:</b> {user.Name || 'Not provided'}</p>
        <p><b>Address:</b> {user.Address || 'Not provided'}</p>
        <p><b>Email:</b> {user.Email || 'Not provided'}</p>
        <p><b>Account Balance:</b> ${user.AccountBalance}</p>
        <p><b>Credit Rating:</b> {user.CreditRating}</p>
      </Card>
    </div>
  );
};

UserInfo.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Users;
