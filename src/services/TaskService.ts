import { Task } from "../models/Task"
import { Status } from "../models/Status"
import { Priority } from "../models/Priority"
import { loadTasks, insertTask, updateTask, deleteTaskById } from "../utils/storage"

// Load dữ liệu khi khởi động
const taskList: Task[] = loadTasks()

// Thêm task mới
export function addTask(title: string, priority: Priority, deadline: string): void {
  const newTask: Task = {
    title: title,
    status: Status.Todo,
    priority: priority,
    deadline: deadline,
    completed: false
  }
  taskList.push(newTask)
  insertTask(newTask)
  console.log(`✓ Added: "${title}" | ${priority} | Due: ${deadline}`)
}

export function completeTask(index: number): void {
  if (!taskList[index]) {
    console.log("Task not found.")
    return
  }
  taskList[index].status = Status.Done
  taskList[index].completed = true

  const rows: any[] = (require("../utils/database").db)
    .prepare("SELECT id FROM tasks")
    .all()
  const id = rows[index]?.id
  if (id) updateTask(id, Status.Done, 1)

  console.log(`✓ Completed: "${taskList[index].title}"`)
}

// Xóa task
export function deleteTask(index: number): void {
  if (!taskList[index]) {
    console.log("Task not found.")
    return
  }
  const title = taskList[index].title

  const rows: any[] = (require("../utils/database").db)
    .prepare("SELECT id FROM tasks")
    .all()
  const id = rows[index]?.id
  if (id) deleteTaskById(id)

  taskList.splice(index, 1)
  console.log(`✓ Deleted: "${title}"`)
}
export function showTasks(): void {
  if (taskList.length === 0) {
    console.log("No tasks found.")
    return
  }
  console.log("\n=== FLOWDESK — TASK LIST ===")
  taskList.forEach((task, index) => {
    console.log(`${index + 1}. [${task.status}] [${task.priority}] ${task.title} | Due: ${task.deadline}`)
  })
}

export function filterByStatus(status: Status): void {
  const filtered = taskList.filter((task) => {
    return task.status === status
  })
  if (filtered.length === 0) {
    console.log("No tasks found.")
    return
  }
  console.log(`\n=== ${status.toUpperCase()} ===`)
  filtered.forEach((task, index) => {
    console.log(`${index + 1}. [${task.priority}] ${task.title} | Due: ${task.deadline}`)
  })
}

export function searchTask(keyword: string): void {
  const result = taskList.filter((task) => {
    return task.title.toLowerCase().includes(keyword.toLowerCase())
  })
  if (result.length === 0) {
    console.log("No tasks found.")
    return
  }
  console.log(`\n=== SEARCH: "${keyword}" ===`)
  result.forEach((task, index) => {
    console.log(`${index + 1}. [${task.status}] ${task.title} | ${task.priority}`)
  })
}