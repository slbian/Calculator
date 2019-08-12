const now = new Date().toISOString();
exports.seed = function(knex) {
  return knex('executions')
    .del()
    .then(function() {
      return knex('executions').insert([
        {
          userId: '1',
          equation: '3+4+5+6',
          score: 2,
          created_at: now,
          updated_at: now,
        },
        {
          userId: '1',
          equation: '1231273918*7',
          score: 30,
          created_at: now,
          updated_at: now,
        },
        {
          userId: '2',
          equation: '3+4',
          score: 1,
          created_at: now,
          updated_at: now,
        },
      ]);
    });
};
