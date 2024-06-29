import React, { useState } from 'react';
import { MdAddTask } from 'react-icons/md';
import { escapeHtml } from '../helpers';

const NewTask = ({ add }) => {
  const [enteredTask, setEnteredTask] = useState('');

  const handleChange = (e) => {
    setEnteredTask(e.target.value);
  };

  const handleClick = () => {
    if (enteredTask.trim() === '') {
      return;
    }
    add(escapeHtml(enteredTask));
    setEnteredTask('');
  };

  return (
    <div className='flex items-center gap-2'>
      <input
        className='w-full sm:w-64 p-2 rounded-md bg-stone-300 outline-none'
        type='text'
        value={enteredTask}
        onChange={handleChange}
      />
      <button
        className='text-stone-700 rounded-md bg-yellow-400 p-2 hover:text-stone-500'
        onClick={handleClick}
      >
        <MdAddTask className='w-6 h-6' />
      </button>
    </div>
  );
};

export default NewTask;
