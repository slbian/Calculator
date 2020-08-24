exports.up = function (knex) {
  return knex.schema.createTable("logins", function (table) {
    table.increments("id");
    table
      .integer("userId")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .notNullable();
    table.timestamps();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("logins");
};
