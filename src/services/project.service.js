const PORJECTS_API_URL = "https://modulo-proyectos.herokuapp.com/projects/";

const TASKS_API_URL = "https://modulo-proyectos.herokuapp.com/tasks/";

const RESOURCES_API_URL = "https://psa-resources-module.herokuapp.com/resource";

const TICKETS_API_URL = "https://psa-suport-module.herokuapp.com/tickets/";


class UserService {
  getProjects() {
    let pjs = fetch(PORJECTS_API_URL);
    return pjs
  }

  getProjectById(id) {
    let pjs = fetch(PORJECTS_API_URL + id);
    return pjs
  }

  updateProject(projectDetails) {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projectDetails)
    };
    let pjs = fetch(PORJECTS_API_URL + projectDetails.id, requestOptions);
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
    return resources
  }

  getTickets() {
    let tickets = fetch(TICKETS_API_URL);
    return tickets
  }


  getTasks() {
    let pjs = fetch(TASKS_API_URL);
    return pjs
  }

  getTaskById(id) {
    let tsk = fetch(TASKS_API_URL + id);
    return tsk
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

  updateTask(taskDetails) {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskDetails)
    };
    const res = fetch(TASKS_API_URL + taskDetails.id, requestOptions)
    return res
  }

  deleteTaskById(id) {
    let res = fetch(TASKS_API_URL + id, { method: 'DELETE'});
    return res
  }


  linkTaskAndTicket(ticketId, taskId){
    const requestOptions = {
      method: 'POST'
    };
    let url = TICKETS_API_URL + ticketId + "/task/" + taskId
    const res = fetch(url , requestOptions)
    return res
  }
}

export default new UserService();
