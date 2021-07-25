import axios from 'axios';

const API_URL = "https://psa-hours-module.herokuapp.com/";

class HoursService {

    getHours(callback){
        axios.get(API_URL + "hour").
        then (res => {return callback(res.data)});
    }

    createHours(hour) {
        axios.post(API_URL + "hour", hour)
    }
    
    updateHours(hour){
        axios.put(API_URL + "hour/" + hour.id, hour);
    }
}

export default new HoursService();