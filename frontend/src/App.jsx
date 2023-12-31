import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Button } from 'antd';
import { ReadOutlined, ScheduleOutlined, ShoppingOutlined, UserOutlined } from '@ant-design/icons';
const { Header, Content, Sider } = Layout;

import loginService from './services/login';
import Login from './components/Login';
import Books from './components/Books';
import ShoppingList from './components/ShoppingList';
import Orders from './components/Orders';
import Users from './components/Users';
import { setToken } from './services/apiService';

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

  const logout = () => {
    setUser(null);
    setToken(null);
    window.localStorage.removeItem("loggedUser");
  };

  const menuItems = [
    { label: <Link to="/">Books</Link>, key: '1', icon: <ReadOutlined /> },
    { label: <Link to="/shoppingList">ShoppingList</Link>, key: '2', icon: <ScheduleOutlined /> },
    { label: <Link to="/orders">Orders</Link>, key: '3', icon: <ShoppingOutlined /> },
    { label: <Link to="/users">Users</Link>, key: '4', icon: <UserOutlined /> },
  ];

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'List', path: '/list' },
    { label: 'App', path: '/app' },
  ];

  return (
    <Router>
      <Layout className="min-h-screen">
        {!user ? (
          <Login login={login} />
        ) : (
          <Layout>
            <Header className="header bg-blue-600 flex justify-between items-center px-4">
              <div className="text-white text-lg">Bookstore App</div>
              <Button type="default" className='bg-white' onClick={logout}>
                Logout
              </Button>
            </Header>
            <Layout>
              <Sider width={200} className="site-layout-background">
                <Menu items={menuItems} mode="inline" defaultSelectedKeys={['1']} style={{ height: '100%', borderRight: 0 }} />
              </Sider>
              <Layout style={{ padding: '0 24px 24px' }}>
                <Breadcrumb items={breadcrumbItems} style={{ margin: '16px 0' }} />
                <Content
                  className="site-layout-background"
                  style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                  }}
                >
                  <Routes>
                    <Route path="/" element={<Books />} />
                    <Route path="/shoppingList" element={<ShoppingList />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/users" element={<Users />} />
                  </Routes>
                </Content>
              </Layout>
            </Layout>
          </Layout>
        )}
      </Layout>
      <div className="text-center py-4">
        <i>Bookstore @2023 Created By LagrangePoint </i>
      </div>
    </Router>
  );
};

export default App;
