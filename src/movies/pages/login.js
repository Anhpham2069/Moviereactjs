import React,{useState} from 'react'
import {useHistory} from 'react-router-dom'
import {Row,Col,Form,Input,Button,Spin} from 'antd';
import * as api from '../services/login-sv'
import * as helper from '../helper/comon'
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

const LoginPage = () =>{
  const history = useHistory();
  const[loadingLogin,setLoadingLogin]=useState(false);
  const[messageError,setMessageError]=useState('');
    
  
  const onFinish = async (values) => {
      setLoadingLogin(true);
      const data = await api.loginUser(values.username,values.password);
      if(!helper.isEmptyObject(data)){
        if(data.code === 200){
          setLoadingLogin(false);
          setMessageError('')
          api.saveTokenLogin(data.token_user)
          //cho ve trang home
          history.push('/home')
        }else{
          setLoadingLogin(false);
          setMessageError('tai khoa khong dung');
          api.removeTokenLogin();
        }
      }else {
      setLoadingLogin(false);
      setMessageError('tai khoa khong dung');
      api.removeTokenLogin();
      }
  };
    
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
    return(
        <>
            <Row>
                <Col span={12} offset={6}>
                    <h1 style={{textAlign: 'center',margin:"8px 0px"}}>Login</h1>
                    {messageError !== '' && (<h3 style={{textAlign: 'center',color: 'red',marginBottom: '8px'}}>
                      {messageError}</h3>)}
                <Row>
                    <Col span={12}>
                    <Form
                        {...layout}
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        >
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                            Login
                            </Button>
                            {loadingLogin && (<Spin style={{marginLeft: '10px'}} />)}
                        </Form.Item>
                        </Form>
                    </Col>
                </Row>
                </Col>
            </Row>
        </>
    )
}
export default React.memo(LoginPage)