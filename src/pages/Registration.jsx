import { NavLink } from 'react-router-dom';
import InputForm from '../components/InputForm';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { db } from '../firebase';
import { doc, setDoc, collection, addDoc, getDocs } from 'firebase/firestore';
import { useState } from 'react';
import { UserContext } from '../userContext';
import { useContext } from 'react';

const Registration = () => {
  const {setUserState} = useContext(UserContext);

  const [userData, setUserData] = useState({
    email: '',
    password: '',
    name: '',
  });

  const [isMember, setIsMember] = useState(false);

  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    return setUserData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const { email, password } = userData;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      const user = userCredential.user;
      const userProjectsCollection = collection(
        db,
        'users',
        user.uid,
        'projects'
      );

      const projectsSnapshot = await getDocs(userProjectsCollection);

      for (const projectDoc of projectsSnapshot.docs) {
        const projectData = projectDoc.data();
        const projectTasksCollection = collection(
          db,
          'users',
          user.uid,
          'projects',
          projectDoc.id,
          'tasks'
        );
        const tasksSnapshot = await getDocs(projectTasksCollection);
        const tasks = tasksSnapshot.docs.map((taskDoc) => taskDoc.data());

        setUserState(prevState => {
          return {
            ...prevState,
            projects : {id: projectDoc.id, ...projectData},
            tasks
          }
        })
      }

    } catch (error) {
      console.log('some error')
    }
  };

  const handleRegister = async (e) => {
    
    e.preventDefault();
    const auth = getAuth();
    const { email, password, name } = userData;

    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;

      await setDoc(doc(db, 'users', user.uid), {
        name,
        email,
        uid: user.uid,
      });

      const userProjectsCollection = collection(
        db,
        'users',
        user.uid,
        'projects'
      );
      const defaultProject = await addDoc(userProjectsCollection, {
        title: 'Default Project',
        description: 'This is your default project',
      });

      const projectTasksCollection = collection(
        db,
        'users',
        user.uid,
        'projects',
        defaultProject.id,
        'tasks'
      );
      await addDoc(projectTasksCollection, {
        title: 'Default Task',
        description: 'This is your default task',
        completed: false,
        id: defaultProject.id,
      });

      console.log('User registered and default data created');
    } catch (error) {
      console.error('Error registering user:', error.message);
    }
  };

  return (
    <form className='grid place-items-center grid-cols-1 gap-2 border bg-black/90 border-indigo-500 rounded-2xl px-6 py-5 w-full h-full shadow-lg shadow-indigo-200'>
      <div className='p-3 border text-xl text-yellow-300 rounded-xl'>
        React-Todo-App
      </div>
      <div className='flex flex-col gap-4'>
        <h2 className='text-2xl font-semibold mb-4 text-indigo-300'>
          {/* {values.isMember ? 'Login' : 'Register'} */}
        </h2>
        {!isMember && (
          <InputForm
            label='name'
            type='text'
            name='name'
            statevalues={userData.name}
            handler={handleInputs}
          />
        )}

        <InputForm
          label='email'
          type='email'
          name='email'
          statevalues={userData.email}
          handler={handleInputs}
        />
        <InputForm
          label='password'
          type='password'
          name='password'
          statevalues={userData.password}
          handler={handleInputs}
        />
        <button
          type='submit'
          className='btn bg-yellow-500 rounded w-full capitalize hover:bg-yellow-300'
          //   disabled={isLoading}
          onClick={(e) => {
            !isMember ? handleRegister(e) : handleLogin(e);
          }}
        >
          submit
        </button>
        <button
          type='button'
          className='btn bg-yellow-300 rounded w-full capitalize hover:bg-yellow-600'
          //   disabled={isLoading}
          //   onClick={() =>
          //     dispatch(
          //       loginUser({ email: 'testUser@test.com', password: 'secret' })
          //     )
          //   }
          onClick={() => setIsMember((member) => !member)}
        >
          {isMember ? 'Not a member yet? Register' : 'Allready a member? Login'}
          {/* {isLoading ? 'loading...' : 'demo app'} */}
        </button>
      </div>
      <span className=''>
        {/* {values.isMember ? 'Not a memeber yet? ' : 'Allready a member? '} */}
        <button
          //  onClick={memberHandler}
          className='text-green-500 font-semibold cursor-default'
        >
          back to{' '}
          <NavLink className=' text-yellow-400 hover:underline' to='/'>
            Menu
          </NavLink>
        </button>
      </span>
    </form>
  );
};
export default Registration;
