// Update with your config settings.

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'calculatordb',
      // user: 'username',
      // password: 'password',
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};
