import { combineReducers } from "redux";
import { mesReducer } from "./mesReducer";

export const rootReducer = combineReducers({
    mes: mesReducer
}) 