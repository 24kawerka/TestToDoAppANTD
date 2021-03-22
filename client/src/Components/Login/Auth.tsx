import React from 'react'
import { useDispatch } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom'
import { ADMIN_ROUTE, REGISTRATION_ROUTE, USER_ROUTE } from '../../Constants/routeConstants'
import { login } from '../../http/userAPI'
import { setIsAuth, setUser } from '../../Redux/User/userReducer'
import '../../Styles/auth.scss'
import { Typography } from 'antd';
import { Form, Input, Button } from 'antd';
import "antd/dist/antd.css";


type DataLoginType = {
    email: string,
    password: string
}
const Auth = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const onFinish = async (data: DataLoginType) => {
        try {
            const responce: any = await login(data.email, data.password)
            dispatch(setUser(responce))
            dispatch(setIsAuth(true))
            if (responce.role === "ADMIN") {
                history.push(ADMIN_ROUTE + `?id=${responce.id}`)
            } else {
                history.push(USER_ROUTE + `?id=${responce.id}`)
            }
        }
        catch (error) {
            alert(error.request.response.slice(12, -2));

        }
    }
    const { Title, Text } = Typography;

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
                <Title>TODO ПРИЛОЖЕНИЕ</Title>
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
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
                            Войти
                        </Button>
                    </Form.Item>
                    <NavLink to={REGISTRATION_ROUTE}>
                        <div className="regist-link">
                            <Text strong underline>Создать аккаунт</Text>
                        </div>
                    </NavLink>
                </Form>
            </div>
        </div>
    )
}

export { Auth }
