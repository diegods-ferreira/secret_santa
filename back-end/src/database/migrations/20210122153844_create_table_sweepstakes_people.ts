import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('sweepstakes_people', table => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable();

    table
      .integer('sweepstake_id')
      .notNullable()
      .references('id')
      .inTable('sweepstakes');

    table.dateTime('created_at').defaultTo('now()');
    table.dateTime('updated_at').defaultTo('now()');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('sweepstakes_people');
}