import {ActionTypes} from '../actions/actionTypes'
export interface AuthStateProps {
    token:string,
    userId:string,
    errorAuth:string,
    loadingAuth:boolean
    authRedirectPath:string
}
export interface AuthData {
    password:string,
    email:string
}
export interface AuthLoadingAction{
    type:ActionTypes.AUTH_LOADING
}
export interface AuthRedirectAction{
    type:ActionTypes.SET_AUTH_REDIRECT_PATH,
    path:string
}
export interface AuthLogoutAction{
    type:ActionTypes.AUTH_LOGOUT
}
export interface AuthSuccessAction{
    type:ActionTypes.AUTH_SUCCESS,
    token:string,
    userId:string|null
}
export interface AuthFailAction{
    type:ActionTypes.AUTH_FAIL
    error:string
}
type AuthActions =AuthFailAction|AuthLoadingAction|AuthSuccessAction|AuthLogoutAction|AuthRedirectAction;
const initialState:AuthStateProps={
    token:"",
    userId:"",
    errorAuth:"",
    loadingAuth:false,
    authRedirectPath:"/"
}
const reducer =(state:AuthStateProps=initialState,action:AuthActions)=>{
    switch(action.type){
        case ActionTypes.SET_AUTH_REDIRECT_PATH:
            return {
                ...state,
                authRedirectPath:action.path
            }
        case ActionTypes.AUTH_LOADING:
            return {
            ...state,
            loadingAuth:true,
            errorAuth:""
        }
        case ActionTypes.AUTH_LOGOUT:
            return {
            ...state,
            token:"",
            userId:""
        }
        case ActionTypes.AUTH_SUCCESS:
            return {
                ...state,
                loadingAuth:false,
                token:action.token,
                userId:action.userId,
                errorAuth:""
            }
        case ActionTypes.AUTH_FAIL:
            return {
                ...state,
                errorAuth:action.error,
                loadingAuth:false
            }
        default:
            return state;
    }
}
export default reducer;