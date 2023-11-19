import axios from '../axiosCofig'

export const apiGetProducts = (params) => axios({
    url: '/product',
    method: 'get',
    params
})