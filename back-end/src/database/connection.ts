import knex from 'knex';

const connection = knex({
  client: 'pg',
  connection: {
    host : 'localhost',
    user : 'postgres',
    password : 'docker',
    database : 'secret_santa'
  },
  useNullAsDefault: true
});

export default connection;