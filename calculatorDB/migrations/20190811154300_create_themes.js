exports.up = function(knex) {
  return knex.schema.createTable('themes', function(table) {
    table.increments('id');
    table.string('themePath', 255).notNullable();
    table.string('color', 255).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('themes');
};
