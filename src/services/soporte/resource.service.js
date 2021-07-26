import axios from 'axios';

const API_URL = "https://psa-resources-module.herokuapp.com/";

class ResourceService {
    getResources(callback) {
        axios.get(API_URL + "resource").
        then (res => {return callback(res.data)});
    }

    getResourceWithId(id, callback) {
        axios.get(API_URL + "resource/" + id)
        .then (res => {return callback(res.data)});
    }
}

export default new ResourceService();