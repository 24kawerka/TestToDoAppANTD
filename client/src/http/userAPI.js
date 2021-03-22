import { $host, $authHost } from './index'
import jwt_decode from 'jwt-decode'

export const registration = async (email, password, firstName, lastName) => {
    const { data } = await $host.post('api/user/registration', { email, password, firstName, lastName, role: 'USER', isOnline: true })
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}
export const login = async (email, password) => {
    const { data } = await $host.post('api/user/login', { email, password })
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}
export const getAllUsers = async () => {
    const { data } = await $authHost.get('api/user/users')
    return data
}
export const getUserTasksForAdmin = async (id) => {
    const { data } = await $authHost.get(`/api/task/tasksforadmin/${id}`)
    return data
}
export const changeFirstName = async (id, firstName) => {
    const { data } = await $authHost.put(`api/user/firstname/${id}`, { firstName })
    return data
}
export const changeLastName = async (id, lastName) => {
    const { data } = await $authHost.put(`api/user/lastname/${id}`, { lastName })
    return data
}
export const deleteUser = async (id) => {
    const { data } = await $authHost.delete(`api/user/users/${id}`)
    return data
}
export const changeIsActive = async (id) => {
    const { data } = await $authHost.put(`api/user/isactive/${id}`)
    return data
}