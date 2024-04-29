const addDecimals = (num) => {
    return ((Math.round(num * 100)) / 100).toFixed(2);
}

const calcPrices = (state) => {
    //cal items price
    state.itemsPrice = addDecimals(state?.cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0));

    //cal shipping price
    state.shippingPrice = addDecimals(state?.itemsPrice > 1000 ? 0 : 59);

    //cal tax price
    state.taxPrice = addDecimals(Number(0.15 * state?.itemsPrice).toFixed(2));

    //cal total price
    state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
    ).toFixed(2);

    //save to localStorage
    localStorage.setItem('ck_ct', JSON.stringify(state));
}

export {
    calcPrices,
    addDecimals
}