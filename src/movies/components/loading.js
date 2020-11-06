import React from 'react';
import { Spin } from 'antd';
import './loading.css';

const LoadingData = () => {
  return(
    <div className="loading">
      <Spin/>
    </div>
  )
}
export default React.memo(LoadingData);