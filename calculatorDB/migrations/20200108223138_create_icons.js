exports.up = function(knex) {
    return knex.schema.createTable('icons', function(table) {
      table.increments('id');
      table.string('iconPath', 255).notNullable();
      table.string('type', 255).notNullable();
      table.string('description', 255).notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('icons');
  };
  