import React, { useEffect, useState } from 'react';
import ExtraLayout from '../../layouts/ExtraLayout';
import { Link, useNavigate } from 'react-router-dom';
import InputError from '../../components/InputError';
import { FaUserPlus } from 'react-icons/fa6';
import LoadingIndicator from '../../components/LoadingIndicator';
import axios from '../../lib/axios';
import { logout } from '../../utils/logout';

const CompleteRegistration = () => {
    const [countries, loadCountries] = useState([]);
    const [processing, setProcessing] = useState(false);
    const navigate = useNavigate()
    useEffect(() => {
        fetchCountries();
    },[])
    
    const [ data, setData] = useState({
        phone: '',
        country: '',
        gender: '',
        address: '',
    });

    const [errors, setErrors] = useState({
        phone: '',
        country: '',
        gender: '',
        address: '',
    })

    const fetchCountries = async () => {
        const res = await axios.get('api/v1/countries');
        loadCountries(res.data.data.countries)
    }


    const submit = async(e) => {
        e.preventDefault();
        setProcessing(true)
    
        try {
            const response =  await axios.patch('api/v1/users/complete_profile', data);
            if(response.data.status == 'success'){
                localStorage.setItem("user" , JSON.stringify(response.data.data.user));
                navigate('/pending_verification')
            }
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
  
   

    const handleLogout = async()=>{
        setProcessing(true);
       try{
            const res = await logout(navigate);
            setProcessing(false)
       }catch(err){
        setProcessing(false)
       }
    }

    return (
        <ExtraLayout>
           
            <section className="w-full max-w-3xl mx-auto">
                <div className='px-4 py-6 md:p-10 w-full bg-white dark:bg-slate-800 rounded-lg shadow-lg dark:text-white'>
                    <h3 className='font-bold text-2xl mb-1'>Update Profile</h3>
                    <p className='text-sm font-medium leading-[1.6] mb-10'>Kindly complete your registration by updating some of your profile information below;</p>
                    <form className="" method='post' onSubmit={submit}>
                        <aside className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="mb-5 relative">
                                <input
                                    type="tel" 
                                    id="tel_number"
                                    name="phone"  
                                    defaultValue={data.phone}
                                    autoFocus={true}
                                    required 
                                    placeholder="Eg. +1 (478) 236 2056" 
                                    onChange={handleChange}
                                    className='peer w-full py-3 px-5 rounded-md  bg-slate-100 dark:text-slate-700  transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0 focus:bg-white focus:shadow-lg'
                                />
                                <label htmlFor="" className='mb-2 text-xs block transition-all duration-300 peer-[&:not(:placeholder-shown)]:-translate-y-[75px] peer-[&:not(:placeholder-shown)]:opacity-100 peer-[&:not(:placeholder-shown)]:visible  -translate-y-10 opacity-0 invisible '>Phone Number</label>
                                <InputError message={errors.phone} className="mt-2 absolute bottom-0" />
                            </div>

                                <div className="mb-5 relative">
                                    <select
                                        name="country"  
                                        defaultValue={data.country}
                                        required 
                                        onChange={handleChange}
                                        className='mb-2 peer w-full py-3 px-5 rounded-md bg-slate-100 dark:text-slate-700  transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0  focus:bg-white focus:shadow-lg'
                                    >
                                        <option defaultValue={``} disabled>Select Country</option>
                                        {countries.length > 0 && countries.map(country => (
                                            <option value={country.name} key={country._id}> { country.name }</option>
                                        ))}
                                    </select>
                                    <label htmlFor="" className='text-xs block transition-all duration-300 peer-[&:not(:placeholder-shown)]:-translate-y-[75px] peer-[&:not(:placeholder-shown)]:opacity-100 peer-[&:not(:placeholder-shown)]:visible   -translate-y-10 opacity-0 invisible '>Residence Country</label>
                                    <InputError message={errors.email} className="mt-2 absolute bottom-0" />
                                </div>
                        
                                <div className="mb-5 relative">
                                    <select
                                        required
                                        name="gender"  
                                        defaultValue={data.gender} 
                                        onChange={handleChange}
                                        className='mb-2 peer w-full py-3 px-5 rounded-md  bg-slate-100 dark:text-slate-700  transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0'
                                    >
                                        <option>Select Gender (Optional)</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                    <label htmlFor="" className='text-xs block transition-all duration-300 peer-[&:not(:placeholder-shown)]:-translate-y-[75px] peer-[&:not(:placeholder-shown)]:opacity-100 peer-[&:not(:placeholder-shown)]:visible   -translate-y-10 opacity-0 invisible '>Gender <small>(Optional)</small></label>
                                    <InputError message={errors.gender} className="mt-2 absolute bottom-0" />
                                </div>

                                <div className="mb-5 relative">
                                    <input
                                        type="address" 
                                        name="address"  
                                        defaultValue={data.address}
                                        placeholder="Enter address (optional)" 
                                        onChange={handleChange}
                                        className='mb-2 peer w-full py-3 px-5 rounded-md  bg-slate-100 dark:text-slate-700  transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0 focus:bg-white focus:shadow-lg'
                                    />
                                    <label htmlFor="" className='text-xs block transition-all duration-300 peer-[&:not(:placeholder-shown)]:-translate-y-[75px] peer-[&:not(:placeholder-shown)]:opacity-100 peer-[&:not(:placeholder-shown)]:visible -translate-y-10 opacity-0 invisible '>Residence Address</label>
                                    <InputError message={errors.address} className="mt-2 absolute bottom-0" />
                                </div>

                                <div className='text-center'>
                                    <button disabled={processing} className='w-full inline-flex gap-2 justify-center items-center bg-primary hover:bg-green-700 rounded-md font-semibold px-2 py-3 transition-all duration-300 ease-in  text-white'>
                                        {processing ? <LoadingIndicator size={5} />  : <FaUserPlus className="w-6 h-6"  /> }
                                        Save My Details
                                    </button>
                                </div>

                                <div className='mt-5 text-center'>
                                    <p className='inline-block pl-4 text-sm'>
                                        You are currently signed in!
                                        <button onClick={handleLogout}  className='inline-block ml-1 text-blue-600'>Click here to logout.</button>
                                    </p>
                                </div>
                        </aside>
                    </form>
                </div>
            </section>
        </ExtraLayout>
    )
}

export default CompleteRegistration