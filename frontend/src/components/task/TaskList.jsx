import { ClipboardCheck, Search } from "lucide-react";
import { useState } from "react";
import { Input } from '../ui/input';
import { Tabs, TabsContent, TabsList,TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { TaskCard } from "./TaskCard";

export const TaskList = ({tasks = [],isLoading = false,onEdit,onDelete,onStatusChange}) => {
  
  const [searchTerm,setSearchTerm] = useState('')

  const getTaskStatus = () => {
    const AllTaksByStatus = {
      pending : tasks.filter((task) => task.status === "pending").length,
      inProgress : tasks.filter((task)=> task.status === "in-progress").length,
      completed : tasks.filter((task)=> task.status === "completed").length
    }

    const categorizedTasks = {
      all: tasks,
      pending: tasks.filter((task) => task.status === "pending"),
      inProgress: tasks.filter((task) => task.status === "in-progress"),
      completed: tasks.filter((task) => task.status === "completed")
    }

    const status = {
      total: AllTaksByStatus.total,
      pending: AllTaksByStatus.pending,
      inProgress: AllTaksByStatus.inProgress,
      completed: AllTaksByStatus.completed
    }

    const total = tasks.length
    
    return { total,status,categorizedTasks }

  }

  const { status ,total,categorizedTasks} = getTaskStatus()

  const TaskGrid = ({tasks,emptyMessage}) => {
    if(tasks.length === 0){
      return (
        <div className="text-center py-12">
          <div className='max-w-md mx-auto'>
            <ClipboardCheck className='mx-auto h-12 w-12 text-muted-foreground' />
            <h3 className="mt-4 text-sm font-medium text-foreground">
              No tasks found
            </h3>
            <p className='mt-4 text-sm text-muted-foreground'>{emptyMessage}</p>
          </div>
        </div>
      )
    }

  
    return(
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {
          tasks.map(task => (
            <TaskCard
              key={task._id} 
              task={task} 
              onEdit={onEdit} 
              onDelete={onDelete} 
              onStatusChange={onStatusChange} 
            />
          ))
        }
      </div>
    )

  }

  return (
    <div className="space-y-6">
      {/* stats overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {tasks.length === 0 ? (
          <div className="text-center text-muted-foreground">
            You have'nt created any task yet!
          </div>
        ) : (
          <>
            {/* Total card */}
            <div className="bg-card p-4 rounded-lg border shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">
                  Total Tasks
                </p>
                <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-2xl font-bold">{total}</p>
            </div>
            {/* pending card */}
            <div className="bg-card p-4 rounded-lg border shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">
                  Pending Tasks
                </p>
                <p className="h-2 w-2 rounded-full cursor-pointer bg-yellow-500" />
              </div>
              <p className="text-2xl font-bold text-yellow-600">
                {status.pending}
              </p>
            </div>
            {/* in progress card */}
            <div className="bg-card p-4 rounded-lg border shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">
                  In Progress Tasks
                </p>
                <p className="h-2 w-2 rounded-full cursor-pointer bg-rose-500" />
              </div>
              <p className="text-2xl font-bold text-rose-600">
                {status.inProgress}
              </p>
            </div>
            {/* completed card */}
            <div className="bg-card p-4 rounded-lg border shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">
                  Completed Tasks
                </p>
                <p className="h-2 w-2 rounded-full cursor-pointer bg-green-500" />
              </div>
              <p className="text-2xl font-bold text-green-600">
                {status.completed}
              </p>
            </div>
          </>
        )}
      </div>
      {/* Search input */}
      <div className='flex items-center gap-4'>
        <div className='relative flex-1 max-w-md'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
          <Input
            type='text'
            placeholder='Search tasks...'
            value={searchTerm}
            onChange={(e)=>setSearchTerm(e.target.value)}
            className='pl-10 border rounded-md'
          />
        </div>
      </div>

      {/* Task items */}
        <div className="space-y-4">

        <Tabs defaultValue="all" className="w-full">
          {/* <TabsList className="grid grid-cols-4 w-full mb-4">
            <TabsTrigger value="all" className="flex items-center gap-2">
              All
              <Badge>
                {status.total}
              </Badge>
            </TabsTrigger>
          </TabsList> */}
          <TabsList className="bg-card p-1 rounded-md flex w-full mb-4">
         
            <TabsTrigger value="all" className="data-[state=active]:bg-blue-500 text-sm text-muted-foreground px-3 py-1 rounded-full cursor-pointer">
              All
              <Badge variant="secondary" className="ml-2 rounded-md">
                {total}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="pending" className="data-[state=active]:bg-yellow-500 text-sm text-muted-foreground px-3 py-1 rounded-full cursor-pointer">
              Pending
              <Badge variant="secondary" className="ml-2 rounded-md">
                {status.pending}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="in-progress" className="data-[state=active]:bg-rose-500 text-sm text-muted-foreground px-3 py-1 rounded-full cursor-pointer">
              In Progress
              <Badge variant="secondary" className="ml-2 rounded-md">
                {status.inProgress}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="completed" className="data-[state=active]:bg-green-500 text-sm text-muted-foreground px-3 py-1 rounded-full cursor-pointer">
              Completed
              <Badge variant="secondary" className="ml-2 rounded-md">
                {status.completed}
              </Badge>
            </TabsTrigger>
          </TabsList>
          {/* Tabs content */}
          <TabsContent value="all">
            <TaskGrid
              tasks={categorizedTasks.all}
              emptyMessage="You have no tasks yet. Create one to get started!"
            />
          </TabsContent>
          <TabsContent value="pending">
            <TaskGrid 
              tasks={categorizedTasks.pending}
              emptyMessage="You have no pending tasks. Create one to get started!"
            />
          </TabsContent>
          <TabsContent value="in-progress">
            <TaskGrid
            tasks={categorizedTasks.inProgress}
            emptyMessage="You have no tasks in progress. Create one to get started!"
            />
          </TabsContent>
          <TabsContent value="completed">
            <TaskGrid
            tasks={categorizedTasks.completed}
            emptyMessage="You have no completed tasks. Create one to get started!"
            />
          </TabsContent>

        </Tabs>

        </div>

    </div>
  );
};
