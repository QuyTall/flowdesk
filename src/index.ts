import { ask, closeApp } from "./utils/input"
import { addTask, showTasks, completeTask, deleteTask, 
         filterByStatus, searchTask, initTasks } from "./services/TaskService"
import { Priority } from "./models/Priority"
import { Status } from "./models/Status"

async function main(): Promise<void> {
  
  await initTasks()
  
  console.log("=== FLOWDESK — TASK MANAGEMENT ===")

  while (true) {
    console.log("\n1. Add task")
    console.log("2. Show tasks")
    console.log("3. Complete task")
    console.log("4. Delete task")
    console.log("5. Exit")
    console.log("6. Filter by status")
    console.log("7. Search tasks")

    const choice = await ask("\nChoose (1-7): ")

    if (choice === "1") {
  const title    = await ask("Task name: ")
  
  console.log("Priority: 1.High  2.Medium  3.Low")
  const p        = await ask("Choose priority (1-3): ")
  const priority = p === "1" ? Priority.High 
                 : p === "2" ? Priority.Medium 
                 : Priority.Low

  const deadline = await ask("Deadline (DD/MM/YYYY): ")
  
  addTask(title, priority, deadline)

    } else if (choice === "2") {
      showTasks()

    } else if (choice === "3") {
      showTasks()
      const index = await ask("Task number: ")
      completeTask(Number(index) - 1)

    } else if (choice === "4") {
      showTasks()
      const index = await ask("Task number: ")
      deleteTask(Number(index) - 1)

    } else if (choice === "5") {
      console.log("Goodbye!")
      closeApp()
      break

    }else if (choice === "6") {
      console.log("1. Todo  2. In Progress  3. Done")
      const s = await ask("Choose status (1-3): ")
      const status = s === "1" ? Status.Todo
               : s === "2" ? Status.InProgress
               : Status.Done
      filterByStatus(status)
}
     else if (choice === "7") {
  const keyword = await ask("Search keyword: ")
  searchTask(keyword)
}
     else {
      console.log("Invalid choice. Please choose 1-7.")
    }
  }
}

main()