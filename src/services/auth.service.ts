/* eslint-disable @typescript-eslint/no-explicit-any */
import http from "../config/http.config";

export interface LoginCredentials{
    usernameOrEmail: string;
    password: string;
}

export const loginService = async(loginCredentials:LoginCredentials)=>{
    return await http.post("/auth/login", loginCredentials)
}

export const storeAuthToken = (token:string):boolean=>{
    try{
        localStorage.setItem("auth_token", token);
        return true;
    }catch(err:any){
        console.error(err);
        return false;
    }
}

export const getCurrentUserAuthToken = ():string | null=>{
    const authToken = localStorage.getItem("auth_token");
   return authToken;
}

export const isUserLoggedIn = ():boolean=>{
    const currentToken = getCurrentUserAuthToken();
    if(currentToken){
        return true;
    }
    return false;
}

export const logoutUser = ():boolean=>{
    try{
        localStorage.removeItem("auth_token");
        return true;
    }catch(err:any){
        console.error(err);
        return false;
    }
}

