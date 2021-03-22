import React from 'react'
import { useDispatch } from 'react-redux'
import { changeIsActive, deleteUser, getAllUsers, getUserTasksForAdmin } from '../../http/userAPI'
import '../../Styles/Admin/admin.scss'
import { setTasksForAdmin } from '../../Redux/Admin/tasksUserForAmin'
import { getUsers, UsersType } from '../../Redux/Admin/usersReducer'
import { Button } from 'antd';
import "antd/dist/antd.css";
import { UnlockTwoTone, LockTwoTone, CloseCircleTwoTone } from "@ant-design/icons"


type UserType = {
    users: {
        firstName: string,
        lastName: string,
        id: number,
        isOnline: boolean
    }
}

const UserForAdmin = (props: UserType) => {
    const dispatch = useDispatch()
    const showUserTasks = (id: number) => {
        getUserTasksForAdmin(id).then(resp => {
            dispatch(setTasksForAdmin(
                resp.sort((a: any, b: any) => a.id - b.id)
            ))
        })
    }
    const deleteUserCreator = async (id: number) => {
        await deleteUser(id).then(responce => {
            getAllUsers().then(resp => {
                dispatch(getUsers(
                    resp.sort((a: any, b: any) => a.id - b.id).filter((user: UsersType) => user.role === 'USER')
                ))
            })
        })
    }
    const setIsActive = async (id: number) => {
        await changeIsActive(id).then(resp => {
            getAllUsers().then(resp => {
                dispatch(getUsers(
                    resp.sort((a: any, b: any) => a.id - b.id).filter((user: UsersType) => user.role === 'USER')
                ))
            })
            alert('Изменен статус пользователя!')
        })

    }
    return (
        <div className='user-list-container'>
            <Button
                onClick={() => showUserTasks(props.users.id)} >
                {`${props.users.firstName} ${props.users.lastName}`}
            </Button>
            {props.users.isOnline === true ?
                <Button type="text" onClick={() => setIsActive(props.users.id)}><UnlockTwoTone twoToneColor="#FFFF00" /></Button>
                :
                <Button type="text" onClick={() => setIsActive(props.users.id)}><LockTwoTone twoToneColor="#FFFF00" /></Button>
            }
            <Button type="text" onClick={() => deleteUserCreator(props.users.id)}><CloseCircleTwoTone twoToneColor="#eb2f96" /></Button>

        </div>
    )
}



export { UserForAdmin }