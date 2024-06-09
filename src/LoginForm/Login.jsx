import React from 'react'
import './Login.css'
import {Button, Card,Flex, Form, Input} from 'antd';
import { FaUser,FaLock } from "react-icons/fa";
import login from '../assets/images/login.png';
import { Link } from 'react-router-dom';

const Login = () => {
    const handleLogin = (values) =>{
        console.log(values);
    };

  return (
   <Card className='form-container'>
     
    <Flex gap='large'>
        {/*form*/}
        <Flex vertical flex={1}>
        <h2 className="form-heading">Login</h2>
            <Form layout='vertical' 
            onFinish={handleLogin} 
            autoComplete='off'
            >
                <Form.Item 
                    label="Email" 
                    name='email'
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email',
                        },
                        {
                            type: 'email',
                            message: 'The email is not valid',
                        },
                    ]}>
                    <Input placeholder="Enter you E-mail"/>
                </Form.Item>

                <Form.Item 
                    label="Password" 
                    name='password'
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password',
                        },
                    ]}>
                    <Input placeholder='Enter you Password'/>
                </Form.Item>
                <Form.Item>
                    <Button 
                        type='primary'
                        htmlType='submit'
                        size='large'
                        className='btn'
                     >
                        Login In
                    </Button>
                </Form.Item>

                <Form.Item>
                    <Link to={"/register"}>
                        <Button size='large' className='btn'>Create an Account</Button>
                    </Link>
                </Form.Item>
            </Form>
        </Flex>
        {/* Image*/}
        <Flex>
            <img src={login} className='login-image'/>
        </Flex>
    </Flex>
   </Card>
  )
}

export default Login

