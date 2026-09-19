import { Task } from "../models/Task"
import { Status } from "../models/Status"
import { Priority } from "../models/Priority"
import { loadTasks, insertTask, updateTask, deleteTaskById } from "../utils/storage"


let taskList: Task[] = []

export async function initTasks(): Promise<void> {
  taskList = await loadTasks()
}

export async function addTask(
  title: string,
  priority: Priority,
  deadline: string
): Promise<void> {
  const newTask: Task = {
    title,
    status: Status.Todo,
    priority,
    deadline,
    completed: false
  }
  await insertTask(newTask)
  taskList = await loadTasks()
  console.log(`✓ Added: "${title}" | ${priority} | Due: ${deadline}`)
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

export async function completeTask(index: number): Promise<void> {
  if (!taskList[index]) {
    console.log("Task not found.")
    return
  }
  const id = index + 1
  await updateTask(id)
  taskList = await loadTasks()
  console.log(`✓ Completed: "${taskList[index]?.title}"`)
}

export async function deleteTask(index: number): Promise<void> {
  if (!taskList[index]) {
    console.log("Task not found.")
    return
  }
  const title = taskList[index].title
  const id = index + 1
  await deleteTaskById(id)
  taskList = await loadTasks()
  console.log(`✓ Deleted: "${title}"`)
}

export function filterByStatus(status: Status): void {
  const filtered = taskList.filter(task => task.status === status)
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
  const result = taskList.filter(task =>
    task.title.toLowerCase().includes(keyword.toLowerCase())
  )
  if (result.length === 0) {
    console.log("No tasks found.")
    return
  }
  console.log(`\n=== SEARCH: "${keyword}" ===`)
  result.forEach((task, index) => {
    console.log(`${index + 1}. [${task.status}] ${task.title} | ${task.priority}`)
  })
}