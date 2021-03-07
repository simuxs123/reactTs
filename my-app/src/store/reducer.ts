import{ActionTypes} from './action'
import {BurgerProps} from '../containers/BurgerBuilder/BurgerBuilder'
export interface Action{
    type:number,
    ingridientName:string
}
type Price = {
  [key: string]: number;
};
const initialState:BurgerProps={
    ingridients:{
        salad:0,
        bacon:0,
        cheese:0,
        meat:0
    },
    totalPrice:0
}
const INGRIDIENTS_PRICES: Price = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};
const reducer=(state:BurgerProps=initialState,action:Action)=>{
    switch(action.type){
        case ActionTypes.ADD_INGRIDIENTS:
            return {
                ...state,
                ingridients:{
                    ...state.ingridients,
                    [action.ingridientName]:state.ingridients[action.ingridientName]+1,
                   
                },
                 totalPrice:state.totalPrice+INGRIDIENTS_PRICES[action.ingridientName]
            };
        case ActionTypes.REMOVE_INGRIDIENTS:
            return{
                ...state,
                ingridients:{
                    ...state.ingridients,
                    [action.ingridientName]:state.ingridients[action.ingridientName]-1,
                    
                },
                totalPrice:state.totalPrice-INGRIDIENTS_PRICES[action.ingridientName]
            };
        default:
            return state;
    }
}
export default reducer;