import React from 'react';
import Tasks from './Tasks';
import { MdDeleteForever } from 'react-icons/md';
import { fromSafetyToHtml } from '../helpers';

const SelectedProject = ({
  project,
  onDelete,
  onAddTask,
  onDeleteTask,
  tasks,
}) => {
  const { title, description, date } = project;

  return (
    <div className='w-full rounded-xl pt-16 px-7 bg-black/90'>
      <header className='pb-4 mb-4 border-b-2 border-stone-300'>
        <div className='flex items-center justify-between'>
          <h1 className='text-3xl font-bold text-stone-200 mb-2 overflow-hidden text-ellipsis break-all'>
            {fromSafetyToHtml(title)}
          </h1>
          <button
            className='text-rose-600  hover:text-rose-700'
            onClick={onDelete}
          >
            <MdDeleteForever className='w-10 h-10 custom-drop-shadow'></MdDeleteForever>
          </button>
        </div>
        <p className='mb-4 text-stone-400'>{date}</p>
        <p className='text-green-500 whitespace-pre-wrap'>
          {fromSafetyToHtml(description)}
        </p>
      </header>
      <Tasks
        onAdd={onAddTask}
        onDelete={onDeleteTask}
        tasks={tasks}
        project={project}
      />
    </div>
  );
};

export default SelectedProject;
