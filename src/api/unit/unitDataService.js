import axios from 'axios';

import {
    JPA_API_URL
} from '../../constants/constants.js';

class UnitDataService {

    retriveAllUnits() {
        return axios.get(`${JPA_API_URL}/units`);
    }

}


export default new UnitDataService();
