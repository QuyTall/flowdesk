import { Priority } from "./Priority"
import { Status } from "./Status"

export interface Task {
  title: string    
  status: Status     
  priority : Priority
  deadline: string
  completed: boolean 
}

export { Status }

