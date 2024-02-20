import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const Toast=()=>{
      toast.error("admin@gmail.com : admin", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
    });
    }

    const handleSubmit = () => {
        if (!email || !password) {
            toast.error("Please Fill All Fields!", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
            return;
        }

        if (password.length < 4) {
            toast.error("Password Length less than 4!", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
            return;
        }

        // Simulating a successful login, you can replace this with your own logic
        if (email === 'admin@gmail.com' && password === 'admin') {
            toast.success("Login Successful!", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });

            navigate('/');
            localStorage.setItem('TOKEN', 'your-token-here');
            localStorage.setItem('EMAIL', email);

        } else {
            toast.error("Invalid email or password !", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
        }
    }

    return (
        <>
            <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
                <div className="md:w-1/3 max-w-md">
                    <img
                        src="https://previews.123rf.com/images/qualitdesign/qualitdesign1911/qualitdesign191100081/135093857-cheerful-couple-win-money-in-bingo-lottery-vector-flat-cartoon-illustration-isolated-on-white.jpg?fj=1"
                        alt="Sample image" />
                </div>
                <div className="md:w-1/3 max-w-sm border-2 border-dotted pt-10 pb-10 pl-5 pr-5">
                    <h1 className='text-center text-3xl mb-2 font-bold'>Login </h1> <hr className='mb-5 mt-3' />
                    <label className='font-semibold'>Email Address:</label>
                    <input className="text-sm mt-2 w-full px-4 py-3 border border-solid border-gray-300 rounded mb-5"
                        onChange={(e) => { setEmail(e.target.value) }} value={email} type="text" placeholder="Enter Email Address" />
                    <label className='font-semibold '>Password</label>
                    <input className="text-sm  w-full px-4 py-3 border border-solid border-gray-300 rounded mt-2"
                        onChange={(e) => { setPassword(e.target.value) }} value={password} type="password" placeholder="Enter Password" />
                    <div className="text-center md:text-center">
                        <button className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-md tracking-wider" onClick={handleSubmit} type="submit">Login</button>
                    </div>
                    <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
                    <button style={{ textAlign: 'center', display: 'block', marginTop: '5px' }}  onClick={Toast} >login Hint</button>
                        <Link style={{ textAlign: 'center', display: 'block', marginTop: '5px' }}
                            to={'/signup'}> SIGN UP </Link>

                        <ToastContainer />
                    </div>
                </div>
            </section>
        </>
    )
}

export default Signin;
