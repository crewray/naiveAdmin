import axios from "axios";


const service=axios.create({
    baseURL:import.meta.env.VITE_BASE_URL,
    timeout:2*60*1000,
})

export const get= (url,data={})=>{
    return service.get(url,{params:data})
}
export const post= (url,data)=>{
    return service.post(url,data)
}

export const put= (url,data)=>{
    return service.put(url+'/'+data.id,data)
}
export const delete_= (url,id)=>{
    return service.delete(url+'/'+id)
}
