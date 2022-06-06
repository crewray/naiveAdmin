import axios from "axios";


const service=axios.create({
    baseURL:import.meta.env.VITE_BASE_URL,
    timeout:2*60*1000,
})

export const get= (url,data={})=>{
    return service.get(url,{params:data})
}
export const post= (url,data={})=>{
    return service.post(url,data)
}

