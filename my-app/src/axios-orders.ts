import axios from 'axios'

export const instance=axios.create({
    baseURL:'https://sim-react-burger-default-rtdb.firebaseio.com/'
})