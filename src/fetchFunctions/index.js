const url = import.meta.env.VITE_APP_URL;

const getProjectsFromDB = async () => {
  const res = await fetch(url + '/.json');
  if (!res.ok) {
    throw new Error('Oops... Some problem with server');
  }
  const list = await res.json();
  return list;
};

const setProjectsIntoDB = async (project) => {
  try {
    const res = await fetch(`${url}/projects/.json`, {
      method: 'POST',
      body: JSON.stringify(project),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) {
      throw new Error('Failde to add project. Some problem with server');
    }
    return await res.json();
  } catch (error) {
    throw new Error('Failed to fetch projects!');
  }
};

const setTasksIntoDB = async (task) => {
  try {
    const res = await fetch(`${url}/tasks/.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    if (!res.ok) {
      throw new Error('Failde to add task. Some problem with server');
    }
    return await res.json();
  } catch (error) {
    throw new Error('Failed to fetch tasks!');
  }
};

const deleteTaskFromDB = async (id) => {
  try {
    const res = await fetch(`${url}/tasks/${id}.json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error('Failde to add task. Some problem with server');
    }

    return await res.json();
  } catch (error) {
    throw new Error('Failed to fetch tasks!');
  }
};
const deleteProjectFromDB = async (id) => {
  try {
    const res = await fetch(`${url}/projects/${id}.json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error('Failde to delete task. Some problem with server');
    }

    return await res.json();
  } catch (error) {
    throw new Error('Failed to delete task... Some problem with server!');
  }
};

export {
  getProjectsFromDB,
  setProjectsIntoDB,
  setTasksIntoDB,
  deleteTaskFromDB,
  deleteProjectFromDB,
};
