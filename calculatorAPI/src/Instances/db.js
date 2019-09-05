export default require('knex')({
  client: 'pg',
  connection: {
    database: process.env.DATABASE_NAME,
  },
});
