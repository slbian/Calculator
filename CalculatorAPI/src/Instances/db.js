export default require('knex')({
  client: 'pg',
  connection: {
    database: 'calculatordb',
  },
});
