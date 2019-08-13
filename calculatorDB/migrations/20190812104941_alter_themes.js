exports.up = function(knex) {
  return knex.schema.table('themes', function(table) {
    table.string('description', 255);
    table.string('secondaryColor', 255);
  });
};

exports.down = function(knex) {
  return knex.schema.table('themes', function(table) {
    table.dropColumn('description');
    table.dropColumn('secondaryColor');
  });
};
