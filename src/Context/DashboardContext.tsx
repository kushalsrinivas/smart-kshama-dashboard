"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { openDB } from "idb";

// Define types for our data
export type TeamMember = {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  tasks: string[];
};

export type Task = {
  id: string;
  title: string;
  description: string;
  status: string;
  assignee: string;
  dueDate: string;
};

// Define IndexedDB Database Setup
const DB_NAME = "DashboardDB";
const TEAM_MEMBERS_STORE = "teamMembers";
const TASKS_STORE = "tasks";

async function initDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(TEAM_MEMBERS_STORE)) {
        db.createObjectStore(TEAM_MEMBERS_STORE, { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains(TASKS_STORE)) {
        db.createObjectStore(TASKS_STORE, { keyPath: "id" });
      }
    },
  });
}

// Define the context type
type DashboardContextType = {
  teamMembers: TeamMember[];
  tasks: Task[];
  roles: string[];
  taskStatuses: string[];
  addTeamMember: (member: Omit<TeamMember, "id" | "tasks" | "avatar">) => void;
  updateTeamMember: (id: string, member: Partial<TeamMember>) => void;
  deleteTeamMember: (id: string) => void;
  addTask: (task: Omit<Task, "id">) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  assignTask: (taskId: string, memberId: string) => void;
  unassignTask: (taskId: string, memberId: string) => void;
};

// Create the context
const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined,
);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  // Load data from IndexedDB on mount
  useEffect(() => {
    async function loadFromDB() {
      const db = await initDB();
      const teamMembersData = await db.getAll(TEAM_MEMBERS_STORE);
      const tasksData = await db.getAll(TASKS_STORE);
      setTeamMembers(teamMembersData);
      setTasks(tasksData);
    }
    loadFromDB();
  }, []);

  // Helper function to update IndexedDB
  const updateDB = async (storeName: string, data: any[]) => {
    const db = await initDB();
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);
    await store.clear();
    for (const item of data) {
      await store.put(item);
    }
  };

  // Team member functions
  const addTeamMember = async (
    member: Omit<TeamMember, "id" | "tasks" | "avatar">,
  ) => {
    const newMember: TeamMember = {
      id: crypto.randomUUID(),
      name: member.name,
      email: member.email,
      role: member.role,
      avatar: "/placeholder.svg?height=40&width=40",
      tasks: [],
    };
    const updatedTeam = [...teamMembers, newMember];
    setTeamMembers(updatedTeam);
    await updateDB(TEAM_MEMBERS_STORE, updatedTeam);
  };

  const updateTeamMember = async (id: string, member: Partial<TeamMember>) => {
    const updatedTeam = teamMembers.map((m) =>
      m.id === id ? { ...m, ...member } : m,
    );
    setTeamMembers(updatedTeam);
    await updateDB(TEAM_MEMBERS_STORE, updatedTeam);
  };

  const deleteTeamMember = async (id: string) => {
    const updatedTeam = teamMembers.filter((m) => m.id !== id);
    setTeamMembers(updatedTeam);
    await updateDB(TEAM_MEMBERS_STORE, updatedTeam);
  };

  // Task functions
  const addTask = async (task: Omit<Task, "id">) => {
    const newTask: Task = { id: crypto.randomUUID(), ...task };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    await updateDB(TASKS_STORE, updatedTasks);

    // Update assigned team member
    if (task.assignee) {
      const assignedMember = teamMembers.find((m) => m.name === task.assignee);
      if (assignedMember) {
        updateTeamMember(assignedMember.id, {
          tasks: [...assignedMember.tasks, newTask.id],
        });
      }
    }
  };

  const updateTask = async (id: string, task: Partial<Task>) => {
    const updatedTasks = tasks.map((t) =>
      t.id === id ? { ...t, ...task } : t,
    );
    setTasks(updatedTasks);
    await updateDB(TASKS_STORE, updatedTasks);
  };

  const deleteTask = async (id: string) => {
    const updatedTasks = tasks.filter((t) => t.id !== id);
    setTasks(updatedTasks);
    await updateDB(TASKS_STORE, updatedTasks);
  };

  const assignTask = async (taskId: string, memberId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    const member = teamMembers.find((m) => m.id === memberId);

    if (task && member) {
      updateTask(taskId, { assignee: member.name });
      updateTeamMember(memberId, { tasks: [...member.tasks, taskId] });
    }
  };

  const unassignTask = async (taskId: string, memberId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    const member = teamMembers.find((m) => m.id === memberId);

    if (task && member && task.assignee === member.name) {
      updateTask(taskId, { assignee: "" });
      updateTeamMember(memberId, {
        tasks: member.tasks.filter((t) => t !== taskId),
      });
    }
  };

  const value = {
    teamMembers,
    tasks,
    roles: [
      "Developer",
      "Designer",
      "Project Manager",
      "QA Engineer",
      "DevOps Engineer",
    ],
    taskStatuses: ["To Do", "In Progress", "In Review", "Done"],
    addTeamMember,
    updateTeamMember,
    deleteTeamMember,
    addTask,
    updateTask,
    deleteTask,
    assignTask,
    unassignTask,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

// Create a hook to use the context
export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
}
