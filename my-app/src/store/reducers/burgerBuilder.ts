import{ActionTypes} from '../actions/actionTypes'

export interface AddIngridientAction{
    type:ActionTypes.ADD_INGRIDIENTS,
    ingridientName:string,
}
export interface RemoveIngridientAction{
    type:ActionTypes.REMOVE_INGRIDIENTS,
    ingridientName:string,
}
export interface SetIngridientsAction {
    type:ActionTypes.SET_INGRIDIENTS,
    ingridients:Ingridients
}
export interface SetFetchIngridientsFailed {
    type:ActionTypes.FETCH_INGRIDIENTS_FAILED,
}
export interface BurgerBuilderStateProps {
    ingridients:Ingridients
    totalPrice: number;
    error:boolean,
    building:boolean
}
export interface Ingridients {
  [key: string]: number;
}
export interface BurgerProps {
    ingridients:Ingridients
    totalPrice: number;
}

type Price = {
  [key: string]: number;
};
const initialState:BurgerBuilderStateProps={
    ingridients:{},
    totalPrice:0,
    error:false,
    building:false
}
const INGRIDIENTS_PRICES: Price = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};
const reducer=(state:BurgerBuilderStateProps=initialState,action:AddIngridientAction|RemoveIngridientAction|SetFetchIngridientsFailed|SetIngridientsAction)=>{
    switch(action.type){
        case ActionTypes.ADD_INGRIDIENTS:
            return {
                ...state,
                ingridients:{
                    ...state.ingridients,
                    [action.ingridientName]:state.ingridients[action.ingridientName]+1,
                   
                },
                 totalPrice:state.totalPrice+INGRIDIENTS_PRICES[action.ingridientName],
                 building:true
            };
        case ActionTypes.REMOVE_INGRIDIENTS:
            return{
                ...state,
                ingridients:{
                    ...state.ingridients,
                    [action.ingridientName]:state.ingridients[action.ingridientName]-1,
                    
                },
                totalPrice:state.totalPrice-INGRIDIENTS_PRICES[action.ingridientName],
                building:true
            };
        case ActionTypes.SET_INGRIDIENTS:
            return{
                ...state,
                ingridients:action.ingridients,
                error:false,
                totalPrice:0,
                building:false
            }
        case ActionTypes.FETCH_INGRIDIENTS_FAILED:
            return {
                ...state,
                error:true
            }
        default:
            return state;
    }
}
export default reducer;