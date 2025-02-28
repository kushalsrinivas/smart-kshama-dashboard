"use client";

import { useState } from "react";
import {
  CalendarDays,
  ChevronDown,
  Home,
  LayoutDashboard,
  Plus,
  Search,
  Settings,
  Users,
} from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/Avatar";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
  CardTitle,
} from "~/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { DashboardProvider, useDashboard } from "~/Context/DashboardContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { ViewProfileDialog } from "~/components/view-profile-dialog";

export default function Dashboard() {
  return (
    <DashboardProvider>
      <DashboardContent />
    </DashboardProvider>
  );
}

function DashboardContent() {
  const {
    teamMembers,
    tasks,
    roles,
    taskStatuses,
    addTeamMember,
    updateTeamMember,
    deleteTeamMember,
    addTask,
    updateTask,
    deleteTask,
    assignTask,
  } = useDashboard();

  const [teamDialogOpen, setTeamDialogOpen] = useState(false);
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const [newMember, setNewMember] = useState({ name: "", email: "", role: "" });
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "",
    assignee: "",
    dueDate: "",
  });
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);

  const handleAddTeamMember = () => {
    if (newMember.name && newMember.email && newMember.role) {
      addTeamMember({
        name: newMember.name,
        email: newMember.email,
        role: newMember.role,
      });
      setNewMember({ name: "", email: "", role: "" });
      setTeamDialogOpen(false);
    }
  };

  const handleAddTask = () => {
    if (
      newTask.title &&
      newTask.description &&
      newTask.status &&
      newTask.assignee &&
      newTask.dueDate
    ) {
      addTask({
        title: newTask.title,
        description: newTask.description,
        status: newTask.status,
        assignee: newTask.assignee,
        dueDate: newTask.dueDate,
      });
      setNewTask({
        title: "",
        description: "",
        status: "",
        assignee: "",
        dueDate: "",
      });
      setTaskDialogOpen(false);
    }
  };

  const handleChangeTaskStatus = (taskId: string, status: string) => {
    updateTask(taskId, { status });
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex-1">
        <main className="flex-1 p-4 md:p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
            <div className="flex items-center gap-2">
              <Dialog open={teamDialogOpen} onOpenChange={setTeamDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Team Member
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Team Member</DialogTitle>
                    <DialogDescription>
                      Add a new team member to your project.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={newMember.name}
                        onChange={(e) =>
                          setNewMember({ ...newMember, name: e.target.value })
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={newMember.email}
                        onChange={(e) =>
                          setNewMember({
                            ...newMember,
                            email: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="role">Role</Label>
                      <Select
                        value={newMember.role}
                        onValueChange={(value) =>
                          setNewMember({ ...newMember, role: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent>
                          {roles.map((role) => (
                            <SelectItem key={role} value={role}>
                              {role}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="default"
                      onClick={() => setTeamDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleAddTeamMember}>Add Member</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog open={taskDialogOpen} onOpenChange={setTaskDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Task
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Task</DialogTitle>
                    <DialogDescription>
                      Create a new task and assign it to a team member.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={newTask.title}
                        onChange={(e) =>
                          setNewTask({ ...newTask, title: e.target.value })
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="description">Description</Label>
                      <Input
                        id="description"
                        value={newTask.description}
                        onChange={(e) =>
                          setNewTask({
                            ...newTask,
                            description: e.target.value,
                          })
                        }
                      />
                    </div>
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
                    <Button
                      variant="default"
                      onClick={() => setTaskDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleAddTask}>Add Task</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <Tabs defaultValue="team" className="mt-6">
            <TabsList>
              <TabsTrigger value="team">Team Members</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
            </TabsList>
            <TabsContent value="team" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {teamMembers.map((member) => (
                  <Card key={member.id}>
                    <CardHeader className="flex flex-row items-center gap-4">
                      <Avatar>
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>
                          {member.name.charAt(0)}
                          {member.name.split(" ")[1]?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle>{member.name}</CardTitle>
                        <CardDescription>{member.email}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2">
                        <Badge variant="default">{member.role}</Badge>
                        <Badge variant="default">
                          {member.tasks.length} Tasks
                        </Badge>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => {
                          setSelectedMember(member);
                          setProfileDialogOpen(true);
                        }}
                      >
                        View Profile
                      </Button>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="default" size="sm">
                            Assign Task
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                          <div className="grid gap-4">
                            <div className="space-y-2">
                              <h4 className="font-medium leading-none">
                                Assign Task
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                Select a task to assign to {member.name}
                              </p>
                            </div>
                            <Command>
                              <CommandInput placeholder="Search tasks..." />
                              <CommandList>
                                <CommandEmpty>No tasks found.</CommandEmpty>
                                <CommandGroup>
                                  {tasks
                                    .filter(
                                      (task) => task.assignee !== member.name,
                                    )
                                    .map((task) => (
                                      <CommandItem
                                        key={task.id}
                                        onSelect={() => {
                                          assignTask(task.id, member.id);
                                        }}
                                      >
                                        {task.title}
                                      </CommandItem>
                                    ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="tasks">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[400px]">Task</TableHead>
                      <TableHead>Assignee</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tasks.map((task) => (
                      <TableRow key={task.id}>
                        <TableCell>
                          <div className="grid gap-1">
                            <span className="font-medium">{task.title}</span>
                            <span className="text-sm text-muted-foreground">
                              {task.description}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {task.assignee ? (
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage
                                  src={
                                    teamMembers.find(
                                      (m) => m.name === task.assignee,
                                    )?.avatar
                                  }
                                  alt={task.assignee}
                                />
                                <AvatarFallback>
                                  {task.assignee.charAt(0)}
                                  {task.assignee.split(" ")[1]?.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <span>{task.assignee}</span>
                            </div>
                          ) : (
                            <span className="text-muted-foreground">
                              Unassigned
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              task.status === "In Progress"
                                ? "default"
                                : task.status === "To Do"
                                  ? "neutral"
                                  : task.status === "In Review"
                                    ? "default"
                                    : "neutral"
                            }
                          >
                            {task.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <CalendarDays className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {new Date(task.dueDate).toLocaleDateString()}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="default" size="sm">
                                  Change Status
                                  <ChevronDown className="ml-2 h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                {taskStatuses.map((status) => (
                                  <DropdownMenuItem
                                    key={status}
                                    onClick={() =>
                                      handleChangeTaskStatus(task.id, status)
                                    }
                                  >
                                    {status}
                                  </DropdownMenuItem>
                                ))}
                              </DropdownMenuContent>
                            </DropdownMenu>
                            <Button
                              variant="default"
                              size="sm"
                              onClick={() => {
                                if (
                                  confirm(
                                    "Are you sure you want to delete this task?",
                                  )
                                ) {
                                  deleteTask(task.id);
                                }
                              }}
                            >
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
      <ViewProfileDialog
        member={selectedMember}
        open={profileDialogOpen}
        onOpenChange={setProfileDialogOpen}
      />
    </div>
  );
}

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  tasks: {
    id: string;
    title: string;
    description: string;
    status: string;
    assignee: string;
    dueDate: string;
  }[];
}
