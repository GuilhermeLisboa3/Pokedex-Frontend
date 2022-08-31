import api from './api'

interface RegisterParams {
    name: string;
    email: string;
    password: string;
}
interface LoginParams {
    email: string;
    password: string;
}
const authService = {
    register:async(params: RegisterParams)=>{
        const res = await api.post('/register',params)
            .catch(error=>{
                if(error.response.status === 400){
                    return error.response
                }
                return error
            })
        return res
    },
    login:async(params:LoginParams)=>{
        const res = await api.post('/login',params)
            .catch(error =>{
                if(error.response.status === 400){
                    return error.response
                }
                return error
            })
            if(res.status === 200){
                sessionStorage.setItem('pokemon-token', res.data.token)
            }
            return res
    },
    delete: async()=>{
        const res = await api.delete('/user')
        .catch(error =>{
            if(error.response.status === 400){
                return error.response
            }
            return error
        })
        return res
    }
}
export default authService