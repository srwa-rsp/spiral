/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up (knex) {
    return knex.schema.createTable('user-responses', function(table) {
        table.increments('id').primary(); 
        table.integer('user_id').unsigned().notNullable(); 
        table.string('question').notNullable(); 
        table.json('answers').notNullable(); 
        table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    await knex.schema.dropTable('user-responses');
  }