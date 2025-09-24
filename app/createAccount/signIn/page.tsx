"use client";

import Link from "next/link";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
export default function SignIn(){
    const [open , setOpen] = useState(false)
   return <div className="text-black w-[50%] space-y-12   p-8 m-auto mt-8">
           <div>
               <h1 className="text-3xl font-bold">Welcome ,</h1>
               <p className="font-bold text-gray-400">sign In to Continue ! </p>
           </div>
           <div className="space-y-8">
               <div className="space-y-3">
                   
                   <div className="form">
                       <input type="email" className=" textbox w-full " placeholder="" />
                       <label htmlFor="" className="label-box   text-gray-400 ">email</label>
                   </div>
                   <div className="form">
                              <input type={open ? 'text' : 'password'} name="password" placeholder="" className="textbox w-full" />
                              <button onClick={() => { setOpen(!open) }} className='btn btn-xs absolute top-4 right-5'>{open ? <FaEye /> : <FaEyeSlash />}</button>
                              <label className="label-box text-gray-400">Password</label>
                            </div>
               </div>
               <div className="flex flex-col gap-2">
                   <button className=" transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500  p-2 rounded-2xl">Log in</button>
                   <button className="flex justify-center items-center hover:text-black button3 absolute gap-2"><FcGoogle size={20} />Continue with google</button>
               </div>
           </div>
           <p className="text-center font-bold text-gray-400">I am a new user <Link href={'/createAccount/signUp'}><span className="text-orange-500 ">Register</span></Link></p>
       </div>
}