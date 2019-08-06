import React from 'react';

export default function Profile(props) {
  return (
    <div className="profile">
      {props.username} : {props.score}{' '}
    </div>
  );
}
