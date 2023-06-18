import { useState, MouseEvent } from "react";
import TaskListItem from "./TaskListItem";

export interface Task {
  id: number;
  title: string;
  childIndicies: number[];
}

interface Props {
  tasks: Task[];
  rootTaskIndicies: number[];
  handleChildButtonClick: (id: number) => (e: MouseEvent) => void;
}

const TaskList = ({
  tasks,
  rootTaskIndicies,
  handleChildButtonClick,
}: Props) => {
  return (
    <>
      <section />
      <div className="task-list">
        {rootTaskIndicies.map((taskIndex) => {
          const task = tasks[taskIndex];
          return (
            <TaskListItem
              key={task.id}
              id={task.id}
              title={task.title}
              tasks={tasks}
              handleChildButtonClick={handleChildButtonClick}
            ></TaskListItem>
          );
        })}
      </div>
    </>
  );
};

export default TaskList;
