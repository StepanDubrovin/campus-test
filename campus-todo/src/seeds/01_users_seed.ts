import { Knex } from "knex";
import { v7 as uuidv7 } from 'uuid';
import bcrypt from "bcrypt";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

    const hashedPassword = await bcrypt.hash("12345678", 10);

    // Inserts seed entries
    await knex("users").insert([
        {   
            id: uuidv7(), 
            firstName: "Иванов", 
            lastName: "Иванов", 
            email: "ivan1@gmail.com", 
            password: hashedPassword
        },
        {   
            id: uuidv7(), 
            firstName: "Петр", 
            lastName: "Петров", 
            email: "petr@gmail.com", 
            password: hashedPassword
        }, 
        {   
            id: uuidv7(), 
            firstName: "Сергей", 
            lastName: "Сергеев", 
            email: "serg@gmail.com", 
            password: hashedPassword
        }
    ]);
};
