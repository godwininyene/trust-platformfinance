import phoneMock from '../assets/images/about_dark.png';
import logo from '../assets/images/logo.png';
import { IoLogInOutline } from 'react-icons/io5';
import LoadingIndicator from '../components/LoadingIndicator';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../Store/UserSlice';

const Login = () => {
  
    const[searchParams, setSearchParams] = useSearchParams(); 
    let pathname = searchParams.get("redirectTo")||null
    const message = searchParams.get("message")|| null;
   
  
    //Redux State
    const{loading, error} = useSelector((state)=>state.user)


    const dispatch = useDispatch()
    const navigate = useNavigate();

    const submit = async(e) => {
        e.preventDefault();
      
        let data = new FormData(e.target)
        let jsonData = Object.fromEntries(data);
        dispatch(loginUser(jsonData)).then(result=>{ 
            if(result.payload.status=='success'){
                if(result.payload.data.user.role == 'user' && !pathname ){
                    pathname = '/manage/investor/dashboard'
                }
                if(result.payload.data.user.role == 'admin' && !pathname ){
                    pathname ='/manage/admin/dashboard'
                }
               navigate(pathname)
            }
        })
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

                    <div className='px-4 py-6 md:p-10 bg-white dark:bg-slate-800 rounded-lg shadow-lg dark:text-white'>
                        {message && <h2 className="text-[#cc0000]">{message}</h2>}
                        <h3 className='font-bold text-2xl mb-1'>Login</h3>
                        <p className='text-sm font-medium leading-[1.6] mb-8'>Enter your login credentials to continue.</p>
                     
                        {error && <div className="mb-7 font-medium text-sm text-red-600">{error}</div>}
                        
                        <form className='' onSubmit={submit}>
                            <div className="mb-5 relative">
                                <input
                                    type="email" 
                                    name="email"  
                                    required placeholder="Email Address" 
                                    className='peer w-full py-3 px-5 rounded-md bg-slate-100 text-slate-900 transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0  focus:bg-white focus:shadow-lg'
                                />
                               
                                <label htmlFor="" className='text-xs block transition-all duration-300 peer-[&:not(:placeholder-shown)]:-translate-y-[75px] peer-[&:not(:placeholder-shown)]:opacity-100 peer-[&:not(:placeholder-shown)]:visible   -translate-y-10 opacity-0 invisible '>Email Address</label>
                            </div>
                    
                            <div className="mb-1 relative">
                                <input
                                    type="password" 
                                    name="password"  
                                    required placeholder="password" 
                                    className='mb-2 peer w-full relative py-3 px-5 rounded-md bg-slate-100 text-slate-900 transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0'
                                />
                                <label htmlFor="" className='text-xs block transition-all duration-300 peer-[&:not(:placeholder-shown)]:-translate-y-[75px] peer-[&:not(:placeholder-shown)]:opacity-100 peer-[&:not(:placeholder-shown)]:visible   -translate-y-10 opacity-0 invisible '>Password</label>
                            </div>

                            <div className='flex justify-between w-full '>

                                <div className="mb-3">
                                    <label className="flex items-center">
                                        <input type='checkbox'
                                            name="remember"
                                        />
                                        <span className="ml-2 text-sm text-slate-600 dark:text-slate-300">Remember me</span>
                                    </label>
                                </div>

                                <p className='inline-block text-sm text-right'>
                                    <Link to='/users/forgotPassword' className='inline-block ml-1 text-blue-600 dark:text-blue-400' >Forgot your password?</Link>
                                </p>
                            </div>

                            <div className='text-center'>
                                <button 
                                    disabled = {loading}
                                    className='w-full inline-flex items-center justify-center gap-2 items-bottom bg-primary hover:bg-green-700 rounded-md font-semibold px-2 py-3 transition-all duration-300 ease-in  text-white'>
                                    {loading ? <LoadingIndicator size={5} />  : <IoLogInOutline className="w-6 h-6"  /> }
                                    Login
                                </button>
                            </div>

                            <div className='mt-5 text-center'>
                                <p className='inline-block pl-4 text-sm'>
                                    Don't have Account?
                                    <Link to="/users/register" className='inline-block ml-1 text-blue-600 dark:text-blue-400' >Create Account</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </section>
            </div>

        </>
    )
}

export default Login