import React, { useState, useEffect } from 'react'
import { DashboardHeader } from '../../components/dashboard/DashboardHeader'
import { DashboardWelcome } from '../../components/dashboard/DashboardWelcome'
import { TaskForm } from '@/components/task/TaskForm'
import { TaskList } from '../../components/task/TaskList'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { api } from '../../lib/api/apiClient'
import { socket } from '../../lib/socket'

export const DashboardPage = () => {
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const queryClient = useQueryClient()

  // ── WebSocket real-time sync ──────────────────────────────
  useEffect(() => {
    socket.connect()

    socket.on('task:created', (newTask) => {
      queryClient.setQueryData(['tasks'], (prev = []) => [...prev, newTask])
    })

    socket.on('task:updated', (updatedTask) => {
      queryClient.setQueryData(['tasks'], (prev = []) =>
        prev.map((t) => (t._id === updatedTask._id ? updatedTask : t))
      )
    })

    socket.on('task:deleted', (deletedId) => {
      queryClient.setQueryData(['tasks'], (prev = []) =>
        prev.filter((t) => t._id !== deletedId)
      )
    })

    return () => {
      socket.off('task:created')
      socket.off('task:updated')
      socket.off('task:deleted')
      socket.disconnect()
    }
  }, [queryClient])

  // ── Fetch tasks ───────────────────────────────────────────
  const getTaskQuery = useQuery({
    queryKey: ['tasks'],
    queryFn: async ({ signal }) => {
      const response = await api.get('/task', { signal })
      return response.data
    },
    retry: 1,
  })

  // ── Edit mutation ─────────────────────────────────────────
  const editTaskMutation = useMutation({
    mutationFn: async ({ id, ...data }) => {
      const response = await api.put(`/task/${id}`, data)
      return response.data
    },
    onSuccess: (updatedTask) => {
      queryClient.setQueryData(['tasks'], (prev = []) =>
        prev.map((t) => (t._id === updatedTask._id ? updatedTask : t))
      )
    },
    onError: (error) => {
      console.error('Failed to update task:', error)
    },
  })

  // ── Delete mutation ───────────────────────────────────────
  const deleteTaskMutation = useMutation({
    mutationFn: async (id) => {
      const response = await api.delete(`/task/${id}`)
      return response.data
    },
    onSuccess: (_, id) => {
      queryClient.setQueryData(['tasks'], (prev = []) =>
        prev.filter((t) => t._id !== id)
      )
    },
    onError: (error) => {
      console.error('Failed to delete task:', error)
    },
  })

  // ── Early returns after all hooks ─────────────────────────
  if (getTaskQuery.isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <Loader2 className='animate-spin' />
      </div>
    )
  }

  if (getTaskQuery.isError) {
    return (
      <div className='min-h-screen flex items-center justify-center text-destructive'>
        Error loading tasks: {getTaskQuery.error.message}
      </div>
    )
  }

  // ── Handlers ──────────────────────────────────────────────
  const handleCreateTaskClick = () => setShowCreateForm(true)

  const handleFormClose = () => {
    setShowCreateForm(false)
    setEditingTask(null)
  }

  const handleTaskEdit = (task) => {
    setEditingTask(task)
    setShowCreateForm(true)
    editTaskMutation.mutate({ id: task._id, ...task })
  }

  const handleTaskDelete = (taskId) => {
    deleteTaskMutation.mutate(taskId)
  }

  const handleStatusChange = (taskId, statusData) => {
    editTaskMutation.mutate({ id: taskId, ...statusData })
  }

  return (
    <div className='min-h-screen bg-background'>
      <DashboardHeader />
      <main className='max-w-7xl mx-auto px-4 py-8 space-y-6'>
        <DashboardWelcome
          showCreateForm={showCreateForm}
          onCreateTask={handleCreateTaskClick}
        />
        <div>
          <TaskList
            tasks={getTaskQuery.data || []}
            isLoading={getTaskQuery.isLoading}
            onEdit={handleTaskEdit}
            onDelete={handleTaskDelete}
            onStatusChange={handleStatusChange}
          />
        </div>
        <div>
          <TaskForm
            task={editingTask}
            open={showCreateForm || !!editingTask}
            onOpenChange={handleFormClose}
          />
        </div>
      </main>
    </div>
  )
}