const now = new Date().toISOString();
const past = new Date(new Date().getTime() - 1000000000).toISOString();

exports.seed = function(knex) {
  return knex('logins')
    .del()
    .then(function() {
      return knex('logins').insert([
        { userId: 1, created_at: now, updated_at: now },
        { userId: 1, created_at: past, updated_at: past },
        { userId: 2, created_at: now, updated_at: now },
        { userId: 3, created_at: now, updated_at: now },
      ]);
    });
};
