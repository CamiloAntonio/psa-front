const PORJECTS_API_URL = "https://modulo-proyectos.herokuapp.com/projects/";

const TASKS_API_URL = "https://modulo-proyectos.herokuapp.com/tasks/";

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
    let resources = fetch("https://anypoint.mulesoft.com/mocking/api/v1/sources/exchange/assets/754f50e8-20d8-4223-bbdc-56d50131d0ae/recursos-psa/1.0.0/m/api/recursos");
    console.log(resources)
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
