import { db } from "./database"
import { Task } from "../models/Task"
import { Status } from "../models/Status"
import { Priority } from "../models/Priority"

export function loadTasks(): Task[] {
  const rows = db.prepare("SELECT * FROM tasks").all()
  return rows.map((row: any) => ({
    title:     row.title,
    status:    row.status as Status,
    priority:  row.priority as Priority,
    deadline:  row.deadline,
    completed: row.completed === 1
  }))
}


export function insertTask(task: Task): void {
  db.prepare(
    "INSERT INTO tasks (title, status, priority, deadline, completed) VALUES (?, ?, ?, ?, ?)"
  ).run(task.title, task.status, task.priority, task.deadline, task.completed ? 1 : 0)
}

export function updateTask(id: number, status: Status, completed: number): void {
  db.prepare(
    "UPDATE tasks SET status = ?, completed = ? WHERE id = ?"
  ).run(status, completed, id)
}

export function deleteTaskById(id: number): void {
  db.prepare("DELETE FROM tasks WHERE id = ?").run(id)
}