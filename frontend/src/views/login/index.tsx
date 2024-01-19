import { useNavigate } from "react-router-dom";
import { Form, Input, Button } from 'antd';
import { useState, useEffect } from 'react';
import aiIcon from "../../assets/img/LOGO+TEXT.svg";
import Beta from "../../assets/img/CommunityTag.svg?react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import style from './login.module.scss'
import CustomError from '@/contant/index'
import { fetchLogin } from '@/axios/index'

function Login() {
    useEffect(() => {
        document.title = 'TaskingAI | Authentication';
    }, [])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const onFinish = async (val: object) => {
        setLoading(true)
        try {
            const res = await fetchLogin(val)
            console.log(res)
            localStorage.setItem('token', res.data.token)
            await navigate('/project/models')
            toast.success('Signin successful')
        } catch (error) {
            if (error instanceof CustomError) {
                toast.error(error.response.data.error.message)
            }
        }
        setLoading(false)

    }
 
    return (
        <>
            <div className={style.login}>
                <div className={style["ai-header"]}>
                    <img src={aiIcon} alt="social-icon"></img>
                    <Beta style={{ marginLeft: '12px' }} />
                </div>
                <div className={style["welCome-font"]}>Welcome back</div>
                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username.',
                            },
                      
                        ]}
                    >
                        <Input placeholder='Enter your username' className={style["input-edit"]} />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password.',
                            },
                        ]}
                    >
                        <Input placeholder="Enter your password" type="password" className={style["input-edit"]} />
                    </Form.Item>
                    <div className={style.rememeber}>


                    </div>
                    <Form.Item>
                        <Button
                            htmlType="submit"
                            className={style["submit-btn"]}
                            loading={loading}
                        >
                            Sign in
                        </Button>
                    </Form.Item>
                </Form>
            </div>

        </>

    )
}
export default Login