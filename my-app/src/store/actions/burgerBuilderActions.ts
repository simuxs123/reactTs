import {ActionTypes} from './actionTypes'
import {Ingridients} from '../reducers/burgerBuilder'
import { instance } from '../../axios-orders';
import { Dispatch } from 'redux';
import {AddIngridientAction,RemoveIngridientAction,SetIngridientsAction,SetFetchIngridientsFailed} from '../reducers/burgerBuilder'

export const addIngridients=(name:string):AddIngridientAction=>{
    return {
        type: ActionTypes.ADD_INGRIDIENTS,
        ingridientName:name
    }
}
export const removeIngridients=(name:string):RemoveIngridientAction=>{
    return {
        type: ActionTypes.REMOVE_INGRIDIENTS,
        ingridientName:name
    }
}
export const setIngridients=(ingridients:Ingridients):SetIngridientsAction=>{
    return {
        type:ActionTypes.SET_INGRIDIENTS,
        ingridients:ingridients
    }
}
export const fetchIngridientsFailed=():SetFetchIngridientsFailed=>{
    return {
        type:ActionTypes.FETCH_INGRIDIENTS_FAILED,
        
    }
}
export const initIngridients=():any=>{  //nesugalvoju ka cia rasyti!!
    return async (dispatch: Dispatch)=>{
        try {
            const res = await instance.get<Ingridients>(
                '/ingridients.json'
            );
            dispatch<SetIngridientsAction>(setIngridients(res.data));
        } catch (err) {
            dispatch<SetFetchIngridientsFailed>(fetchIngridientsFailed());
        }
    }
}
