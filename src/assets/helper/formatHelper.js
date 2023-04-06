// const currencyFormat = (number = 0) => {
// return new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'IDR' }).format(number)
// }

const data = {
    currenyFormat : (number) => {
        return new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'IDR' }).format(number)
    }
}

export default data;