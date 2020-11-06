import React from 'react';
import {useHistory} from 'react-router-dom'
import { Layout, Menu } from 'antd';
import { NavLink, useLocation } from 'react-router-dom';
import * as api from '../services/login-sv'

const { Header } = Layout;

const HeaderComponent = () => {
  const history = useHistory();
  const location = useLocation();
  const pathName = location.pathname;
  const user = api.getUserName();

  const logOut = () =>{
    api.removeTokenLogin();
    history.push('/login')
  }

  return (
    <Header>
      <NavLink to="/">
        <div className="logo" />
      </NavLink>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={pathName}>
        <Menu.Item key="/home">
          <NavLink to="/home">Trang chu</NavLink> 
        </Menu.Item>
        <Menu.Item key="/up-coming">
          <NavLink to="/up-coming">Phim sap cong chieu</NavLink>
        </Menu.Item>
        <Menu.Item key="/search">
          <NavLink to="/search">Tim kiem phim</NavLink>
        </Menu.Item>
        {user === null && (
          <Menu.Item key="/login">
          <NavLink to="/login">Dang nhap</NavLink>
        </Menu.Item>
        )}
        {user !== null && (
          <Menu.Item>
            Hi : {user}
          </Menu.Item>
        )}
         {user !== null && (
          <Menu.Item key="/logout">
            <span onClick={() => logOut()}>Thoat</span>
          </Menu.Item>
        )}
        
      </Menu>
    </Header>
  )
}
export default React.memo(HeaderComponent);