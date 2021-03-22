import { socket } from "../../Constants/utilsConstants"
import { createTask, deleteTask, doneTask, getList } from "../../http/listAPI"
import { setUserList, TaskType } from "../User/listReducer"



const createTaskThunk = (data: TaskType) => async (dispatch: any) => {
    await createTask(data.title, data.isDone = false)
    getList().then((responce: any) => {
        dispatch(setUserList(
            responce.sort((a: any, b: any) => a.id - b.id)
        ))
        const createdItem = responce[responce.length - 1]
        socket.emit('createTask', createdItem)
    })
}

const doneTaskThunk = (newTask: any) => async (dispatch: any) => {
    await doneTask(newTask.id)
    getList().then((responce: any) => {
        dispatch(setUserList(
            responce.sort((a: any, b: any) => a.id - b.id)
        ))
    })
}
const deleteTaskCreatorThunk = (data: any) => async (dispatch: any) => {
    await deleteTask(data.id)
}



export { createTaskThunk, doneTaskThunk, deleteTaskCreatorThunk }