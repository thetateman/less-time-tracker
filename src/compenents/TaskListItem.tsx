import { MouseEvent, useState, useRef } from "react";
import EasyEdit, { Types } from "react-easy-edit";
import TaskItemButtonsContainer from "./TaskItemButtonsContainer";
import TaskList, { Task } from "./TaskList";
import constants from "../constants";
import Editable from "./Editable";

interface Props {
  id: number;
  title: string;
  tasks: Task[];
  handleChildButtonClick: (id: number) => (e: MouseEvent) => void;
}

const save = () => {
  return;
};

const cancel = () => {
  return;
};

const TaskListItem = ({ id, title, tasks, handleChildButtonClick }: Props) => {
  const [distanceLogged, setDistance] = useState(0);
  const [running, setRunning] = useState(false);
  const [titleState, setTitle] = useState(title);

  const timerUpdateInterval = useRef(0);
  const titleInputRef = useRef<HTMLInputElement>(null);
  //let timeStart: number;

  const handleTitleSave = () => {
    console.log(
      `This is where we would save the title: "${titleState}" to the database.`
    );
  };

  const handleFocus = () => {
    console.log("handling focus");
    if (titleState == constants.DEFAULT_TASK_TITLE) {
      setTitle("");
    }
  };

  const handleTimeStart = (index: number) => (e: MouseEvent) => {
    setRunning(!running);
    clearInterval(timerUpdateInterval.current);
    if (!running) {
      const timeStart = new Date().getTime() - distanceLogged;
      // Update the count down every 1 second

      timerUpdateInterval.current = setInterval(function () {
        // Get today's date and time
        const timeNow = new Date().getTime();

        // Find the distance between now and the count down date
        setDistance(timeNow - timeStart);
      }, 1000);
    }
  };

  const getTimeLoggedString = (distance: number) => {
    // Time calculations for days, hours, minutes and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="demo"
    return minutes + "m " + seconds + "s ";
  };

  return (
    <>
      <div className="task-item-container">
        <Editable
          text={titleState}
          type="text"
          placeholder={constants.DEFAULT_TASK_TITLE}
          childRef={titleInputRef}
          handleFocus={handleFocus}
          handleSave={handleTitleSave}
        >
          <input
            className="title-input"
            ref={titleInputRef}
            value={titleState}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
        </Editable>
        <TaskItemButtonsContainer
          id={id}
          running={running}
          handleTimeButtonClick={handleTimeStart}
          handleChildButtonClick={handleChildButtonClick}
        />
        <h4 className="time-logged">{getTimeLoggedString(distanceLogged)}</h4>
      </div>
      <div className="sub-list">
        <TaskList
          tasks={tasks}
          rootTaskIndicies={tasks[id].childIndicies}
          handleChildButtonClick={handleChildButtonClick}
        />
      </div>
    </>
  );
};

export default TaskListItem;
