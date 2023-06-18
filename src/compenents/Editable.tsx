// Editable.js
import React, { useState, useEffect, KeyboardEvent, ReactNode } from "react";

interface Props {
  text: string;
  type: string;
  placeholder: string;
  childRef: React.RefObject<HTMLInputElement>;
  handleSave: () => void;
  handleFocus: () => void;
  children: ReactNode;
}

// Component accept text, placeholder values and also pass what type of Input - input, textarea so that we can use it for styling accordingly
const Editable = ({
  text,
  type,
  placeholder,
  childRef,
  handleSave,
  handleFocus,
  children,
}: Props) => {
  // Manage the state whether to show the label or the input box. By default, label will be shown.
  // Exercise: It can be made dynamic by accepting initial state as props outside the component
  const newChild: boolean = text == "";
  const [isEditing, setEditing] = useState(newChild); // There is probably a better way to do this, but this is easy

  useEffect(() => {
    if (childRef && childRef.current && isEditing === true) {
      childRef.current.focus();
      //childRef.current.select();
    }
  }, [isEditing, childRef]);

  // Event handler while pressing any key while editing
  const handleKeyDown = (e: KeyboardEvent) => {
    // Handle when key is pressed
    if (["Escape", "Tab", "Enter"].includes(e.key)) {
      setEditing(false);
      handleSave();
    }
  };

  /*
- It will display a label is `isEditing` is false
- It will display the children (input or textarea) if `isEditing` is true
- when input `onBlur`, we will set the default non edit mode
Note: For simplicity purpose, I removed all the classnames, you can check the repo for CSS styles
*/
  return (
    <div className="title-container">
      {isEditing ? (
        <div
          onBlur={() => setEditing(false)}
          onKeyDown={(e) => handleKeyDown(e)}
        >
          {children}
        </div>
      ) : (
        <div
          onClick={() => {
            //handleFocus();
            setEditing(true);
            console.log("clicked!");
          }}
        >
          <span className="title-container">
            {text || placeholder || "Editable content"}
          </span>
        </div>
      )}
    </div>
  );
};

export default Editable;
