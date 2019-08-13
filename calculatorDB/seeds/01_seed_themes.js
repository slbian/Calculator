const now = new Date().toISOString();
const past = new Date(new Date().getTime() - 1000000000).toISOString();

exports.seed = function(knex) {
  return knex('themes')
    .del()
    .then(function() {
      return knex('themes').insert([
        {
          id: 1,
          themePath: 'https://jooinn.com/images/green-plants-82.jpg',
          color: 'green',
          description: 'Foliage',
          secondaryColor: 'rosybrown',
        },
        {
          id: 2,
          themePath:
            'https://cdn.apartmenttherapy.info/image/fetch/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_4:3/https%3A%2F%2Fstorage.googleapis.com%2Fgen-atmedia%2F3%2F2017%2F10%2Fdfb3c39cdaf6624d2637b738f582d19987cbb453.jpeg',
          color: 'pink',
          description: 'Cake',
          secondaryColor: 'darkslategray',
        },
        {
          id: 3,
          themePath:
            'https://s3-us-west-1.amazonaws.com/contentlab.studiod/getty/246623d990be42b7a60270fc0e188750.jpg',
          color: 'tomato',
          description: 'Tomatoes',
          secondaryColor: 'gold',
        },
        {
          id: 4,
          themePath:
            'https://images.pexels.com/photos/1287142/pexels-photo-1287142.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
          color: 'violet',
          description: 'Purple Sky',
          secondaryColor: 'midnightblue',
        },
      ]);
    });
};
