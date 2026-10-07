import Database from "better-sqlite3";

const db = new Database("water.db");

db.exec(`
        CREATE TABLE IF NOT EXISTS water_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        amount INTEGER NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

export default db;