import axios from 'axios'

export function request(config) {
    const instance = axios.create({
        baseURL: 'http://47.103.198.84:8097',
        timeout: 5000,
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    })

    instance.interceptors.request.use(config => {
        let token = window.localStorage.getItem("token")
        if(token) {
            config.headers.token = token
            console.log(config.headers.token)
        }
        return config
    })

    return instance(config)
}



