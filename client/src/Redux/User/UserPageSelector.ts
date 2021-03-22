import { RootState } from '../Utils/reducer';

export default {
    setUserList: (state: RootState) => state.list.list,
    getIsAuth: (state: RootState) => state.list.isAuth,
    getUser: (state: RootState) => state.user.user,
    getIsAuthUser: (state: RootState) => state.user.isAuth,
    getUserList: (state: RootState) => state.list.list,
}