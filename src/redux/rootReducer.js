import { combineReducers } from "redux";
import { menuActiveReducer } from "./menuActiveReducer";
import { pagesControolReducer } from "./pagesControolReducer";
import { searchParametrsReducer } from "./searchParametrsReducer";

//комбинирует рельюсеры нашего приложения
export const  rootReducer = combineReducers({
    menuActiveReducer: menuActiveReducer,
    pagesControolReducer:pagesControolReducer,
    searchParametrsReducer:searchParametrsReducer
});