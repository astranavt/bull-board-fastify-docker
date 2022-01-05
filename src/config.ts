const REDIS_CONFIG = {
  connection: {
    port: Number(process.env.REDIS_PORT) || 6379,
    host: process.env.REDIS_HOST || 'localhost',
    db: Number(process.env.REDIS_DB) || 0,
    password: process.env.REDIS_PASSWORD,
  },
};

const BULL_BOARD_CONFIG = {
  prefix: process.env.BULL_PREFIX || 'bull',
  port: process.env.PORT || 3000,
  appRoot: process.env.APP_ROOT || '/ui',
};

export { BULL_BOARD_CONFIG, REDIS_CONFIG };
