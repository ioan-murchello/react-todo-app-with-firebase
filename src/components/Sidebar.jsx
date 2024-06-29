import React from 'react';
import Button from './Button';
import { SiReaddotcv } from 'react-icons/si';
import { fromSafetyToHtml } from '../helpers';

const Sidebar = ({
  onStartAddProject,
  projects,
  onSelectProject,
  selectedProjectId,
}) => {
  return (
    <aside className='w-full sm:w-full md:w-1/3 px-8 py-10 sm:py-16 bg-stone-900 text-stone-50 rounded-xl sm:rounded-r-xl'>
      <h2 className='mb-8 font-bold uppercase md:text-xl text-stone-200'>
        Your Projects
      </h2>
      <div>
        <Button onClick={onStartAddProject}>
          <SiReaddotcv />
          +add
        </Button>
      </div>
      <ul className='mt-8'>
        {projects &&
          projects.map((item) => {
            let classes =
              'w-full text-left px-2 py-1 border border-stone-700 rounded-md my-1 text-stone-400 hover:text-stone-200 overflow-hidden whitespace-nowrap';
            if (item.id === selectedProjectId) {
              classes += ' bg-stone-700 text-stone-200';
            } else {
              classes += ' text-stone-200';
            }
            return (
              <li key={item.id}>
                <button
                  onClick={() => onSelectProject(item.id)}
                  className={classes}
                >
                  {fromSafetyToHtml(
                    item.title.length > 40
                      ? `${item.title.slice(0, 40)}`
                      : item.title
                  )}
                </button>
              </li>
            );
          })}
      </ul>
    </aside>
  );
};

export default Sidebar;
