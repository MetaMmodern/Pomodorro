import React from 'react';
import { TextField, IconButton } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import './TaskAdder.scss';
export default function TaskAdder() {
  return (
    <div className="TaskAdder">
      <form action="none" style={{ display: 'flex', alignItems: 'center' }}>
        <TextField label="Task name" />
        <IconButton>
          <AddCircle color="primary" fontSize="large" />
        </IconButton>
      </form>
    </div>
  );
}
