import axios from 'axios';
import AuthService from "../components/Login/services/auth.service";

const API_URL = "https://gold-medical.herokuapp.com/user/";
// const API_URL = "http://192.168.0.29:9090/user/";

class UserService {
  getType(){
      return axios.get(API_URL + "type", {
        headers: { Authorization: `Bearer ${AuthService.getCurrentUser().accessToken}` }
    });
  }

  getPerson(){
    return axios.get(API_URL + "person", {
        headers: { Authorization: `Bearer ${AuthService.getCurrentUser().accessToken}` }
    });
  }

  updatePaciente(paciente){
    return axios.put(API_URL + "updatePatient", {
        "sexo": paciente.sexo,
        "email": paciente.email,
        "nombre": paciente.nombre,
        "apellido": paciente.apellido,
        "direccion": paciente.direccion,
        "ciudad": paciente.ciudad,
        "pais": paciente.pais,
        "fechaDeNac": paciente.fechaDeNac,
        "estudios": [],
        "dni": paciente.dni
    },
    {
        headers: { Authorization: `Bearer ${AuthService.getCurrentUser().accessToken}` }
    });
  }
  updateMedico(medico){
    return axios.put(API_URL + "updateMedic", {
        "sexo": medico.sexo,
        "email": medico.email,
        "nombre": medico.nombre,
        "apellido": medico.apellido,
        "direccion": medico.direccion,
        "ciudad": medico.ciudad,
        "pais": medico.pais,
        "fechaDeNac": medico.fechaDeNac,
        "senescyt": medico.senescyt,
        "especialidad": medico.especialidad,
        "horaComienzo": medico.horaComienzo,
        "horaFin": medico.horaFin,
        "dni": medico.dni,
        "descripcion": medico.descripcion
    },
    {
        headers: { Authorization: `Bearer ${AuthService.getCurrentUser().accessToken}` }
    });
  }

  reservarTurno(turno){
    return axios.post(API_URL + "newTurn/" + turno.idMedico, {
        "motivo": turno.motivo,
        "fecha": turno.fecha,
        "hora": turno.hora,
    },
    {
        headers: { Authorization: `Bearer ${AuthService.getCurrentUser().accessToken}` }
    });
  }

  listarMedicosActivos(){
    return axios.get(API_URL + "activeMedic", {
        headers: { Authorization: `Bearer ${AuthService.getCurrentUser().accessToken}` }
    });
  }

  getTurnos(){
    return axios.get(API_URL + "turns", {
        headers: { Authorization: `Bearer ${AuthService.getCurrentUser().accessToken}` }
    });
  }

  switchMedicStatus(idMedico){
    return axios.put(API_URL + "switchStatus/" + idMedico, {
      headers: { Authorization: `Bearer ${AuthService.getCurrentUser().accessToken}` }
    });
  }

  getPatients(){
    return axios.get(API_URL + "patients", {
      headers: { Authorization: `Bearer ${AuthService.getCurrentUser().accessToken}` }
    });
  }

  //Todo lo referido al chat
  getChats(){
    return axios.get(API_URL + "chats", {
      headers: { Authorization: `Bearer ${AuthService.getCurrentUser().accessToken}` }
    });
  }

  getChat(idChat){  
    return axios.get(API_URL + "chats/" + idChat, {
      headers: { Authorization: `Bearer ${AuthService.getCurrentUser().accessToken}` }
    });
  }

  sendMsg(idChat, msg){
    return axios.put(API_URL + "chats/" + idChat + "/send",{
      contenido: msg,
    }, 
    {
      headers: { Authorization: `Bearer ${AuthService.getCurrentUser().accessToken}` }
    });
  }

  //perfil medico
  updateClinicProfile(idPaciente, perfilMedico){
    return axios.put(API_URL + "updateProfile/" + idPaciente, {
      alergia: perfilMedico.alergia,
      antFamiliares: perfilMedico.antFamiliares,
      antPersonales: perfilMedico.antPersonales,
      edad: perfilMedico.edad,
      estatura: perfilMedico.estatura,
      grupoSanguineo: perfilMedico.grupoSanguineo,
      idPerfil: perfilMedico.idPerfil,
      medicacion: perfilMedico.medicacion,
      peso: perfilMedico.peso
    },
    {
      headers: { Authorization: `Bearer ${AuthService.getCurrentUser().accessToken}` }
    });
  }
}

export default new UserService();
