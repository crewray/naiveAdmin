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
// 获取角色菜单
export const getRoleMenuApi=(id)=>{
    return get('/role/'+id)
}
//添加菜单
export const createMenuApi=(data)=>{
    return post('/menu',data)
}
//获取菜单项
export const getMenuItemApi=(path)=>{
    return get('/menu'+path)
}
//删除菜单项
export const deleteMenuApi=(id)=>{
    return delete_('/menu',id)
}

export const test=(data)=>{
    return put('/demo',data)
}