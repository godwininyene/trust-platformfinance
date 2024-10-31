import { useEffect, useState } from 'react';
import phoneMock from '../assets/images/about_dark.png';
import logo from '../assets/images/logo.png';
import Checkbox from '../components/Checkbox';
import { Link } from 'react-router-dom';
import InputError from '../components/InputError';
import { FaUserPlus } from 'react-icons/fa6';
import LoadingIndicator from '../components/LoadingIndicator';
import { useNavigate } from 'react-router-dom';
import axios from '../lib/axios';

export default function Register() {
    const navigate = useNavigate()
    const [refid, setRefid] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState({
        name:'',
        email:'',
        password:'',
        passwordConfirm:'',
    })
   
   const [data, setData] = useState({
        name:'',
        email:'',
        referralId:'',
        password:'',
        passwordConfirm:'',
        terms:''
   })

    useEffect(() => {
      
        // return () => {
        //     reset('password', 'password_confirmation');
        // };
    }, []);

    useEffect(() => {
        const searchParams = new URLSearchParams(document.location.search)
        if(searchParams.get('refid') !== undefined && searchParams.get('refid') !== null) {
            setRefid(searchParams.get('refid'))
            localStorage.setItem('refid', searchParams.get('refid'));
        }else if(localStorage.getItem('refid') !== undefined && localStorage.getItem('refid') !== null && localStorage.getItem('refid') !== "") {
            setRefid(localStorage.getItem('refid'));
        };
        console.log(searchParams.get('refid'), refid);
    }, []);

    const submit = async(e) => {
        e.preventDefault();
        setProcessing(true)
        data.referralId = refid; 
        try {
            const response = await axios.post('api/v1/users/signup', data);
            if(response.data.status == 'success') navigate('/complete_registration')
            setProcessing(false)
        } catch (err) {
            setProcessing(false)
        
            if (err && !err.response) {
              alert(err);
            } else { 
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

   const handleChange = (e) =>{
       setData(prev =>{
            return{
                ...prev,
                [e.target.name]:e.target.value
            }
       })
       
   }


    return (
        <>
        
            <div className="bg-primary hidden md:block bg-cover bg-right-bottom">
                <div className={`h-full bg-gradient-to-b from-[#000000ec] via-[#000000b9] to-[#000000b9] bg-opacity-95 text-primary`}>
                    
                <div className='h-full'>
                    <img src={phoneMock} alt="mock" className={`w-[100%] -ml-14 -mt-14`} />
                </div>
            </div>
            </div>

            <div className="relative min-h-full px-4 py-10 flex items-center justify-center dark:bg-slate-950 bg-slate-100">
                <section className={`w-full max-w-md mx-auto`}>

                   <div className='text-center'>
                        <Link to='/'>
                            <img src={logo} alt="" className={`h-16 mb-4 inline-block`} />
                        </Link>
                   </div>

                    <div className='p-10 bg-white dark:bg-slate-800 rounded-lg shadow-lg dark:text-white'>
                        <h3 className='font-bold text-2xl mb-1'>Create your account</h3>
                        <p className='text-sm font-medium leading-[1.6] mb-10'>Enter your personal details to create account</p>
                        <form className='' method='post' onSubmit={submit}>
                        <div className="mb-5 relative">
                            <input
                                type="text" 
                                name="name"  
                                defaultValue={data.name}
                                autoFocus={true}
                                required 
                                placeholder="Fullname" 
                                onChange={handleChange}
                                className='peer w-full py-3 px-5 rounded-md  bg-slate-100 dark:text-slate-700  transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0 focus:bg-white focus:shadow-lg'
                            />
                            <label htmlFor="" className='mb-2 text-xs block transition-all duration-300 peer-[&:not(:placeholder-shown)]:-translate-y-[75px] peer-[&:not(:placeholder-shown)]:opacity-100 peer-[&:not(:placeholder-shown)]:visible  -translate-y-10 opacity-0 invisible '>Fullname</label>
                            <InputError message={errors.name} className="mt-2 absolute bottom-0" />
                        </div>

                            <div className="mb-5 relative">
                                <input
                                    type="email" 
                                    name="email"  
                                    defaultValue={data.email}
                                    required placeholder="Email Address" 
                                    onChange={handleChange}
                                    className='mb-2 peer w-full py-3 px-5 rounded-md bg-slate-100 dark:text-slate-700  transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0  focus:bg-white focus:shadow-lg'
                                />
                                <label htmlFor="" className='text-xs block transition-all duration-300 peer-[&:not(:placeholder-shown)]:-translate-y-[75px] peer-[&:not(:placeholder-shown)]:opacity-100 peer-[&:not(:placeholder-shown)]:visible   -translate-y-10 opacity-0 invisible '>Email Address</label>
                                <InputError message={errors.email} className="mt-2 absolute bottom-0" />
                            </div>
                    
                            <div className="mb-5 relative">
                                <input
                                    type="password" 
                                    name="password"  
                                    defaultValue={data.password}
                                    required placeholder="password" 
                                    onChange={handleChange}
                                    className='mb-2 peer w-full py-3 px-5 rounded-md  bg-slate-100 dark:text-slate-700  transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0'
                                />
                                <label htmlFor="" className='text-xs block transition-all duration-300 peer-[&:not(:placeholder-shown)]:-translate-y-[75px] peer-[&:not(:placeholder-shown)]:opacity-100 peer-[&:not(:placeholder-shown)]:visible   -translate-y-10 opacity-0 invisible '>Password</label>
                                <InputError message={errors.password} className="mt-2 absolute bottom-0" />
                            </div>

                            <div className="mb-5 relative">
                                <input
                                    type="password" 
                                    name="passwordConfirm"  
                                    defaultValue={data.passwordConfirm}
                                    required placeholder="confirm password" 
                                    onChange={handleChange}
                                    className='mb-2 peer w-full py-3 px-5 rounded-md  bg-slate-100 dark:text-slate-700  transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0 focus:bg-white focus:shadow-lg'
                                />
                                <label htmlFor="" className='text-xs block transition-all duration-300 peer-[&:not(:placeholder-shown)]:-translate-y-[75px] peer-[&:not(:placeholder-shown)]:opacity-100 peer-[&:not(:placeholder-shown)]:visible -translate-y-10 opacity-0 invisible '>Confirm Password</label>
                                <InputError message={errors.passwordConfirm} className="mt-2 absolute bottom-0" />
                            </div>

                            <div className='mb-5'>
                                <Checkbox name="terms" id="terms" type="checkbox" className='' required 
                                 onChange={handleChange}
                                />
                                <label htmlFor="terms" className='inline-block pl-4 text-sm'>
                                    Agree with
                                    <Link href="#" className='inline-block ml-1 text-blue-600' >Privacy Policy</Link>
                                </label>
                            </div>

                            <div className='text-center'>
                                <button disabled={processing} className='w-full inline-flex gap-2 justify-center items-center bg-primary hover:bg-green-700 rounded-md font-semibold px-2 py-3 transition-all duration-300 ease-in  text-white'>
                                    {processing ? <LoadingIndicator size={5} />  : <FaUserPlus className="w-6 h-6"  /> }
                                    Create Account
                                </button>
                            </div>

                            <div className='mt-5 text-center'>
                                
                                <p className='inline-block pl-4 text-sm'>
                                    Already have Account?
                                    <Link to="/users/login" className='inline-block ml-1 text-blue-600' >Click here to login</Link>
                                </p>
                            </div>
                            

                        </form>
                    </div>
                </section>
            </div>
        </>
    );
}
