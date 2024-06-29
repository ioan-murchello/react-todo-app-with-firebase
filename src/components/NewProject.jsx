import Input from './Input';
import { useRef } from 'react';
import Modal from './Modal';
import { BsClipboard2Check } from 'react-icons/bs';
import { BsClipboard2XFill } from 'react-icons/bs';
import { escapeHtml } from '../helpers/index';

const NewProject = ({ addProject, onCancel }) => {
  const modal = useRef();

  const title = useRef();
  const description = useRef();

  const handleSave = () => {
    const enteredTitle = title.current.value;
    const enteredDescription = description.current.value;
    const enteredDate = `${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`;

    if (enteredTitle.trim() === '' || enteredDescription.trim() === '') {
      modal.current.open();
      return;
    }

    addProject({
      title: escapeHtml(enteredTitle),
      description: escapeHtml(enteredDescription),
      date: enteredDate,
    });

    title.current.value = '';
    description.current.value = '';
  };

  return (
    <>
      <Modal ref={modal} buttonCaption='okay'>
        <h2>Invalid Input</h2>
        <p>Oops .. looks like you forgot provided a values</p>
      </Modal>
      <div className='w-full sm:w-[35rem] sm:mt-16'>
        <menu className='flex items-center justify-end gap-2 my-4'>
          <li>
            <button onClick={onCancel} className='group'>
              <BsClipboard2XFill className='w-8 h-8 text-rose-500 group-hover:text-rose-600 group-hover:scale-105' />
            </button>
          </li>
          <li>
            <button className='group' onClick={handleSave}>
              <BsClipboard2Check className='w-8 h-8 text-yellow-300 group-hover:text-yellow-500 group-hover:scale-105' />
            </button>
          </li>
        </menu>
        <div>
          <Input ref={title} label='Title' />
          <Input ref={description} label='Desctiption' textarea />
        </div>
      </div>
    </>
  );
};

export default NewProject;
