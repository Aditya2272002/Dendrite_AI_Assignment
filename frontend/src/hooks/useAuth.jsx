import React, { useEffect, useState } from 'react'
import Keycloak from "keycloak-js" 

const useAuth = () => {

   const [isLogin, setLogin] = useState(false);

   useEffect(()=>{
      const client = new Keycloak({
         url: import.meta.env.VITE_KEYCLOAK_URL,
         reaml: import.meta.env.VITE_KEYCLOAK_REALM,
         clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID
      })


      client.init({onLoad: "login-required"}).then((res)=> setLogin(res));
   }, [])

         
   return isLogin;
}

export default useAuth