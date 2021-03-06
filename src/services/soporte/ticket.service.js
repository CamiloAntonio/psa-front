import axios from 'axios';

const API_URL = "https://psa-suport-module.herokuapp.com/";

class TicketService {

    getTickets(callback){
        axios.get(API_URL + "tickets").
        then (res => {return callback(res.data)});
    }

    getTicketByProductAndVersion(productName, versionNumber, callback) {
        axios.get(API_URL + "tickets/" + productName + "/" + versionNumber).
        then (res => {return callback(res.data)});
    }

    getTicketById(id, successCallback,errorCallback) {
        axios.get(API_URL + "tickets/" + id)
        .then (res => {return successCallback(res.data)})
        .catch(error => { return errorCallback(error)});
    }

    createTicket(ticket, callback) {
        axios.post(API_URL + "tickets", ticket).
        then (res => {return callback(res.data)});
    }

    updateTicket(tkt, callback){
        axios.put(API_URL + "tickets/" + tkt.ticketNumber, {
            "title" : tkt.title,
            "client" : tkt.client,
            "responsible" : tkt.responsible,
            "severity" : tkt.severity,
            "state" : tkt.state,
            "description" : tkt.description,
        }).then (res => {return callback(res.data)}
        );
    }

    deleteTicketById(tktId,callback) {
        axios.delete(API_URL + "tickets/" + tktId).
        then(res => {return callback(res.data)});
    }

    getTickedLinkedTasks(ticketId, callback) {
        axios.get(API_URL + "tickets/" + ticketId + "/task").
        then (res => {return callback(res.data)});
    }
}

export default new TicketService();