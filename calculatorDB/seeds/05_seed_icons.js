const now = new Date().toISOString();
const past = new Date(new Date().getTime() - 1000000000).toISOString();

exports.seed = function(knex) {
  return knex('icons')
    .del()
    .then(function() {
      return knex('icons').insert([
        {
          id: 1,
          iconPath:
            'https://image.flaticon.com/icons/png/512/25/25629.png',
          type: 'down_arrow',
          description: 'open profile config',
        },
        {
          id: 2,
          iconPath: 'https://image.flaticon.com/icons/png/512/25/25649.png',
          type: 'up_arrow',
          description: 'close profile config',
        },
      ]);
    });
};
