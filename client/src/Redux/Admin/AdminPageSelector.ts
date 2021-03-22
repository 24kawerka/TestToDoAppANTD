import { RootState } from '../Utils/reducer';

export default {
    getIsAuth: (state: RootState) => state.users.isAuth,
    getUsers: (state: RootState) => state.users.users,
    getTasksUserForAdmin:(state:RootState)=>state.tasksUserForAdmin.listForAdmin
}