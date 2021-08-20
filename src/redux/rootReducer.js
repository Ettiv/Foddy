import { combineReducers } from "redux";
import { menuActiveReducer } from "./menuActiveReducer";

//комбинирует рельюсеры нашего приложения
export const  rootReducer = combineReducers({
    menuActiveReducer: menuActiveReducer
});