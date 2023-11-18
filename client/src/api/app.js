import axios from '../axiosCofig'

export const apiGetCategories = () => axios({
    url: '/productcategory',
    method: 'get'
})
