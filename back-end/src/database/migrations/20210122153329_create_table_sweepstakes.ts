import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('sweepstakes', table => {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.string('description').notNullable();
    table.integer('status').defaultTo(0);
    table.dateTime('created_at').defaultTo('now()');
    table.dateTime('updated_at').defaultTo('now()');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('sweepstakes');
}