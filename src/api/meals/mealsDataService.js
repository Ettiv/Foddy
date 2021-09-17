import axios from 'axios';

import {
    JPA_API_URL
} from '../../constants/constants.js';

class MealsDataService {

    retriveAllMeals(page, size) {
        return axios.get(`${JPA_API_URL}/meals?page=${page}&size=${size}`);
    }

    retriveMeal(id) {
        return axios.get(`${JPA_API_URL}/meals/${id}`);
    }

    retriveMealProducts(id) {
        return axios.get(`${JPA_API_URL}/meals/${id}/products?size=100`);
    }

    updateMeal(id, meal) {
        return axios.put(`${JPA_API_URL}/meals/${id}`, meal);
    }

    createMeal(meal) {
        return axios.post(`${JPA_API_URL}/meals`, meal);
    }

    deleteMeal(id) {
        return axios.delete(`${JPA_API_URL}/meals/${id}`);
    }

    retriveMealСompositionByMealId(id){
        return axios.get(`${JPA_API_URL}/mealProducts/search/findByMealId?mealId=${id}`);
    }

    crateProductInMealProducts(product){
        return axios.post(`${JPA_API_URL}/mealProducts`, product);
    }

    deleteProductInMealProducts(id){
        return axios.delete(`${JPA_API_URL}/mealProducts/${id}`);
    }

    updateProductInMealProducts(id,mealProduct){
        return axios.put(`${JPA_API_URL}/mealProducts/${id}`, mealProduct);
    }

    




    // retriveAllReadyDocuments(){
    //     return axios.get(`${JPA_API_URL}/docs?projection=docFull`);
    // }

    // retriveSearchDocuments(searchParametr){
    //     return axios.get(`${JPA_API_URL}/docs/search/findByName?name=${searchParametr}&projection=docFull`);
    // }

    // retriveAllUsers() {
    //     return axios.get(`${JPA_API_URL}/employees`);
    // }

    // retriveAllVids() {
    //     return axios.get(`${JPA_API_URL}/vids`);
    // }

    

    // retriveTypeById(id){
    //     axios.get(`${JPA_API_URL}/types/${id}`);
    // }

    // retriveVidById(id){
    //     axios.get(`${JPA_API_URL}/vids/${id}`);
    // }

    // retriveOrgById(id){
    //     axios.get(`${JPA_API_URL}/orgs/${id}`);
    // }

    // retriveEmployeeById(id){
    //     axios.get(`${JPA_API_URL}/employees/${id}`);
    // }

    // retriveAllOrganisations() {
    //     return axios.get(`${JPA_API_URL}/orgs`);
    // }

    

    // retriveReadyDocument(id) {
    //     return axios.get(`${JPA_API_URL}/docs/${id}?projection=docFull`);
    // }


    

}


export default new MealsDataService();
