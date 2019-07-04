import React from 'react';

export default function Operators(props) {
  return (
    <div className="button" onClick={() => props.handleClick(props.text)}>
      {props.text}
    </div>
  );
}
