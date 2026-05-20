// Calculate price after discount
export const getPriceAfterDiscount = (price, discount) => {
    const numPrice = typeof price === 'string' ? parseInt(price) : price;
    return Math.round((numPrice - (numPrice * discount) / 100) * 100) / 100;
};
