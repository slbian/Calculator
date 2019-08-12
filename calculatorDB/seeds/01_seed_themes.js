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
        },
        {
          id: 2,
          themePath:
            'https://cdn.apartmenttherapy.info/image/fetch/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_4:3/https%3A%2F%2Fstorage.googleapis.com%2Fgen-atmedia%2F3%2F2017%2F10%2Fdfb3c39cdaf6624d2637b738f582d19987cbb453.jpeg',
          color: 'pink',
        },
        {
          id: 3,
          themePath:
            'https://www.leisurepro.com/blog/wp-content/uploads/2019/04/shutterstock_387066889.jpg',
          color: 'tomato',
        },
        {
          id: 4,
          themePath:
            'https://picalls.com/wp-content/uploads/2018/03/Amazing-violet-sky-1280x854.jpeg',
          color: 'violet',
        },
      ]);
    });
};
