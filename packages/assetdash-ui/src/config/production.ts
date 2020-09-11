export const getProdConfig = () => {
  return {
    baseURL: process.env.BASE_URL || 'https://assetdash.herokuapp.com/',
    oneSignalAppId: process.env.ONE_SIGNAL_APP_ID || '',
    ga_measurement_id: process.env.GA_MEASUREMENT_ID
  };
};
