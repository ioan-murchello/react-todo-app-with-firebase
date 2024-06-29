import React from 'react';
import logo from '../assets/no-projects.png';
import Button from './Button';

const NoProjectSelected = ({ onStartAddProject }) => {
  return (
    <div className='flex w-full flex-col justify-center items-center text-center sm:w-2/3'>
      <img
        className='w-16 h-16 object-contain mx-auto'
        src={logo}
        alt='An empty tasks list'
      />
      <h2 className='text-xl font-bold text-stone-500 my-4'>
        No Project Selected
      </h2>
      <p className='text-stone-400 mb-4'>
        Select a project or get started with a new one
      </p>
      <div className='flex items-center justify-center mt-8'>
        <Button onClick={onStartAddProject}>Create new project</Button>
      </div>
    </div>
  );
};

export default NoProjectSelected;
