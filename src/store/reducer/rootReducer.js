import { cardReducer } from "./cardReducer";
import { mesReducer } from "./mesReducer";
import { userReducer } from "./userReducer";

export const rootReducer = {
    mes: mesReducer,
    user: userReducer,
    card: cardReducer
}