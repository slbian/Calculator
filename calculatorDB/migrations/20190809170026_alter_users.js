exports.up = function(knex) {
  return knex.schema.table('users', function(table) {
    table
      .string('theme', 30)
      .notNullable()
      .defaultTo('pink');
  });
};

exports.down = function(knex) {
  return knex.schema.table('users', function(table) {
    table.dropColumn('theme');
  });
};
