import React from "react";
import { TodoItem } from "./items/TodoItems";

function Todo() {
  const arr = [1, 2, 3, 4, 5, 6];
  return (
    <div className="flex flex-col gap-2">
      {arr.map((id, temp) => {
        return (
          <div key={id}>
            <TodoItem></TodoItem>
          </div>
        );
      })}
    </div>
  );
}

export default Todo;
