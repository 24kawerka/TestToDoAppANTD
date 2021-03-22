import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeTask, getList } from '../../../http/listAPI'
import '../../../Styles/User/task.scss'
import UserSelector from '../../../Redux/User/UserPageSelector'
import { setUserList, TaskType } from '../../../Redux/User/listReducer'
import { useForm } from 'react-hook-form'
import { doneTaskThunk, deleteTaskCreatorThunk } from '../../../Redux/Utils/createThunk'
import { socket } from '../../../Constants/utilsConstants'
import { Typography, Button, Form, Input } from 'antd'
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons'

type PropsTaskType = {
    task: {
        title: string,
        isDone: boolean,
        id: number,
        userId: number,
        updatedAt: string
    }
}

const Task = (props: PropsTaskType) => {
    const { handleSubmit, register } = useForm()
    const list = useSelector(UserSelector.getUserList)
    const dispatch = useDispatch()
    const [inputField, showInputField] = useState(1)
    const { Text } = Typography

    const onSubmit = async (newTask: any) => {
        await changeTask(props.task.id, newTask.newTask, props.task.isDone).then(resp => {
            getList().then((responce: any) => {
                dispatch(setUserList(
                    responce.sort((a: any, b: any) => a.id - b.id)
                ))
            })
        })
        socket.emit('changeTask', props.task.userId)
        showInputField(1)
    }

    const deleteTaskCreator = (data: any) => {
        dispatch(deleteTaskCreatorThunk(data))
        const newList = list.filter((task: TaskType) => task.id !== data.id)
        dispatch(setUserList(
            newList.sort((a: any, b: any) => a.id - b.id)
        ))
        socket.emit('deleteTask', (data))
    }
    const doneTaskCreator = (newTask: any) => {
        dispatch(doneTaskThunk(newTask))
        socket.emit('doneTask', (props.task.userId))
    }
    const showTime = () => {
        alert(`Закончена ${props.task.updatedAt.slice(0, 10)} в ${props.task.updatedAt.slice(11, -5)}`)
    }
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };
    return (
        <div className='task-container'>
            {inputField === 1 ?
                <div className='title-task-container'>
                    {props.task.isDone === false ?
                        <Text strong>{props.task.title}</Text>
                        :
                        <Text delete strong>{props.task.title}</Text>
                    }
                    {props.task.isDone === false ?
                        <Button onClick={() => showInputField(2)} style={{ backgroundColor: 'yellow' }}>
                            Изменить
                        </Button>
                        :
                        null}
                </div>
                :
                <Form
                    layout='inline'
                    name="data"
                    onFinish={onSubmit}
                >
                    <div className='title-task-input'>
                        <Form.Item
                            name="newTask"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <div className='title-task-input'>
                                <Button type="text" htmlType="submit">
                                    <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: '20px' }} />
                                </Button>
                                <Button type="text" htmlType="button" onClick={() => showInputField(1)} >
                                    <CloseCircleTwoTone twoToneColor="#eb2f96" style={{ fontSize: '20px' }} />
                                </Button>
                            </div>
                        </Form.Item>
                    </div>
                </Form>
            }
            {props.task.isDone === false ?
                <Button onClick={() => doneTaskCreator(props.task)} style={{ backgroundColor: 'green' }}>Завершить</Button>
                :
                <>
                    <Button onClick={showTime} style={{ backgroundColor: 'grey' }}>
                        Закончена
                </Button>
                </>
            }
            <Button onClick={() => deleteTaskCreator(props.task)} danger type="primary">
                Удалить
            </Button>

        </div >
    )
}
export { Task }
