import ChildButton from "./ChildButton";
import { MouseEvent } from "react";
import TimeButton from "./TimeButton";

interface Props {
  id: number;
  running: boolean;
  handleChildButtonClick: (id: number) => (e: MouseEvent) => void;
  handleTimeButtonClick: (id: number) => (e: MouseEvent) => void;
}
const TaskItemButtonsContainer = ({
  id,
  running,
  handleChildButtonClick,
  handleTimeButtonClick,
}: Props) => {
  return (
    <div className="task-item-buttons-container">
      <ChildButton id={id} handleChildButtonClick={handleChildButtonClick} />
      <TimeButton
        id={id}
        running={running}
        handleTimeButtonClick={handleTimeButtonClick}
      />
    </div>
  );
};

export default TaskItemButtonsContainer;
