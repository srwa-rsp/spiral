/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
import bcrypt from 'bcrypt' 
export async function seed(knex) {
    await knex('users').del();
    const hashedPassword = await bcrypt.hash('123456', 10);
    await knex('users').insert([
        
            {
              id: 1,
              name: "serwa",
              email:"serwa@gmail.com",
              password: hashedPassword,
            },
            {
              id: 2,
              name: "alina",
              email:"alina@gmail.com",
              password: hashedPassword,
            },

          

    ]);
  };