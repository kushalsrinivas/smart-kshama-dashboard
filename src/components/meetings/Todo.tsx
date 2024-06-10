import React from "react";
import { TodoItem } from "./items/TodoItems";
interface Actionitems {
  data: string[];
}
function Todo(data: Actionitems) {
  const arr = [1, 2, 3, 4, 5, 6];
  return (
    <div className="flex flex-col gap-2">
      {data.data.map((temp, id) => {
        return (
          <div key={id}>
            <TodoItem data={temp}></TodoItem>
          </div>
        );
      })}
    </div>
  );
}

export default Todo;
