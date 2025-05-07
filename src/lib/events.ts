import sqlite3 from 'sqlite3'
import {open} from 'sqlite'
import fs from "fs"

let initialized = false;
if (fs.existsSync("./tmp/events.db")) initialized = true;

export const events = await open({
    filename: './tmp/events.db',
    driver: sqlite3.Database
})

if (!initialized) {
    await events.exec('CREATE TABLE events (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, date TEXT)')
}

