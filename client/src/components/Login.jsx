import React, { useState } from 'react';
import api from '../apis/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();

    const defaultValues = {
        emailID: "",
        password: ""
    }

    const [UserLog, setUserLog] = useState(defaultValues);

    const HandleValidate = async () => {

        try {

            if (!UserLog.emailID || !UserLog.password)
                return alert("Enter the required fields")

            const res = await api.post("/auth/login", UserLog);
            
            if(res.status === 200){
                localStorage.setItem("Logined", true);
                localStorage.setItem("user", JSON.stringify(res.data.firstName));
                navigate("/instructions")
            }

        }
        catch (err) {
            console.log(err)
            alert("something went wrong! Please check again later")
        }
    }

    return (
        <>
            <div className='bg-gray-900 min-h-screen text-gray-200'>
                <div className='w-[25%] border-2 p-8 flex flex-col rounded-lg relative top-50 left-147 space-y-4'>
                    <span className='text-2xl font-semibold text-center underline underline-offset-4'>Login</span>
                    <div className='space-y-2'>
                        <label className="relative top-3.5 left-2 bg-gray-900 px-2 text-[13px] font-semibold text-[#ffffff]">
                            Email Address<span className="text-red-500 text-md ml-1">*</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            required
                            value={UserLog.emailID}
                            onChange={(e) => setUserLog({ ...UserLog, emailID: e.target.value })}
                            className="w-full px-3 py-3 mt-1 border rounded-md text-[15px] outline-none focus:border-green-400"
                        />

                        <label className="relative top-3.5 left-2 bg-gray-900 px-2 text-[13px] font-semibold text-[#ffffff] mt-4">
                            Password<span className="text-red-500 text-md ml-1">*</span>
                        </label>
                        <input
                            type="password"
                            name="password"
                            required
                            value={UserLog.password}
                            onChange={(e) => setUserLog({ ...UserLog, password: e.target.value })}
                            className="w-full px-3 py-3 mt-1 border rounded-md text-[14px] outline-none font-semibold focus:border-green-400"
                        />
                    </div>
                    <button
                        className='cursor-pointer bg-green-500 p-2 mt-4 tracking-wide font-semibold text-black rounded-lg text-lg hover:bg-green-700 transition-colors duration-300'
                        onClick={HandleValidate}
                    >
                        start your exam
                    </button>
                </div>
            </div>
        </>
    )
}

export default Login;