// const env = process.env.NODE_ENV; // 'dev' or 'test'

// const dev = {
//  app: {
//    port: parseInt(process.env.DEV_APP_PORT) || 3000
//  },
//  db: {
//    host: process.env.DEV_DB_HOST || 'localhost',
//    port: parseInt(process.env.DEV_DB_PORT) || 3306,
//    name: process.env.DEV_DB_NAME || 'db'
//  }
// };
// const test = {
//  app: {
//    port: parseInt(process.env.TEST_APP_PORT) || 3000
//  },
//  db: {
//    host: process.env.TEST_DB_HOST || 'localhost',
//    port: parseInt(process.env.TEST_DB_PORT) || 3306,
//    name: process.env.TEST_DB_NAME || 'test'
//  }
// };

// const config = {
//  dev,
//  test
// };

// module.exports = config[env];

const config = {
    app: {
      port: 3000
    },
    db: {
      host: 'localhost',
      port: 3306,
      name: 'bts_test',
      user: 'root',
      password: 'password',
    }
};

module.exports = config;
