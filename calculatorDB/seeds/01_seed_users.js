const now = new Date().toISOString();
exports.seed = function(knex) {
  return knex('users')
    .del()
    .then(function() {
      return knex('users').insert([
        {
          id: 1,
          username: 'sbian',
          created_at: now,
          updated_at: now,
          theme: 'pink',
        },
        {
          id: 2,
          username: 'chuck',
          created_at: now,
          updated_at: now,
          theme: 'tomato',
        },
        {
          id: 3,
          username: 'ellen',
          created_at: now,
          updated_at: now,
          theme: 'violet',
        },
      ]);
    });
};
