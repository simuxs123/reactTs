import * as actionTypes from './action'
import {BurgerProps} from '../containers/BurgerBuilder/BurgerBuilder'
const initialState:BurgerProps={
    ingridients:{},
    totalPrice:0
}
const reducer=(state=initialState,action: { type: string })=>{
    switch(action.type){
        case actionTypes.ADD_INGRIDIENTS:
    }
    return state;
}
export default reducer;