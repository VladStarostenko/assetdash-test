export const config = Object.freeze({
  port: Number(process.env.PORT) || 3000,
});

export type Config = typeof config;
