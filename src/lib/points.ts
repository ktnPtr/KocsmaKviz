import sqlite3 from 'sqlite3'
import {open} from 'sqlite'
import fs from "fs"

let initialized = false;
if (fs.existsSync("./tmp/points.db")) initialized = true;

export const points = await open({
    filename: './tmp/points.db',
    driver: sqlite3.Database
})

if (!initialized) {
    await points.exec('CREATE TABLE points (id INTEGER PRIMARY KEY AUTOINCREMENT, team_name TEXT, season INTEGER, points INTEGER)')
}

