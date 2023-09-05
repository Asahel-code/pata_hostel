const generateOrderNo = () => {
    let orderNo = ''
    for (let i = 0; i <= 8; i++) {
        const randVal = Math.round(Math.random() * 9);
        orderNo += randVal;
    }
    return orderNo;
}

module.exports = {
    generateOrderNo
}