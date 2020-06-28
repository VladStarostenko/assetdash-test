let baseURL;

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

export const config = Object.freeze({baseURL: baseURL});

export type Config = typeof config;
