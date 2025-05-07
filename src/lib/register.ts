import sqlite3 from 'sqlite3'
import {open} from 'sqlite'
import fs from "fs"

let initialized = false;
if (fs.existsSync("./tmp/register.db")) initialized = true;

export const register = await open({
    filename: './tmp/register.db',
    driver: sqlite3.Database
})

if (!initialized) {
    await register.exec('CREATE TABLE registrations (id INTEGER PRIMARY KEY AUTOINCREMENT, team_name TEXT, event_id INTEGER, participants INTEGER)')
}

