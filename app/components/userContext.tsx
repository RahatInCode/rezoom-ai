'use client'

import { createContext, useContext } from "react"

type user ={
   name :  string,
   email : string,
   age : number
}

const userInfo : user = {
    name : 'ABCD',
    email : 'abcd@email.com',
    age : 23
}

const RootContext = createContext<user>(userInfo)


export const RootProvider = ({children} : {children: React.ReactNode}) =>{
    return  (
        <RootContext.Provider value={userInfo}>
            {children}
        </RootContext.Provider>
    )

}

export const useRootContext = () => useContext(RootContext)