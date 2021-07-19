const API_URL = "https://modulo-proyectos.herokuapp.com/projects/";

class UserService {
  getProjects() {
    let pjs = fetch(API_URL);
    console.log(pjs)
    return pjs
  }

  getProjectById(id) {
    let pjs = fetch(API_URL + id);
    console.log(pjs)
    return pjs
  }

  deleteProjectById(id) {
    let pjs = fetch(API_URL + id, { method: 'DELETE'});
    return pjs
  }

  postProject(projectDetails) {
    console.log("en el service")
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projectDetails)
    };
    const res = fetch(API_URL, requestOptions)
  }

  getResources() {
    let resources = fetch("https://anypoint.mulesoft.com/mocking/api/v1/sources/exchange/assets/754f50e8-20d8-4223-bbdc-56d50131d0ae/recursos-psa/1.0.0/m/api/recursos");
    console.log(resources)
    return resources
  }

}

export default new UserService();
