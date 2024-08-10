/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    await knex.schema.createTable('stages', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.integer('tier').notNullable();
        table.string('description').notNullable();
        table.string('color').notNullable();
        table.string('challenges').notNullable();
        table.json('doing').notNullable();
        table.json('being').notNullable();
        table.json('thinking').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    await knex.schema.dropTable('stages');
  }
