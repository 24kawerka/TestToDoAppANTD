import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUserList, TaskType } from '../../Redux/User/listReducer'
import UserSelector from '../../Redux/User/UserPageSelector'
import { Task } from './Task/Task'
import '../../Styles/User/userPage.scss'
import { UserInfo } from './UserInfo/UserInfo'
import { setUser, setIsAuth } from '../../Redux/User/userReducer'
import { useHistory } from 'react-router-dom'
import { LOGIN_ROUTE } from '../../Constants/routeConstants'
import { getList } from '../../http/listAPI'
import { createTaskThunk } from '../../Redux/Utils/createThunk'
import { Button, Col, Row, Form, Input } from 'antd'



const UserPage = () => {

    const list = useSelector(UserSelector.getUserList)
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect((() => {
        getList().then((responce: any) => {
            dispatch(setUserList(
                responce.sort((a: any, b: any) => a.id - b.id)
            ))
        })
    }), [])
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };

    const logOut = () => {
        dispatch(setIsAuth(false))
        dispatch(setUser({}))
        history.push(LOGIN_ROUTE)
    }

    const onFinish = (data: TaskType) => {
        dispatch(createTaskThunk(data))
    }

    return (
        <div className='app-container'>
            <Row>
                <Col span={12}>
                    <UserInfo />
                    <Button onClick={logOut} className='log-out-button' type="primary" danger>
                        Выйти
                    </Button>
                </Col>
                <Col span={12}>
                    <Form
                        {...layout}
                        name="data"
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label="Новая задача"
                            name="title"
                            rules={[{ required: true, message: 'Задача не указана!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button type="default" htmlType="submit">
                                Создать
                        </Button>
                        </Form.Item>
                    </Form>
                    <div className="tasks">
                        {list.map((task: TaskType) =>
                            <Task key={task.id} task={task} />
                        )}
                    </div>
                </Col>
            </Row>
        </div>
    )
}
export { UserPage }