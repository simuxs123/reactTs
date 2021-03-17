import {ActionTypes} from './actionTypes'
import axios from 'axios';
import { Dispatch } from 'redux';
import {AuthLoadingAction,AuthFailAction,AuthSuccessAction,AuthLogoutAction,AuthRedirectAction } from '../reducers/auth'

export const logout =():AuthLogoutAction=>{
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate')
     localStorage.removeItem('userId')
    return {
        type:ActionTypes.AUTH_LOGOUT
    }
}
export const setAuthRedirect =(path:string):AuthRedirectAction=>{
    return {
        type:ActionTypes.SET_AUTH_REDIRECT_PATH,
        path:path
    }
}
export const checkAuthTimeout=(expirationTime:string|number):any=>{
    return (dispatch:Dispatch)=>{
        setTimeout(() => {
            dispatch(logout())
        }, +expirationTime*1000);
    }
}
export const authLoading=():AuthLoadingAction=>{
    return {
        type:ActionTypes.AUTH_LOADING
    }
}
export const authSucces=(idToken:string,userId:string|null):AuthSuccessAction=>{
    return {
        type:ActionTypes.AUTH_SUCCESS,
        token:idToken,
        userId:userId
    }
}
export const authFail=(err:string):AuthFailAction=>{
    return {
        type:ActionTypes.AUTH_FAIL,
        error:err
    }
}
export const auth=(email:string,password:string,isSignup:boolean):any=>{
    return async (dispatch:Dispatch)=>{
        dispatch(authLoading());
        try{
            const authData={
                email:email,
                password:password,
                returnSecureToken:true
            }
            let url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCIdArHqkh_GZYeSvw-z9s0RUYStbuHT3w'
            if(!isSignup){
                url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCIdArHqkh_GZYeSvw-z9s0RUYStbuHT3w'
            }
            const res =await axios.post(url,authData)
            const expirationDate:Date=new Date(new Date().getTime()+res.data.expiresIn*1000);
            localStorage.setItem('token',res.data.idToken)
            localStorage.setItem('expirationDate',expirationDate+"");
            localStorage.setItem('userId',res.data.localId)
            dispatch(authSucces(res.data.idToken,res.data.localId));
            if(!isSignup){
                dispatch(checkAuthTimeout(res.data.expiresIn));
            }
            
        } catch (err){
            console.log(err)
            dispatch(authFail(err.message));
        }
    }
}
export const authCheckState=():any=>{ //nezinau tipo
    return (dispatch:Dispatch) =>{
        const token:string|null =localStorage.getItem('token');
        if(!token){
            dispatch(logout());
        } else {
            const expirationDat:Date=new Date(localStorage.getItem("expirationDate")+"")
            if(expirationDat<new Date()){
                dispatch(logout());
            } else {
                const userId:string|null=localStorage.getItem('userId') 
                dispatch(authSucces(token,userId))
                dispatch(checkAuthTimeout((expirationDat.getTime()-new Date().getTime())/1000))
            }
            
        }
    }
}