const now = new Date().toISOString();

const users = [
  {
    username: "sbian",
    created_at: now,
    updated_at: now,
    themeId: 1,
    hashedPassword:
      "$argon2i$v=19$m=4096,t=3,p=1$FjfnJA8D++gR6u+MM4Cd0Q$zHfv7F6dFAfNZdrTv0fvbVJ/IPJQI/s8j5m9vt5WGGM",
  },
  {
    username: "chuck",
    created_at: now,
    updated_at: now,
    themeId: 2,
    hashedPassword:
      "$argon2i$v=19$m=4096,t=3,p=1$FjfnJA8D++gR6u+MM4Cd0Q$zHfv7F6dFAfNZdrTv0fvbVJ/IPJQI/s8j5m9vt5WGGM",
  },
  {
    username: "ellen",
    created_at: now,
    updated_at: now,
    themeId: 3,
    hashedPassword:
      "$argon2i$v=19$m=4096,t=3,p=1$FjfnJA8D++gR6u+MM4Cd0Q$zHfv7F6dFAfNZdrTv0fvbVJ/IPJQI/s8j5m9vt5WGGM",
  },
  {
    username: "dylan",
    created_at: now,
    updated_at: now,
    themeId: 3,
    hashedPassword:
      "$argon2i$v=19$m=4096,t=3,p=1$FjfnJA8D++gR6u+MM4Cd0Q$zHfv7F6dFAfNZdrTv0fvbVJ/IPJQI/s8j5m9vt5WGGM",
  },
  {
    username: "eloise",
    created_at: now,
    updated_at: now,
    themeId: 3,
    hashedPassword:
      "$argon2i$v=19$m=4096,t=3,p=1$FjfnJA8D++gR6u+MM4Cd0Q$zHfv7F6dFAfNZdrTv0fvbVJ/IPJQI/s8j5m9vt5WGGM",
  },
];

exports.seed = function (knex) {
  return knex("users")
    .del()
    .then(function () {
      return knex("users").insert(users);
    });
};

exports.users = users;
