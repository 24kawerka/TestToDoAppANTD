import React from 'react'
import { registration } from '../../http/userAPI'
import '../../Styles/auth.scss'
import { setIsAuth, setUser } from '../../Redux/User/userReducer'
import { useHistory } from 'react-router-dom'
import { LOGIN_ROUTE } from '../../Constants/routeConstants'
import { useDispatch } from 'react-redux'
import { socket } from '../../Constants/utilsConstants'
import { Typography } from 'antd';
import { Form, Input, Button } from 'antd';
import "antd/dist/antd.css";


const Registration = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const onFinish = async (data: any) => {
        const responce = await registration(data.email, data.password, data.firstName, data.lastName)
        dispatch(setUser(responce))
        dispatch(setIsAuth(true))
        socket.emit('newUser')
        history.push(LOGIN_ROUTE)
    }
    const { Title } = Typography;
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };
    return (
        <div className='container'>
            <div className='login-form'>
                <Title>РЕГИСТРАЦИЯ</Title>
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Имя"
                        name="firstName"
                        rules={[{ required: true, message: 'Имя не указано!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Фамилия"
                        name="lastName"
                        rules={[{ required: true, message: 'Фамилия не указана!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Почта"
                        name="email"
                        rules={[{ required: true, message: 'Почта не указана!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Пароль"
                        name="password"
                        rules={[{ required: true, message: 'Пароль не указан!' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="default" htmlType="submit">
                            Создать
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export { Registration }
