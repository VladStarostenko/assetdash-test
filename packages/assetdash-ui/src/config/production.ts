export const getProdConfig = () => {
  return {
    baseURL: process.env.BASE_URL || 'https://assetdash.herokuapp.com/'
  };
};
