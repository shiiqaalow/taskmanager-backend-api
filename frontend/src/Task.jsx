import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"

const addTask = async (newTask) => {
    const response = await fetch('http://localhost:5000/api/task/create',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask)
    })

    if(!response.ok) {
        throw new Error('Failed to create task')
    }
    return response.json()
}
export const Task = () => {
    const [ task,setTask ] = useState('')
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: addTask,
            onSuccess: () => {
                // this function fetches the data real time
                queryClient.invalidateQueries({ queryKey: ['tasks'] })
                console.log('Task created...')
            }
    })
    const handleAdd = () => {
        mutation.mutate({ title: task,completed: false })
    }
  return (
    <div>
        <input 
            type="text"
            onChange={(e) => setTask(e.target.value)}
        />
        <button 
            type="button"
            onClick={handleAdd}
        >
            Add
        </button>
    </div>
  )
}
