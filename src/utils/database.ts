import Database from "better-sqlite3"
import BetterSqlite3 from "better-sqlite3"

const db: BetterSqlite3.Database = new Database("flowdesk.db")

db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    title     TEXT    NOT NULL,
    status    TEXT    NOT NULL DEFAULT 'Todo',
    priority  TEXT    NOT NULL DEFAULT 'Medium',
    deadline  TEXT    NOT NULL,
    completed INTEGER NOT NULL DEFAULT 0
  )
`)

export { db }