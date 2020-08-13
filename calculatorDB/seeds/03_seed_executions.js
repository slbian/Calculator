const { users } = require("./02_seed_users");

const now = new Date().toISOString();
const TOTAL_PER = 10000;
exports.seed = async function (knex) {
  await knex("executions").del();

  const x = getLotsOfExecutions();

  await knex("executions").insert(x[0]);
  console.log("...");
  await knex("executions").insert(x[1]);
  console.log("...");
  await knex("executions").insert(x[2]);
  console.log("...");
  await knex("executions").insert(x[3]);
  console.log("...");
  await knex("executions").insert(x[4]);
  console.log("...");
  await knex("executions").insert(x[0]);
  console.log("...");
  await knex("executions").insert(x[1]);
  console.log("...");
  await knex("executions").insert(x[2]);
  console.log("...");
  await knex("executions").insert(x[3]);
  console.log("...");
  await knex("executions").insert(x[4]);
  console.log("...");
  await knex("executions").insert(x[0]);
  console.log("...");
  await knex("executions").insert(x[1]);
  console.log("...");
  await knex("executions").insert(x[2]);
  console.log("...");
  await knex("executions").insert(x[3]);
  console.log("...");
  await knex("executions").insert(x[4]);
  console.log("...");
  await knex("executions").insert(x[0]);
  console.log("...");
  await knex("executions").insert(x[1]);
  console.log("...");
  await knex("executions").insert(x[2]);
  console.log("...");
  await knex("executions").insert(x[3]);
  console.log("...");
  await knex("executions").insert(x[4]);
  console.log("...");

  console.log("SUCCESS");
};

function getLotsOfExecutions() {
  const equations = ["3+4+5+6", "3-4-5-6", "12+2+5-4", "13+3+5-1", "53-4+5+6"];

  const all = [];

  users.forEach((user, j) => {
    const forUser = [];
    for (let i = 0; i < TOTAL_PER; i++) {
      const equation = equations[Math.floor(Math.random() * equations.length)];
      const score = Number(eval(equation).toString().length);
      forUser.push({
        userId: j + 1,
        equation,
        score,
        created_at: now,
        updated_at: now,
      });
    }
    all.push(forUser);
  });

  return all;
}
