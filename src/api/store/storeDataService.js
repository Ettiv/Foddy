import axios from 'axios';

import {
    JPA_API_URL
} from '../../constants/constants.js';

class StoreDataService {

    retriveAllProductsInStore(page, size) {
        return axios.get(`${JPA_API_URL}/stores?page=${page}&size=${size}`);
    }

    deleteMealInStore(id){
        return axios.delete(`${JPA_API_URL}/stores/${id}`);
    }

    createMealInStore(meal){
        return axios.post(`${JPA_API_URL}/stores`, meal)
    }
    updateMealInStore(id, meal){
        return axios.put(`${JPA_API_URL}/stores/${id}`, meal);
    }
}


export default new StoreDataService();
