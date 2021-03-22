import { $authHost } from './index'


const getList = async () => {
    const { data } = await $authHost.get('api/task')
    return data
}
const createTask = async (title, isDone) => {
    const { data } = await $authHost.post('api/task', { title, isDone })
    return data
}
const deleteTask = async (id) => {
    const { data } = await $authHost.delete(`api/task/${id}`)
    return data
}

const changeTask = async (id, title, isDone) => {
    const { data } = await $authHost.put(`api/task/${id}`, { title, isDone })
    return data
}
const doneTask = async (id) => {
    const { data } = await $authHost.put(`/api/task/done/${id}`)
    return data
}

export { getList, createTask, deleteTask, changeTask, doneTask }