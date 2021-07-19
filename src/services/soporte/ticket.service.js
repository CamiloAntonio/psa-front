import axios from 'axios';

const API_URL = "https://psa-suport-module.herokuapp.com/";

class TicketService {

    getTickets(callback){
        return axios.get(API_URL + "tickets").
        then (res => {return callback(res.data)});
    }

    updateTicket(tkt){
    return axios.put(API_URL + "tickets/" + tkt.id, {
        "title" : tkt.title,
        "client" : tkt.client,
        "responsible" : tkt.responsible,
        "severity" : tkt.severity,
        "state" : tkt.state,
        "description" : tkt.description,
    },
    {
        headers: {}
    });
  }

}

export default new TicketService();