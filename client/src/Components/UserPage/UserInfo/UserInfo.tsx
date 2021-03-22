import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import userSelector from '../../../Redux/User/UserPageSelector'
import '../../../Styles/User/userInfo.scss'
import { UserType } from '../../../Redux/User/userReducer'
import { changeFirstName, changeLastName } from '../../../http/userAPI'
import { useHistory } from 'react-router-dom'
import { LOGIN_ROUTE } from '../../../Constants/routeConstants'
import { socket } from '../../../Constants/utilsConstants'
import { Button, Typography, Form, Input } from 'antd'
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons'

const UserInfo = () => {
    const user: UserType = useSelector(userSelector.getUser)
    const history = useHistory()
    const [firstNameInput, showFirstNameInput] = useState(1)
    const [lastNameInput, showLastNameInput] = useState(1)
    const { Title } = Typography

    type newFirstNameType = {
        newFirstName: string
    }
    type newLastNameType = {
        newLastName: string
    }
    const changeUserFirstName = (newFirstName: newFirstNameType) => {
        changeFirstName(user.id, newFirstName.newFirstName).then(resp => {
            socket.emit('changeFirstName', user.id)
            alert('Имя изменено, перезайдите в аккаунт');
            history.push(LOGIN_ROUTE)

        })
    }
    const changeUserLastName = (newLastName: newLastNameType) => {
        changeLastName(user.id, newLastName.newLastName).then(resp => {
            socket.emit('changeLastName', user.id)
            alert('Фамилия изменена, перезайдите в аккаунт');
            history.push(LOGIN_ROUTE)
        })
    }
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };
    return (
        <>
            <div className='name-container'>
                {firstNameInput === 1 ?
                    <> <Title level={3}>{user.firstName}</Title>
                        <Button onClick={() => showFirstNameInput(2)}>
                            Сменить
                        </Button>
                    </>
                    :
                    <Form
                        layout='inline'
                        name="newFirstName"
                        onFinish={changeUserFirstName}
                    >
                        <Form.Item
                            name="newFirstName"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <div className='user-input'>
                                <Button type="text" htmlType="submit">
                                    <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: '20px' }} />
                                </Button>
                                <Button type="text" htmlType="button" onClick={() => showFirstNameInput(1)}>
                                    <CloseCircleTwoTone twoToneColor="#eb2f96" style={{ fontSize: '20px' }} />
                                </Button>
                            </div>
                        </Form.Item>
                    </Form>
                }
            </div>
            <div className='name-container'>
                {lastNameInput === 1 ?
                    <> <Title level={3}>{user.lastName}</Title>
                        <Button onClick={() => showLastNameInput(2)}>
                            Сменить
                        </Button>
                    </>
                    :
                    <Form
                        layout='inline'
                        name="newFirstName"
                        onFinish={changeUserLastName}
                    >
                        <Form.Item
                            name="newFirstName"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <div className='user-input'>
                                <Button type="text" htmlType="submit">
                                    <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: '20px' }} />
                                </Button>
                                <Button type="text" htmlType="button" onClick={() => showLastNameInput(1)}>
                                    <CloseCircleTwoTone twoToneColor="#eb2f96" style={{ fontSize: '20px' }} />
                                </Button>
                            </div>
                        </Form.Item>
                    </Form>
                }
            </div>
        </>
    )
}
export { UserInfo }