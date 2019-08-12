exports.up = function(knex) {
  return knex.schema.table('users', function(table) {
    table
      .integer('themeId')
      .references('id')
      .inTable('themes')
      .defaultTo('1')
      .onDelete('CASCADE');
  });
};

exports.down = function(knex) {
  return knex.schema.table('users', function(table) {
    table.dropColumn('themeId');
  });
};
