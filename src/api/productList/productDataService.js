import axios from 'axios';

import {
    JPA_API_URL
} from '../../constants/constants.js';

class ProductDataService {

    retriveAllProducts(page, size) {
        return axios.get(`${JPA_API_URL}/products?page=${page}&size=${size}`);
    }

    retriveProduct(id) {
        return axios.get(`${JPA_API_URL}/products/${id}`);
    }

    retriveAllProductsTypes() {
        return axios.get(`${JPA_API_URL}/productTypes?size=100`);
    }

    updateProduct(id, product) {
        return axios.put(`${JPA_API_URL}/products/${id}`, product);
    }

    createProduct(product) {
        return axios.post(`${JPA_API_URL}/products`, product);
    }

    deleteProduct(id) {
        return axios.delete(`${JPA_API_URL}/products/${id}`);
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


export default new ProductDataService();
