import React, { useState } from "react";
import { DashboardHeader } from "../../components/dashboard/DashboardHeader";
import { DashboardWelcome } from "../../components/dashboard/DashboardWelcome";
import { TaskForm } from "@/components/task/TaskForm";
import { TaskList } from "../../components/task/TaskList";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { api } from "../../lib/api/apiClient";

export const DashboardPage = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const handleCreateTaskClick = () => {
    setShowCreateForm(true);
  };

  const handleFormClose = () => {
    setShowCreateForm(false);
    setEditingTask(null);
  };

  // fetch the tasks

  const getTaskQuery = useQuery({
    queryKey: ["tasks"],
    queryFn: async (data) => {
      const response = await api.get("/task", data);
      return response.data;
    },
    retry: 1,
    onSuccess: (data) => {
      console.log("Tasks fetched successfully:", data);
    },
    onError: (err) => {
      console.error("Error fetching tasks:", err);
    },
  });

  // tasks validation
  if (getTaskQuery.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }


  const handleTaskEdit = (task) => {
    setEditingTask(task);
    setShowCreateForm(true);

    // const editTask = {

    // }

    editTaskMutation.mutate();
  };

  const handleTaskDelete = (taskId) => {
    // Implement task deletion logic here
    console.log("Delete task with ID:", taskId);
    deleteTaskMutation.mutate();
  };

  const handleStatusChange = (taskId, statusData) => {
    //
  };

  return (
    <div className="min-h-screen bg-background">
      {/* header */}
      <DashboardHeader />
      {/* main */}
      <main>
        <DashboardWelcome
          showCreateForm={showCreateForm}
          onCreateTask={handleCreateTaskClick}
        />
        <div>
          {/* tasks section */}
          <TaskList
            tasks={getTaskQuery.data || []}
            isLoading={getTaskQuery.isLoading}
            onEdit={handleTaskEdit}
            onDelete={handleTaskDelete}
            onStatusChange={handleStatusChange}
          />
        </div>
        <div>
          {/* task dialog form */}
          <TaskForm
            task={editingTask}
            open={showCreateForm || !!editingTask}
            onOpenChange={handleFormClose}
          />
        </div>
      </main>
    </div>
  );
};
