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

export const initialCategories = {
  TV: {
    description: 'Latest range of high-definition televisions.',
    imageUrl:
      'https://img.freepik.com/free-photo/smart-tv-screen-with-copy-space-wooden-table_53876-102019.jpg?ga=GA1.1.1950963813.1721542835&semt=ais_hybrid',
    products: [],
  },
  SmartPhone: {
    description: 'Cutting-edge smartphones with advanced features.',
    imageUrl:
      'https://img.freepik.com/free-vector/realistic-front-view-smartphone-mockup-mobile-iphone-purple-frame-with-blank-white-display-vector_90220-959.jpg?ga=GA1.1.1950963813.1721542835&semt=ais_hybrid',
    products: [],
  },
  'Home Appliances': {
    description: 'Essential home appliances for everyday convenience.',
    imageUrl:
      'https://img.freepik.com/free-vector/household-appliances-realistic-composition_1284-65307.jpg?ga=GA1.1.1950963813.1721542835&semt=ais_hybrid',
    products: [],
  },
  'Computing Devices': {
    description: 'Powerful computing devices for work and play.',
    imageUrl:
      'https://img.freepik.com/free-photo/still-life-books-versus-technology_23-2150062920.jpg?ga=GA1.1.1950963813.1721542835&semt=ais_hybrid',
    products: [],
  },
  'Audio Devices': {
    description: 'High-quality audio devices for immersive sound.',
    imageUrl:
      'https://img.freepik.com/free-photo/modern-wireless-earphones-with-case-displayed-round-podium-with-soft-shadows_23-2150808014.jpg?ga=GA1.1.1950963813.1721542835&semt=ais_hybrid',
    products: [],
  },
  'Gaming Devices': {
    description: 'Top-of-the-line gaming devices for ultimate entertainment.',
    imageUrl:
      'https://img.freepik.com/free-photo/view-3d-vr-gaming-set_23-2151005781.jpg?ga=GA1.1.1950963813.1721542835&semt=ais_hybrid',
    products: [],
  },
};
