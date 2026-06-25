import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card'
import { Badge } from '../ui/badge'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { Edit2, Trash, MoreVerticalIcon, Calendar,Clock } from 'lucide-react'
const STATUS_CONFIG = {
  'pending': {
    varient: 'default',
    label: 'Pending',
    color: 'text-orange-300'
  },
  'in-progress': {
    varient: 'secondary',
    label: 'In Progress',
    color: 'text-blue-600'
  },
  'completed': {
    varient: 'secondary',
    label: 'Completed',
    color: 'text-green-600'
  }
}
export const TaskCard = ({ task, onEdit, onDelete, isLoading = false }) => {
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const statusConfig = STATUS_CONFIG[task?.status] || STATUS_CONFIG['pending']

  const formatDate = (dateString) => {
    if(!dateString) return null
    return new Date(dateString).toLocaleDateString('en-US',{
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const isOverdue = (dueDate) => {
    if(!dueDate || task?.status === 'completed' )
      return false
    return new Date(dueDate) < new Date()
  }

  const dueDate = formatDate(task?.dueDate)
  const overdue = isOverdue(task?.dueDate)
  const createdAt = formatDate(task?.createdAt)


  return (
    <div>
      <Card className='w-full transition-shadow hover:shadow-md'>
        <CardHeader className='pb-3'>
          <div className='flex items-start justify-between'>
            <CardTitle className='text-lg leading-tight'>
              {task?.title}
            </CardTitle>

            <div className='flex items-center gap-2'>
              <Badge variant={statusConfig.varient} className={'shrink-0 rounded-md'}>
                {statusConfig.label}
              </Badge>
              {/* Dropdown */}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant='ghost'
                    size='sm'
                    className='h-8 w-8 p-0'
                  >
                    <span className='sr-only'>Open menu</span>
                    <MoreVerticalIcon className='h-4 w-4' />
                  </Button>
                </DropdownMenuTrigger>
                {/* dropdown content */}
                <DropdownMenuContent align='end'>
                  <DropdownMenuItem>
                    <Edit2 className='mr-2 h-4 w-4' />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Trash className='mr-2 h-4 w-4' />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

        </CardHeader>

        <CardContent className="space-y-3">
          {/* description */}
          {
            task.description && (
              <p className='text-muted-foreground text-sm leading-relaxed'>{task.description}</p>
            )
          }
          {/* due date */}

          {

            dueDate && (
                <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Due:</span>
                    <Badge
                        variant={overdue ? "destructive" : "outline"}
                        className="text-xs rounded-md"
                    >
                        {dueDate}
                        {overdue && ' (Overdue)'}
                    </Badge>
                </div>
            )
          }

          {/* Simple status indicator */}
          <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
            <div className='flex items-center gap-2'>
              <Clock className='h-4 w-4' />
              <span>Created: {createdAt}</span>
            </div>
            
            <span className={statusConfig?.color}>
              {statusConfig?.label}
            </span>
          </div>

        </CardContent>

      </Card>


      {/* Delete Confirmation Dialog */}
      {/* <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogContent>

                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the task "{task.title}".
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDeleteConfirm}
                            className="bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
                        >

                            {deleteMutation.isPending ? (
                                <span className="flex items-center gap-2">
                                    <Loader size="sm" />
                                    Deleting...
                                </span>
                            ) : (
                                'Delete'
                            )}

                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog> */}


    </div>
  )
}