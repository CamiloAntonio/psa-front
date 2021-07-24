import axios from 'axios';

//const API_URL = "https://anypoint.mulesoft.com/mocking/api/v1/sources/exchange/assets/754f50e8-20d8-4223-bbdc-56d50131d0ae/clientes-psa/1.0.0/m/api/clientes";
const API_URL = "https://psa-suport-module.herokuapp.com/"

class ClientService {

    getClients(callback) {
        /*axios.get(API_URL, {
            method: 'GET',
            mode: 'no-cors',
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json',
            },
            withCredentials: true,
            credentials: 'same-origin',
          }).
        then (res => {return callback(res.data)});*/

        axios.get(API_URL + "clients").
        then (res => {return callback(res.data)});
    }
}

export default new ClientService();