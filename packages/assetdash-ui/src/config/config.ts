let baseURL;

console.log(process.env.NODE_ENV);

switch (process.env.NODE_ENV) {
  case 'production':
    baseURL = process.env.BACKEND_HOST;
    break;
  case 'test':
    baseURL = 'http://localhost:3000/';
    break;
  case 'development':
    baseURL = 'http://localhost:3000/';
    break;
  default:
    throw TypeError('Invalid environment');
}

console.log(baseURL);

export const config = Object.freeze({baseURL: baseURL});

export type Config = typeof config;
