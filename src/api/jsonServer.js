import axios from 'axios'

export default axios.create({
    // baseURL changes everytime npm run tunnel is started
    baseURL: 'https://35fb-216-165-95-172.ngrok-free.app'
})