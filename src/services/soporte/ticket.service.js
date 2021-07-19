import axios from 'axios';

const API_URL = "https://psa-suport-module.herokuapp.com/";

class TicketService {

    getTickets(){
        return axios.get(API_URL + "tickets").
        then (res => console.log(res))
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