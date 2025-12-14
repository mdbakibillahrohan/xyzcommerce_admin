import { useEffect, type ReactElement } from "react";
import type React from "react";
import { isUserLoggedIn } from "../services/auth.service";
import { useNavigate } from "react-router";

const AuthGuardComponent:React.FC<{children:ReactElement}> = ({children})=>{
    const navigate = useNavigate();
    const loggedIn = isUserLoggedIn()

    useEffect(()=>{
        if(!loggedIn){
            navigate("/login")
        }
    }, [loggedIn, navigate])


    if(!loggedIn){
        return null;
    }

    return <>{children}</>
}

export default AuthGuardComponent;