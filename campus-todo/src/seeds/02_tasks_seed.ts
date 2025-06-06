import { Knex } from "knex";
import { v7 as uuidv7 } from 'uuid';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("tasks").del();

    const existingUsers = await knex('users').select('id').limit(1);
    if (existingUsers.length === 0) {
        throw new Error('There is not a single user in the users table..');
    }

    const creatorId = existingUsers[0].id as string;

    // Inserts seed entries
    await knex("tasks").insert([
        { 
            id: uuidv7(), 
            title: "Выполнить Task1",
            description: "Выполнить Task1 HTML",
            status: "todo",
            creatorId
        },
        { 
            id: uuidv7(), 
            title: "Выполнить Task2",
            description: "Выполнить Task2 CSS",
            status: "in_progress",
            creatorId
        },
        { 
            id: uuidv7(), 
            title: "Выполнить Task3",
            description: "Выполнить Task3 JS",
            status: "done",
            creatorId
        },
    ]);
};
