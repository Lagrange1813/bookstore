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
                <Menu
                  mode="inline"
                  defaultSelectedKeys={['1']}
                  style={{ height: '100%', borderRight: 0 }}
                >
                  <Menu.Item key="1" icon={<ReadOutlined />}><Link to="/">Books</Link></Menu.Item>
                  <Menu.Item key="2" icon={<ScheduleOutlined />}><Link to="/shoppingList">ShoppingList</Link></Menu.Item>
                  <Menu.Item key="3" icon={<ShoppingOutlined />}><Link to="/orders">Orders</Link></Menu.Item>
                  <Menu.Item key="4" icon={<UserOutlined />}><Link to="/users">Users</Link></Menu.Item>
                </Menu>
              </Sider>
              <Layout style={{ padding: '0 24px 24px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                  <Breadcrumb.Item>Home</Breadcrumb.Item>
                  <Breadcrumb.Item>List</Breadcrumb.Item>
                  <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
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
