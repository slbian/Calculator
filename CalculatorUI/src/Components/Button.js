import React from 'react';

export default function Operators({ handleClick, text }) {
  return (
    <div className="button" onClick={() => handleClick(text)}>
      {text}
    </div>
  );
}
