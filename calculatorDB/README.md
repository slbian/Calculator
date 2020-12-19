Database startup notes:

`brew install postgres`

`initdb /usr/local/var/postgres`

might need `chmod`

https://stackoverflow.com/questions/10431426/trying-to-get-postgres-setup-in-my-environment-but-cant-seem-to-get-permissions

`pg_ctl -D /usr/local/var/postgres -l logfile start`

may need `brew services restart postgresql`

`createdb calculatordb`

`psql calculatordb`

\dt to see all tables
\q to quit

`npm run knex <command>` (ex. npm run knex migrate:make create_logins) or npx knex [command]

`npm run knex migrate:latest`
`npm run knex seed:run`

there's no way to run the latest seed
