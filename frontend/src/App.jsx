import { useQuery } from "@tanstack/react-query"
import { Task } from "./Task"

function App() {
  const { data,error,isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: () => fetch('http://localhost:5000/api/task').then(res => res.json())
  })
  if(isLoading) return <h1>Loading...</h1>
  if(error) return <h1>Error...</h1>
  return (
    <div>
      <Task/>
      {data.map(task=>(
        <h1 key={task._id}>{task._id} <span>{task.title} <span>{task.status}</span> </span>  </h1>
      )) }
    </div>
  )
}

export default App
