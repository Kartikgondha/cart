

import { combineReducers } from "redux";
import { alertRedecer } from "./alert.reducer";
import { categoryreducer } from "./Category.reducer";
import { productreducer } from "./Product.reducer";
import { authreducer } from "./Reducer";



export const rootreducer = combineReducers({
    auth : authreducer, 
    alert : alertRedecer,
    category : categoryreducer,
    product : productreducer,
})