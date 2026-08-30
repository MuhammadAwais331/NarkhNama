// import products from "../data/products";
// import priceHistory from "../data/priceHistory";

// export const getProductsWithCurrentPrice = () => {
//     return products.map(product => {
//         const history = priceHistory.filter(
//             item => item.productId === product.id
//         );

//         const latest = history.at(-1);

//         return {
//              ...product,
//             currentPrice: latest?.price ?? 0,
//             history,
//         };
//     });
// };