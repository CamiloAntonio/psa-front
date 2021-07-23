import axios from 'axios';

const API_URL = "http://psa-resources-module.herokuapp.com/";

class ResourceService {
    getResources(callback) {
        axios.get(API_URL + "resource").
        then (res => {return callback(res.data)});
    }

    async getResourceWithId(resourceId, callback,setFunc) {
        axios.get(API_URL + "resource/" + resourceId).
        then (res => {return callback(res.data,setFunc)});
    }
}

export default new ResourceService();