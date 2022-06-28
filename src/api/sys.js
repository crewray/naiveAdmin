import {get,post,put,delete_} from '@/utils/request'

export const getUserListApi= (data={})=>{
    return get('/user',data)
}
export const createUserApi=(data)=>{
    return post('/user',data)
}
export const updateUserApi=(data)=>{
    return put('/user',data)
}
export const deleteUserApi=(id)=>{
    return delete_('/user',id)
}
    
export const getRoleListApi= (data={})=>{
    return get('/role',data)
}
export const createRoleApi=(data)=>{
    return post('/role',data)
}
export const updateRoleApi=(data)=>{
    return put('/role',data)
}
export const deleteRoleApi=(id)=>{
    return delete_('/role',id)
}

// 获取菜单
export const getMenuApi=()=>{
    return get('/menu')
}
