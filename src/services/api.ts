import axios from 'axios'

const baseURL = process.env.NEXT_PUBLIC_BASEURL;

const api = axios.create({
  baseURL,
});

api.interceptors.request.use(async (config)=>{
  try {
    const token = await sessionStorage.getItem('pokemon-token')
    if(token){
      config.headers!.Authorization = `Bearer ${token}`
    }
    return config
  } catch (error) {
    console.log(error)
  }
})

export default api;