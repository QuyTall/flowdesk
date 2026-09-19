import { Task } from "../models/Task"
import { Status } from "../models/Status"
import { Priority } from "../models/Priority"

const API_URL = "http://localhost:8080/api/tasks"


export async function loadTasks(): Promise<Task[]> {
  const response = await fetch(API_URL)
  const data = await response.json()
  return data.map((item: any) => ({
    title:     item.title,
    status:    item.status as Status,
    priority:  item.priority as Priority,
    deadline:  item.deadline,
    completed: item.completed
  }))
}

export async function insertTask(task: Task): Promise<void> {
  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title:    task.title,
      priority: task.priority,
      deadline: task.deadline
    })
  })
}

export async function updateTask(id: number): Promise<void> {
  await fetch(`${API_URL}/${id}/complete`, {
    method: "PUT"
  })
}

export async function deleteTaskById(id: number): Promise<void> {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  })
}