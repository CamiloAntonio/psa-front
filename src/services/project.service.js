const PORJECTS_API_URL = "https://modulo-proyectos.herokuapp.com/projects/";

const TASKS_API_URL = "https://modulo-proyectos.herokuapp.com/tasks/";

const RESOURCES_API_URL = "http://psa-resources-module.herokuapp.com/resource";

class UserService {
  getProjects() {
    let pjs = fetch(PORJECTS_API_URL);
    console.log(pjs)
    return pjs
  }

  getProjectById(id) {
    let pjs = fetch(PORJECTS_API_URL + id);
    console.log(pjs)
    return pjs
  }

  deleteProjectById(id) {
    let res = fetch(PORJECTS_API_URL + id, { method: 'DELETE'});
    return res
  }

  postProject(projectDetails) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projectDetails)
    };
    const res = fetch(PORJECTS_API_URL, requestOptions)
    return res
  }

  getResources() {
    let resources = fetch(RESOURCES_API_URL);
    console.log("las resource", resources)
    return resources
  }

  getTasks() {
    let pjs = fetch(TASKS_API_URL);
    console.log(pjs)
    return pjs
  }

  postTask(taskDetails) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskDetails)
    };
    const res = fetch(TASKS_API_URL, requestOptions)
    return res
  }

}

export default new UserService();
