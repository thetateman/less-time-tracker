import { useState, MouseEvent, KeyboardEvent } from "react";
import TaskList, { Task } from "./TaskList";
import constants from "../constants";

const tasks: Task[] = [
  {
    id: 0,
    title: "hello",
    childIndicies: [1],
  },
  {
    id: 1,
    title: "hello",
    childIndicies: [],
  },
];
const handleKeyPress = (e: KeyboardEvent) => {
  console.log("hello");
  console.log(e.key);
};

const TaskManager = () => {
  const [tasksState, setTasksState] = useState(Array<Task>); //see https://react.dev/learn/choosing-the-state-structure#don-t-mirror-props-in-state
  const [rootTaskIndicies, setRootTaskIndicies] = useState(Array<number>);
  const handleCreateProject = () => {
    const newTaskIndex: number = tasksState.length;
    const newTask = {
      id: newTaskIndex,
      title: "",
      childIndicies: [],
    };
    setTasksState([...tasksState, newTask]);
    setRootTaskIndicies([newTaskIndex, ...rootTaskIndicies]);
  };

  //Triggers creation of child task, passed down to button component through props
  const handleChildButtonClick = (parentIndex: number) => (e: MouseEvent) => {
    const parent = tasksState[parentIndex];
    const newTaskIndex: number = tasksState.length;

    // Create a new version of parent with extra id

    const newParent = {
      ...parent,
      childIndicies: [newTaskIndex].concat(parent.childIndicies),
    };

    // create new version of tasks that includes newTask
    const newTask = {
      id: newTaskIndex,
      title: "",
      childIndicies: [],
    };
    const newTasks = [...tasksState, newTask];

    // Set the parent tasks in newTasks to newParent
    newTasks[parentIndex] = newParent;
    setTasksState(newTasks);
  };
  return (
    <div>
      <button onClick={handleCreateProject}>New Project</button>
      <TaskList
        tasks={tasksState}
        rootTaskIndicies={rootTaskIndicies}
        handleChildButtonClick={handleChildButtonClick}
      />
    </div>
  );
};

export default TaskManager;
