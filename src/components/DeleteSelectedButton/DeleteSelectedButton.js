import React from 'react';
import "./Button.css"

// DeleteSelectedButton component
function DeleteSelectedButton({ onDeleteSelected }) {
  // Render the delete selected button
  return (
    <div>
      <button className='delete-button' onClick={onDeleteSelected}>
        Delete Selected
      </button>
    </div>
  );
}

export default DeleteSelectedButton;
