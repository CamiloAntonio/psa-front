const API_URL = "https://modulo-proyectos.herokuapp.com/projects/";

class UserService {
  getProjects(){
      let pjs =   fetch(API_URL);
      console.log(pjs)
      return pjs
  }
}

export default new UserService();
