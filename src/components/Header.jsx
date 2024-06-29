import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const [user, setUser] = useState({
    name: null,
    email: null,
    password: null,
    isMember: false,
  });
  return (
    <header className='container text-stone-200 flex gap-x-5 mx-auto px-4 py-5 mb-5 rounded-xl bg-black/90'>
      {user.name && <span>{`Hello ${user.name}`}</span>}
      <button className='border rounded-xl text-yellow-300 px-2'>
        <NavLink to='register'>{user.name ? 'Logout' : 'Login'}</NavLink>
      </button>
      {!user.isMember && (
        <span>
          Not a member yet?{' '}
          <a className='border px-2 py-1 rounded-xl'>Register</a>
        </span>
      )}
    </header>
  );
};
export default Header;
