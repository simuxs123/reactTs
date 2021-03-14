import {ActionTypes} from '../actions/actionTypes'
import { instance } from '../../axios-orders';
import { Dispatch } from 'redux';
import {SetPurchaseBurgerFail,SetPurchaseBurgerSuccess,SetPurchaseBurger,SetPurchaseInit,SetFetchOrderSuccess,SetFetchOrderFail, SetFetchOrders} from '../reducers/order'
import {OrderReq} from '../../containers/Checkout/ContactData/ContactData'
export const purchaseBurgerSuccess=(id:string,orderData:OrderReq):SetPurchaseBurgerSuccess=>{
return{
        type:ActionTypes.PURCHASE_BURGER_SUCCESS,
        orderId:id,
        orderData:orderData
    }
}
export const purchaseBurgerFail=(error:object):SetPurchaseBurgerFail=>{
    return{
        type:ActionTypes.PURCHASE_BURGER_FAIL,
        error:error
    }
}
export const purchaseBurger=():SetPurchaseBurger=>{
    return{
        type:ActionTypes.PURCHASE_BURGER_LOADING
    }
}
export const purchaseBurgerStart=(orderData:OrderReq,token:string):any=>{ //nezinau tipo
return async (dispatch: Dispatch)=>{
        dispatch(purchaseBurger());
        try {
            const res = await instance.post<{name:string}&OrderReq>(
                '/orders.json?auth='+token,orderData
            );
            dispatch(purchaseBurgerSuccess(res.data.name,orderData));
        } catch (err) {
            dispatch(purchaseBurgerFail(err));
        }
    }
}
export const purchaseInit=():SetPurchaseInit=>{
    return {
        type:ActionTypes.PURCHASE_INIT
    }
}
export const fetchOrderSuccess=(orders:OrderReq[]):SetFetchOrderSuccess=>{
    return {
        type:ActionTypes.FETCH_ORDERS_SUCCESS,
        orders:orders
    }
}
export const fetchOrderFail=(error:object):SetFetchOrderFail=>{
    return {
        type:ActionTypes.FETCH_ORDERS_FAILL,
        error:error
    }
}
export const fetchOrders=():SetFetchOrders=>{
    return{
        type:ActionTypes.FETCH_ORDERS_LOADING
    }
}
export const fetchOrdersStart=(token:string,userId:string):any=>{ //nezinau tipo
return async (dispatch: Dispatch)=>{
        dispatch(fetchOrders());
        const queryParams:string='?auth='+token+'&orderBy="userId"&equalTo="'+userId+'"';
        try {
            const res = await instance.get<OrderReq[]>(
                '/orders.json'+queryParams,
            );
            const fetchedOrders=[];
            for(let key in res.data){
                fetchedOrders.push({
                    ...res.data[key],
                    id:key
                })
            }
            dispatch(fetchOrderSuccess(fetchedOrders));
        } catch (err) {
            dispatch(fetchOrderFail(err));
        }
    }
}