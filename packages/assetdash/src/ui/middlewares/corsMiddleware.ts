export const corsMiddleware = (config) => (req, res, next) => {
  res.header('Access-Control-Allow-Origin', config.accessControlAllowOrigin);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
};
