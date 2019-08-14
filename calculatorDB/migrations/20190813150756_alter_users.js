exports.up = function(knex) {
  return knex.schema.table('users', function(table) {
    table.string('hashedPassword', 255);
  });
};

exports.down = function(knex) {
  return knex.schema.table('users', function(table) {
    table.dropColumn('hashedPassword');
  });
};
