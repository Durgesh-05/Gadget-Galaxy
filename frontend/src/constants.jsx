export const url = 'http://localhost:8000';

export const initCartObject = (
  productId,
  productName,
  productImage,
  productPrice,
  count = 1
) => {
  return {
    productId,
    productName,
    productImage,
    productPrice,
    count,
  };
};
