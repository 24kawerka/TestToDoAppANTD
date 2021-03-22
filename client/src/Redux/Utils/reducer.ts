import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import { listReducer } from '../User/listReducer';
import { usersReducer } from '../Admin/usersReducer';
import { userReducer } from '../User/userReducer';
import { tasksUserForAdminReducer } from '../Admin/tasksUserForAmin';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['list', 'users', 'user',]
}

const rootReducer = combineReducers({
    list: listReducer,
    users: usersReducer,
    user: userReducer,
    tasksUserForAdmin: tasksUserForAdminReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default persistReducer<RootState>(persistConfig, rootReducer);