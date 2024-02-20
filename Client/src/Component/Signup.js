import { useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = () => {
        if (!email || !password) {
            toast.error("Please Fill All Fields!", {
                position: toast.POSITION.TOP_CENTER, 
                autoClose: 2000, 
              });
            return;
        }

        if (password.length < 4) {
            toast.error("Password must be greater then 4!", {
                position: toast.POSITION.TOP_CENTER, 
                autoClose: 2000, 
              });
            return;
        }

        axios.post('http://localhost:5000/signup',
            {
                email: email,
                password: password
            })
            .then(res => {
                if (res.data.code === 200) {
                    toast.success("Registertration Succesfull !", {
                        position: toast.POSITION.TOP_CENTER, 
                        autoClose: 2000, 
                      });
                } else {
                    toast.error("Error in Submition!", {
                        position: toast.POSITION.TOP_CENTER, 
                        autoClose: 2000, 
                      });
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <>            <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
        <div className="md:w-1/3 max-w-md">
          <img
            src="https://previews.123rf.com/images/qualitdesign/qualitdesign1911/qualitdesign191100081/135093857-cheerful-couple-win-money-in-bingo-lottery-vector-flat-cartoon-illustration-isolated-on-white.jpg?fj=1"
            alt="Sample image" />
        </div>
        <div className="md:w-1/3 max-w-sm border-2 border-dotted pt-10 pb-10 pl-5 pr-5">
        <h1 className='text-center text-3xl mb-2 font-bold'>Sign Up </h1> <hr className='mb-5 mt-3'/>
        <label className='font-semibold'>Email Address:</label>
          <input className="text-sm mt-2 w-full px-4 py-3 border border-solid border-gray-300 rounded mb-5" onChange={(e) => { setEmail(e.target.value) }} value={email} type="text" placeholder="Enter Email Address" />
          <label className='font-semibold '>Password</label>
          <input className="text-sm  w-full px-4 py-3 border border-solid border-gray-300 rounded mt-2"  onChange={(e) => { setPassword(e.target.value) }} value={password} type="password" placeholder="Enter Password" />
          <div className="text-center md:text-center">
          
            <button className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-md tracking-wider"   onClick={handleSubmit} type="submit">Sign Up</button>
          </div>
          <div className="mt-4 font-semibold text-sm text-slate-500 text-center flex flex-row">
          <p>Dont have account?</p>
          <Link className="font-semibold ml-3 underline"
                    to={'/signin'}
                >LOGIN</Link>
     
                <ToastContainer />
          </div>
        </div>
      </section>
        </>
    );
}

export default Signup;
