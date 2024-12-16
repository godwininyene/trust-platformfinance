import phoneMock from '../assets/images/about_dark.png';
import logo from '../assets/images/logo.png';
import LoadingIndicator from '../components/LoadingIndicator';
import InputError from '../components/InputError';
import { Link, useNavigate} from 'react-router-dom';
import { useState } from 'react';
import axios from '../lib/axios';


const Login = () => {
  
   const[processing, setProcessing] = useState(false)
    const [errors, setErrors] = useState({email:''})
    const[message, setMessage] = useState()
    const navigate = useNavigate();


    const searchParams = new URLSearchParams(document.location.search)
    const token = searchParams.get('t')
    let pathname;

    const submit = async(e) => {
        e.preventDefault();
        setProcessing(true)
       
        try {
            let data = new FormData(e.target)
            let jsonData = Object.fromEntries(data);
            const response = await axios.patch(`api/v1/users/resetPassword/${token}`, jsonData);
            console.log(response)
            if(response.data.status === 'success'){
                alert("Password Reset Successfully.")
                // setMessage(response.data.message)
                if(response.data.data.user.role === 'user'){
                    pathname = '/manage/investor/dashboard'
                }else if(response.data.data.user.role === 'admin'){
                    pathname ='/manage/admin/dashboard'
                }
                navigate(pathname)
            }
            setProcessing(false)
        } catch (err) {
            console.log(err)
            setProcessing(false)
        
            if (err && !err.response) {
              alert(err);
            } else { 
                if(err.response.data.message){
                    setMessage(err.response.data.message)
                }
              const errors = {};
              err.response.data.errors.forEach(el =>{
                 for(let key in el){
                  errors[key] = el[key]
                 }
              })
              setErrors(errors)
            }
        }
    };

    return (
        <>
            <div className="bg-primary hidden md:block bg-cover bg-right-bottom" >
                <div className={`h-full bg-gradient-to-b from-[#000000ec] via-[#000000b9] to-[#000000b9] bg-opacity-95 text-primary`}>
                    
                    <div className='h-full'>
                        <img src={phoneMock} alt="mock" className={`w-[100%] -ml-14 -mt-14`} />
                    </div>
                </div>
            </div>

            <div className="relative min-h-full px-4 py-10 flex items-center justify-center dark:bg-slate-950 bg-slate-100">
                <section className={`w-full md:max-w-md mx-auto`}>

                   <div className='text-center'>
                        <Link to='/'>
                            <img src={logo} alt="" className={`h-16 mb-4 inline-block`} />
                        </Link>
                   </div>

                   <div className='p-10 bg-white dark:bg-slate-800 rounded-lg shadow-lg dark:text-white'>
                        <h3 className='font-bold text-2xl mb-10'>Forgot Password</h3>
                        {message && <div className="mb-7 font-medium text-sm text-red-600">{message}</div>}

                        <form className='' method='post' onSubmit={submit}>
                        

                            <div className="mb-1 relative">
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder="New Password" 
                                    required
                                    className='peer w-full py-3 px-5 rounded-md  bg-slate-100 dark:text-slate-700  transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0 focus:bg-white focus:shadow-lg'
                                />
                                <label htmlFor="" className='mb-2 text-xs block transition-all duration-300 peer-[&:not(:placeholder-shown)]:-translate-y-[75px] peer-[&:not(:placeholder-shown)]:opacity-100 peer-[&:not(:placeholder-shown)]:visible  -translate-y-10 opacity-0 invisible '>New Password</label>
                                <InputError message={errors.password} className="mt-1 absolute -bottom-1 dark:text-red-400" />
                            </div>

                            <div className="mb-1 relative">
                                <input
                                    type="password"
                                    name="passwordConfirm"
                                    placeholder="Confirm Password"
                                    className='peer w-full py-3 px-5 rounded-md  bg-slate-100 dark:text-slate-700  transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0 focus:bg-white focus:shadow-lg'
                                />
                                <label htmlFor="" className='mb-2 text-xs block transition-all duration-300 peer-[&:not(:placeholder-shown)]:-translate-y-[75px] peer-[&:not(:placeholder-shown)]:opacity-100 peer-[&:not(:placeholder-shown)]:visible  -translate-y-10 opacity-0 invisible '>Confirm Password</label>
                                <InputError message={errors.passwordConfirm} className="mt-1 absolute -bottom-1 dark:text-red-400" />
                            </div>

                            <div className='text-center'>
                                <button className='w-full inline-flex items-center justify-center gap-2 bg-primary hover:bg-green-700 rounded-md font-semibold px-2 py-3 transition-all duration-300 ease-in  text-white'>
                                    { processing && <LoadingIndicator size={5} /> }
                                    Reset Password
                                </button>
                            </div>
                        </form>
                    </div>


                  
                </section>
            </div>

        </>
    )
}

export default Login