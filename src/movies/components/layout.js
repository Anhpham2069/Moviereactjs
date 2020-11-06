import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import HeaderComponent from './header';
import FooterComponent from './footer';
import './layout.css';

const { Content } = Layout;
const LayoutComponent = (props) => {
  return (
    <Layout className="layout">
      <HeaderComponent/>
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content">
          {props.children}
        </div>
      </Content>
      <FooterComponent/>
    </Layout>
  )
}
LayoutComponent.propTypes = {
  children: PropTypes.node
}
export default React.memo(LayoutComponent);