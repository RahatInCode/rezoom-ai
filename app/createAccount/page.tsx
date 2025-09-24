"use client";
import Lottie from "lottie-react";

import createAccount from '../../public/lotties/createAccount.json'
import Link from "next/link";


export default function CreateAccount(){
    
   
    return <div className="text-black">
       <div className="w-[30%] m-auto p-4" >
         <div className="flex justify-center items-center flex-col">
            <h1 className="text-4xl font-bold text-center">Welcome</h1>
            <p className="text-center shrink-0" >Here you log in security</p>
        </div>
        <div >
            <Lottie animationData={createAccount}  loop={true} />;

        </div>
        <div>
            <Link href={'createAccount/signIn'}><button className="font-bold rounded-2xl w-full p-4 border-2 button1"><span>Log in</span></button> <br /></Link>
            <Link href={'createAccount/signUp'}><button className="font-bold rounded-2xl p-4 w-full border-2 button2"><span>Sign up</span></button></Link>
        </div>
       </div>
    </div>
}