import { useEffect, useState } from 'react';
import NewProject from '../components/NewProject';
import NoProjectSelected from '../components/NoProjectSelected';
import Sidebar from '../components/Sidebar';
import SelectedProject from '../components/SelectedProject';
import { RiLoader4Fill } from 'react-icons/ri';
import Header from '../components/Header';
import { UserContext } from '../userContext';
import { useContext } from 'react';
// import {
//   addProjectsToLocalStorage,
//   getProjectsFromLocalStorage,
// } from './helpers';
import {
  setProjectsIntoDB,
  getProjectsFromDB,
  setTasksIntoDB,
  deleteTaskFromDB,
  deleteProjectFromDB,
} from '../fetchFunctions/index';

import { useQuery, useQueryClient } from '@tanstack/react-query';



function Main() {

  const { userState } = useContext(UserContext); 

  console.log(userState)

  const queryClient = useQueryClient();

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['todos'],
    queryFn: getProjectsFromDB,
  });

  const projectsFromDB = data?.projects
    ? Object.values(data.projects).reverse()
    : [];

  const tasksFromDB = data?.tasks ? Object.values(data.tasks).reverse() : [];

  const initialState = {
    projects: [],
    tasks: [],
    selectedProject: undefined,
  };

  const [projectsState, setProjectsState] = useState(
    {
      projects: projectsFromDB,
      tasks: tasksFromDB,
      selectedProject: undefined,
    } || initialState
  );

  useEffect(() => {
    if (isSuccess && data) {
      setProjectsState((prevState) => ({
        ...prevState,
        projects: projectsFromDB,
        tasks: tasksFromDB,
      }));
    }
  }, [isSuccess, data]);

  const handleStartAddProject = () => {
    setProjectsState((prevState) => ({
      ...prevState,
      selectedProject: null,
    }));
  };

  const handleAddProject = async (newProjectDatas) => {
    let newProject = {
      ...newProjectDatas,
      id: Math.random(),
    };

    await setProjectsIntoDB(newProject);

    queryClient.invalidateQueries(['todos']);
  };

  const handleCancelAddProject = () => {
    setProjectsState((prevState) => ({
      ...prevState,
      selectedProject: undefined,
    }));
  };

  const handleSelectProject = (id) => {
    setProjectsState((prevState) => ({
      ...prevState,
      selectedProject: id,
    }));
  };

  const handleDeleteProject = async () => {
    const projectsFromData = Object.entries(data.projects);
    const task = projectsFromData.find(
      (el) => el[1]['id'] === projectsState.selectedProject
    );

    if (data.tasks) {
      const elemTask = Object.entries(data.tasks);
      const elTask = elemTask.filter(
        (el) => el[1]['projectId'] === projectsState.selectedProject
      );
      if (elTask.length > 0) {
        for (let i = 0; i < elTask.length; i++) {
          await deleteTaskFromDB(elTask[i][0]);
        }
      }
    }

    if (task) {
      await deleteProjectFromDB(task[0]);

      setProjectsState((prevState) => ({
        ...prevState,
        selectedProject: undefined,
        projects: prevState.projects.filter(
          (item) => item.id !== projectsState.selectedProject
        ),
      }));
    }

    queryClient.invalidateQueries(['todos']);
  };

  const handleAddTask = async (text) => {
    const taskId = Math.random();
    const newTask = {
      projectId: projectsState.selectedProject,
      text,
      id: taskId,
    };

    await setTasksIntoDB(newTask);

    queryClient.invalidateQueries(['todos']);
  };

  const handleDeleteTask = async (id) => {
    const tasksFromData = Object.entries(data.tasks);
    const task = tasksFromData.find((el) => el[1]['id'] === id);

    if (task) {
      await deleteTaskFromDB(task[0]);
    }

    queryClient.invalidateQueries(['todos']);
  };

  const currentProject = projectsState.projects?.find(
    (item) => item.id === projectsState.selectedProject
  );

  let content;
  if (projectsState.selectedProject === null) {
    content = (
      <NewProject
        addProject={handleAddProject}
        onCancel={handleCancelAddProject}
      />
    );
  } else if (projectsState.selectedProject === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  } else {
    content = (
      <SelectedProject
        project={currentProject}
        onDelete={handleDeleteProject}
        onAddTask={handleAddTask}
        onDeleteTask={handleDeleteTask}
        tasks={projectsState.tasks.filter(
          (task) => task.projectId === projectsState.selectedProject
        )}
      />
    );
  }

  useEffect(() => {
    if (
      projectsState.projects?.length > 0 &&
      projectsState.selectedProject === undefined
    ) {
      handleSelectProject(projectsState.projects[0]['id']);
    }
  }, [projectsState.projects, projectsState.selectedProject]);

  return (
    <>
      <Header />
      <main className='container mx-auto min-h-screen flex flex-col sm:flex-row gap-5'>
        <Sidebar
          onStartAddProject={handleStartAddProject}
          projects={projectsState.projects}
          onSelectProject={handleSelectProject}
          selectedProjectId={projectsState.selectedProject}
        />
        {isLoading ? (
          <div className='flex items-center justify-center w-screen h-screen'>
            <RiLoader4Fill className='w-12 h-12 text-center animate-spin' />
          </div>
        ) : (
          content
        )}
      </main>
    </>
  );
}

export default Main;
