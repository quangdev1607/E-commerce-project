const data = require('./productData.json')


// const newData = (data) => {
//     for (let item of data) {
//         // Xử lý tiền USD
//         if (item.price.startsWith('$')) {

//         }


//     }
// }

const newData = data.map(item => {
    const USD = item.product.price.startsWith('$')
    const VND = item.product.price.includes('VND')
    const adjustedPrice = item.product.price
    if (USD) {
        return Math.round(Number(adjustedPrice.match(/\d/g).join('')) / 100) * 24300
    }
    if (VND) {
        return Math.round(Number(adjustedPrice.match(/\d/g).join('')) / 100)
    }
})

console.log(newData)

