import { GET_ISAUTH, GET_USER, SET_ISAUTH, SET_USER } from '../../Constants/actionTypeConstants'

type UserType = {
    email: string
    exp: number
    firstName: string
    iat: number
    id: number
    lastName: string
    role: string
}

type InitialUserStateType = {
    user: any,
    isAuth: boolean
}

const InitialUserState: InitialUserStateType = {
    user: {},
    isAuth: false
}
type getuserReducerActionType = {
    type: typeof GET_USER
}
type getIsAuthReducerActionType = {
    type: typeof GET_ISAUTH
}
type setuserReducerActionType = {
    type: typeof SET_USER,
    responce: UserType
}
type setIsAuthReducerActionType = {
    type: typeof SET_ISAUTH,
    data: boolean
}
type userReducerActionType = getuserReducerActionType | getIsAuthReducerActionType | setuserReducerActionType | setIsAuthReducerActionType

const userReducer = (state = InitialUserState, action: userReducerActionType): InitialUserStateType => {
    switch (action.type) {
        case GET_USER: {
            return {
                ...state

            }
        }
        case GET_ISAUTH: {
            return {
                ...state,
            }
        }
        case SET_USER: {
            return {
                ...state,
                user: action.responce
            }
        }
        case SET_ISAUTH: {
            return {
                ...state,
                isAuth: action.data
            }
        }

        default: return state
    }
}

const setUser = (responce: any) => {
    return {
        type: SET_USER,
        responce
    }
}
const setIsAuth = (data: boolean) => {
    return {
        type: SET_ISAUTH,
        data
    }
}

export { userReducer, setUser, setIsAuth }
export type { InitialUserStateType, UserType }