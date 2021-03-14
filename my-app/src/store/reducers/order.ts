import{ActionTypes} from '../actions/actionTypes'
import {OrderReq} from '../../containers/Checkout/ContactData/ContactData'
export interface SetPurchaseBurgerSuccess {
    type:ActionTypes.PURCHASE_BURGER_SUCCESS,
    orderId:string,
    orderData: OrderReq
}
export interface SetPurchaseBurgerFail {
    type:ActionTypes.PURCHASE_BURGER_FAIL,
    error:object
}
export interface SetFetchOrderSuccess {
    type:ActionTypes.FETCH_ORDERS_SUCCESS,
    orders: OrderReq[],
}
export interface SetFetchOrderFail {
    type:ActionTypes.FETCH_ORDERS_FAILL,
    error:object
}
export interface SetPurchaseBurger {
    type:ActionTypes.PURCHASE_BURGER_LOADING
}
export interface SetFetchOrders {
    type:ActionTypes.FETCH_ORDERS_LOADING
}
export interface SetPurchaseInit {
    type:ActionTypes.PURCHASE_INIT
}
export interface OrderBurgerStateProps {
    orders:OrderReq[],
    loading:boolean,
    purchased:boolean
}

const initialState:OrderBurgerStateProps={
    orders:[],
    loading:false,
    purchased:false
}
const reducer=(state:OrderBurgerStateProps=initialState,action:SetFetchOrderFail|SetFetchOrderSuccess|SetFetchOrders|SetPurchaseInit|SetPurchaseBurgerFail|SetPurchaseBurgerSuccess|SetPurchaseBurger)=>{
    switch(action.type){
        case ActionTypes.PURCHASE_INIT:
            return{
                ...state,
                purchased:false
            }
        case ActionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder={
                ...action.orderData,
                id:action.orderId,
            }
            return{
                ...state,
                loading:false,
                orders:state.orders.concat(newOrder),
                purchased:true
            }
        case ActionTypes.PURCHASE_BURGER_FAIL:
            return{
                ...state,
                loading:false
            }
        case ActionTypes.PURCHASE_BURGER_LOADING:
            return{
                ...state,
                loading:true
            }
        case ActionTypes.FETCH_ORDERS_LOADING:
            return {
                ...state,
                loading:true
            }    
        case ActionTypes.FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                loading:false,
                orders:action.orders,
            }    
        case ActionTypes.FETCH_ORDERS_FAILL:
            return {
                ...state,
                loading:false
            }    
        default:
            return state;
    }
}
export default reducer;