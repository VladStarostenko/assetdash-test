export const getTestConfig = () => {
  return {
    baseURL: 'http://localhost:3000/',
    oneSignalAppId: process.env.ONE_SIGNAL_APP_ID || ''
  };
};
