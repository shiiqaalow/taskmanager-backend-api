import React, { useState } from 'react'
import { Dialog,DialogContent,DialogHeader,DialogTitle,DialogDescription,DialogFooter } from '../ui/dialog'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Select,SelectTrigger,SelectValue,SelectContent,SelectItem } from '../ui/select'
import { Button } from '../ui/button'
import { useMutation } from '@tanstack/react-query'
import { api } from '../../lib/api/apiClient'
import { useAuthStore } from '../../lib/store/authStore'
const TASK_STATUSES = [
    { value: 'pending', label: 'Pending' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' }
];

export const TaskForm = ({tasks,open = true,onOpenChange}) => {

    const [ formValues,setFormValues ] = useState({ title: '', description: '',status:'pending',dueDate: '' })
    const [ displayError,setDisplayError ] = useState(null)
    const [ isLoading,setIsLoading ] = useState(false)
    const [ validationError,setValidationError ] = useState(false)

    const { token } = useAuthStore()


    const handleInputChange = (e) => {
        const { name,value } = e.target
        setFormValues({
            ...formValues,
            [name]:value
        })
    }


    const handleStatusChange = (value) => {

        setFormValues({
            ...formValues,
            status: value
        })

    }

    const handleCancel = () => {
        onOpenChange?.(false)
    }



    const createTaskMutation = useMutation({
        mutationFn: async (TaskData) => {
            const response = await api.post('/task/create', TaskData)
            return response.data
            console.log('Data:',TaskData)
        },
        onSuccess: (data) => {
            console.log('Task created successfully:', data)
        },
        onError: (err) => {
            setValidationError(err?.response?.data?.message || 'An error occurred while creating the task.')
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!formValues.title.trim()) {
            setDisplayError('Title is required.')
            return
        }
        const taskData = {
            title: formValues.title.trim(),
            description: formValues.description.trim() || '',
            status: formValues.status,
            dueDate: formValues.dueDate ? new Date(formValues.dueDate).toISOString() : null
        }
        createTaskMutation.mutate(taskData)
        onOpenChange(false)
    }




    return (
        <Dialog open={open} onOpenChange={onOpenChange} >
            <DialogContent className="sm:max-w-[500px] rounded-md">
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold">
                        Create New Task
                    </DialogTitle>
                    <DialogDescription className="text-sm text-muted-foreground">
                        Fill in the details below to create a new task.
                    </DialogDescription>
                </DialogHeader>
                {/* inputs */}

                <form 
                    onSubmit={handleSubmit}
                    className="space-y-6">

                    {displayError && (
                        <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-md">
                            {displayError}
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="title">Title *</Label>
                        <Input
                            id="title"
                            name="title"
                            type="text"
                            value={formValues.title}
                            onChange={handleInputChange}
                            placeholder="Enter task title"
                            className={'rounded-md'}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="title">Description</Label>
                        <Textarea
                            id="description"
                            name="description"
                            type="text"
                            value={formValues.description}
                            onChange={handleInputChange}
                            placeholder="Enter task description"
                            className={'rounded-md'}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Select
                            value={formValues.status}
                            onValueChange={handleStatusChange}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Theme" />
                            </SelectTrigger>
                            <SelectContent>
                                {TASK_STATUSES.map((status) => (
                                    <SelectItem 
                                        key={status.value} 
                                        value={status.value}
                                        className='cursor-pointer'
                                    >
                                        {status.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>


                    <div className="space-y-2">
                        <Label htmlFor="dueDate">Due Date</Label>
                        <Input
                            id="dueDate"
                            name="dueDate"
                            type="date"
                            value={formValues.dueDate}
                            onChange={handleInputChange}
                            className='rounded-md cursor-pointer'
                        />
                    </div>

                    <DialogFooter className="flex justify-end space-x-2">

                        <Button type="button" variant="outline" onClick={handleCancel}>
                            Cancel
                        </Button>


                        <Button 
                            type="submit" disabled={isLoading}
                            className='rounded-md cursor-pointer'
                        >
                            {isLoading ? (
                                <span className="flex items-center gap-2">
                                    <Loader size="sm" />
                                    {tasks ? 'Updating...' : 'Creating...'}
                                </span>
                            ) : (
                                tasks ? 'Update Task' : 'Create Task'
                            )}
                        </Button>

                    </DialogFooter>

                </form>
            </DialogContent>
        </Dialog>
    )
}