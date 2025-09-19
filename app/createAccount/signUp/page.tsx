import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

export default function SingUp() {
    return <div className="text-black w-[50%] space-y-12   p-8 m-auto mt-8">
        <div>
            <h1 className="text-3xl font-bold">Create account ,</h1>
            <p className="font-bold text-gray-400">sign up to get started ! </p>
        </div>
        <div className="space-y-8">
            <div className="space-y-3">
                <div className="form">
                    <input type="text" className=" textbox w-full " placeholder="" />
                    <label htmlFor="" className="label-box  text-gray-400 ">Full name</label>
                </div>
                <div className="form">
                    <input type="email" className=" textbox w-full " placeholder="" />
                    <label htmlFor="" className="label-box   text-gray-400 ">email</label>
                </div>
                <div className="form">
                    <input type="password" className=" textbox w-full" placeholder="" />
                    <label htmlFor="" className="label-box  text-gray-400  ">Password</label>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <button className=" transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500  p-2 rounded-2xl">Register</button>
                <button className="flex justify-center items-center button3 absolute gap-2"><FcGoogle size={20} />Continue with google</button>
            </div>
        </div>
        <p className="text-center font-bold text-gray-400">I am already a member <Link href={'/createAccount/signIn'}><span className="text-orange-500 ">Log In</span></Link></p>
    </div>
}