import { ADMIN_ROUTE, USER_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from './Constants/routeConstants';
import { AdminPage } from "./Components/AdminPage/AdminPage";
import { UserPage } from './Components/UserPage/UserPage';
import { Auth } from './Components/Login/Auth';
import { Registration } from './Components/Login/Registration';

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: AdminPage
    },
    {
        path: USER_ROUTE,
        Component: UserPage
    }
]
export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Registration

    }
]