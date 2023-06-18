import { MouseEvent } from "react";

interface Props {
  id: number;
  running: boolean;
  handleTimeButtonClick: (id: number) => (e: MouseEvent) => void;
}

const TimeButton = ({ id, running, handleTimeButtonClick }: Props) => {
  return (
    <button
      className={`time-button task-item-button ${running ? "running" : ""}`}
      onClick={handleTimeButtonClick(id)}
    >
      {running ? "Stop" : "Start"}
    </button>
  );
};

export default TimeButton;
