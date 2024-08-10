export async function up(knex) {
    await knex.schema.createTable('user_result', (table) => {
      table.increments('id').primary();
      table.integer('user_id').unsigned().references('users.id')
      table.json('stages').notNullable();
      table.text('feedback').defaultTo(''); 
      table.text('challenges').defaultTo(''); 
      table.text('opportunities').defaultTo(''); 
      table.json('roadmap').notNullable(); 
      table.json('bookRecom').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    });
  }
  
  export async function down(knex) {
    await knex.schema.dropTable('user_result');
  }
  