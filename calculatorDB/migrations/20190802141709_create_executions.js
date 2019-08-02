exports.up = function(knex) {
  return knex.schema.createTable('executions', function(table) {
    table.increments('id');
    table.string('equation').notNullable();
    table.decimal('score').notNullable();
    table
      .integer('userId')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .notNullable();
    table.timestamps();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('executions');
};
