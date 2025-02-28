"use client";

import React, { useState } from "react";
import { Copy, Plus } from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { DashboardProvider, useDashboard } from "~/Context/DashboardContext";

interface Todo {
  data: string;
}

export function TodoItem({ data }: Todo) {
  const { teamMembers, taskStatuses, addTask } = useDashboard();

  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: data,
    description: "",
    status: "",
    assignee: "",
    dueDate: "",
  });

  const handleAssignTask = () => {
    if (newTask.status && newTask.assignee && newTask.dueDate) {
      addTask({
        title: data,
        description: "assigned through meeting",
        status: newTask.status,
        assignee: newTask.assignee,
        dueDate: newTask.dueDate,
      });
      console.log(newTask);
      setTaskDialogOpen(false);
      toast.success("Task assigned successfully");
    } else {
      toast.error("All fields are required to assign task");
    }
  };

  return (
    <div className="flex items-center justify-between space-x-2">
      <label
        htmlFor="terms"
        className="text-xl font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        • &nbsp; {data}
      </label>

      <Dialog open={taskDialogOpen} onOpenChange={setTaskDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="default" size="sm">
            Assign
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Task</DialogTitle>
            <DialogDescription>
              Assign this task to a team member.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={newTask.status}
                onValueChange={(value) =>
                  setNewTask({ ...newTask, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  {taskStatuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="assignee">Assignee</Label>
              <Select
                value={newTask.assignee}
                onValueChange={(value) =>
                  setNewTask({ ...newTask, assignee: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an assignee" />
                </SelectTrigger>
                <SelectContent>
                  {teamMembers.map((member) => (
                    <SelectItem key={member.id} value={member.name}>
                      {member.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                value={newTask.dueDate}
                onChange={(e) =>
                  setNewTask({ ...newTask, dueDate: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="default" onClick={() => setTaskDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAssignTask}>Assign Task</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

interface Actionitems {
  data: string[];
}

function Todo({ data }: Actionitems) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <span className="text-lg font-bold">{data.length} Items</span>
      </div>
      <DashboardProvider>
        {data.map((item, index) => (
          <TodoItem key={index} data={item} />
        ))}
      </DashboardProvider>
    </div>
  );
}

export default Todo;
