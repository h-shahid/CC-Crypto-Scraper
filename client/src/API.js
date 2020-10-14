import axios from 'axios';

export default {
    getStocks: function() {
     return axios.get("/api");
    }
}