import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable('tasks', function(table) {
            table.uuid('id').primary();
            table.string('title').notNullable();
            table.text('description');
            table.enu('status', ['todo', 'in_progress', 'done']).notNullable().defaultTo('todo')
            table.timestamp('createdAt').defaultTo(knex.fn.now());
            table.timestamp('updatedAt').defaultTo(knex.fn.now());
            table.uuid('creatorId').unsigned().notNullable()
                .references('id').inTable('users').onDelete('CASCADE')
        })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .dropTableIfExists('tasks')
}

