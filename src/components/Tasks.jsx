import React from 'react';
import NewTask from './NewTask';
import { RiChatDeleteFill } from 'react-icons/ri';
import { fromSafetyToHtml } from '../helpers';

const Tasks = ({ onAdd, onDelete, tasks, project }) => {
  let currentId = tasks.filter((el) => el.projectId === project.id);

  return (
    <section className='pb-5'>
      <h2 className='text-2xl font-bold text-stone-200 mb-4'>Tasks</h2>
      <NewTask add={onAdd} ondelete={onDelete} />
      {currentId.length === 0 && (
        <p className='text-green-400 mt-4'>
          This project does not have any tasks yet
        </p>
      )}
      {currentId.length > 0 && (
        <ul className='flex flex-col gap-y-4 mt-8 rounded-md'>
          {currentId.map((task) => {
            let safeText = fromSafetyToHtml(task.text).split(' ');
            let styles = 'overflow-hidden';
            safeText.forEach((el) => {
              if (el.length > 50) {
                styles += ' whitespace-pre-wrap break-all';
              }
            });
            let str = safeText.join(' ');
            return (
              <li
                className='flex gap-x-4 rounded-lg bg-stone-200 p-3 border-b-2 border-gray-400 justify-between '
                key={task.id}
              >
                <span className={`${styles} p-1`}>{str}</span>
                <button
                  className='px-0 sm:px-5 hover:text-red-800'
                  onClick={() => onDelete(task.id)}
                >
                  <RiChatDeleteFill
                    className='w-6 h-6'
                    style={{ filter: 'drop-shadow(2px 2px 2px #f7738d)' }}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default Tasks;
