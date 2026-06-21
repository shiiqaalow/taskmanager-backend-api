import { ClipboardCheck } from "lucide-react";
import React from "react";

export const TaskList = ({
  tasks = [],
  isLoading = false,
  onEdit,
  onDelete,
  onStatusChange,
}) => {
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
              <p className="text-2xl font-bold">{tasks.length}</p>
            </div>
            {/* pending card */}
            <div className="bg-card p-4 rounded-lg border shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">
                  Pending Tasks
                </p>
                <p className="h-2 w-2 rounded-full bg-yellow-500" />
              </div>
              <p className="text-2xl font-bold text-yellow-600">
                {tasks.filter((task) => task.status === "pending").length}
              </p>
            </div>
            {/* in progress card */}
            <div className="bg-card p-4 rounded-lg border shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">
                  In Progress Tasks
                </p>
                <p className="h-2 w-2 rounded-full bg-rose-500" />
              </div>
              <p className="text-2xl font-bold text-rose-600">
                {tasks.filter((task) => task.status === "in-progress").length}
              </p>
            </div>
            {/* completed card */}
            <div className="bg-card p-4 rounded-lg border shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">
                  Completed Tasks
                </p>
                <p className="h-2 w-2 rounded-full bg-green-500" />
              </div>
              <p className="text-2xl font-bold text-green-600">
                {tasks.filter((task) => task.status === "completed").length}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
