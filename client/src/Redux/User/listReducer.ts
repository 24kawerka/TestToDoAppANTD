import { SET_LIST, GET_LIST, SET_NEW_TASK } from '../../Constants/actionTypeConstants'

type TaskType = { title: string, isDone: boolean, id: number, userId: number, updatedAt: string }

type InitialListStateType = {
    list: Array<TaskType>,
    isAuth: boolean
}
const InitialListState: InitialListStateType = {
    list: [],
    isAuth: true
}

type getListActionType = {
    type: typeof GET_LIST
}
type setListActionType = {
    type: typeof SET_LIST,
    responce: Array<TaskType>
}
type setNewTaskType = {
    type: typeof SET_NEW_TASK,
    task: TaskType
}
type listReducerActionType = getListActionType | setListActionType | setNewTaskType

const listReducer = (state = InitialListState, action: listReducerActionType): InitialListStateType => {
    switch (action.type) {
        case SET_LIST: {
            return {
                ...state,
                list: action.responce.map(p => p),
            }
        }
        case GET_LIST: {
            return {
                ...state,
            }
        }
        case SET_NEW_TASK: {
            state.list.push(action.task)
            return {
                ...state,
            }
        }
        default: return state
    }
}

const setUserList = (responce: Array<TaskType>) => {
    return {
        type: SET_LIST,
        responce
    }
}
const getUserList = () => {
    return {
        type: GET_LIST
    }
}
const setNewTask = (task: TaskType) => {
    return {
        type: SET_NEW_TASK,
        task
    }
}



export { listReducer, setUserList, getUserList, setNewTask }
export type { InitialListStateType, TaskType }