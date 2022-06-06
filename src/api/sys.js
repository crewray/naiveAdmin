import {get,post} from '@/utils/request'

export const getUserList= (data={})=>{
    return get('/user',data)
}
export const getRoleList= (data={})=>{
    return get('/roleList',data)
}