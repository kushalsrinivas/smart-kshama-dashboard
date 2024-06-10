"use client";

import { Checkbox } from "~/components/ui/checkbox";
interface Todo {
  data: string;
}
export function TodoItem(data: Todo) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <label
        htmlFor="terms"
        className="text-xl font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {data.data}
      </label>
    </div>
  );
}
