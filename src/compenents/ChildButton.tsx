import { MouseEvent } from "react";

interface Props {
  id: number;
  handleChildButtonClick: (id: number) => (e: MouseEvent) => void;
}

const ChildButton = ({ id, handleChildButtonClick }: Props) => {
  return (
    <button
      className="child-button task-item-button"
      onClick={handleChildButtonClick(id)}
    >
      ChildButton
    </button>
  );
};

export default ChildButton;
