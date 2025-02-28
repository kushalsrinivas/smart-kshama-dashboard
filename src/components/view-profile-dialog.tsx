"use client";

import { CalendarDays, Mail } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/Avatar";
import { Badge } from "~/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { useDashboard, type TeamMember } from "~/Context/DashboardContext";

interface ViewProfileDialogProps {
  member: TeamMember | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ViewProfileDialog({
  member,
  open,
  onOpenChange,
}: ViewProfileDialogProps) {
  const { tasks } = useDashboard();

  if (!member) return null;

  const assignedTasks = tasks.filter((task) => task.assignee === member.name);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Team Member Profile</DialogTitle>
          <DialogDescription>
            View detailed information about this team member and their assigned
            tasks.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6">
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={member.avatar} alt={member.name} />
              <AvatarFallback>
                {member.name.charAt(0)}
                {member.name.split(" ")[1]?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <h2 className="text-2xl font-bold">{member.name}</h2>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>{member.email}</span>
              </div>
              <div className="flex gap-2">
                <Badge variant="default">{member.role}</Badge>
                <Badge variant="default">{assignedTasks.length} Tasks</Badge>
              </div>
            </div>
          </div>

          <div className="grid gap-2">
            <h3 className="text-lg font-semibold">Assigned Tasks</h3>
            {assignedTasks.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Due Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assignedTasks.map((task) => (
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
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-sm text-muted-foreground">
                No tasks assigned yet.
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
