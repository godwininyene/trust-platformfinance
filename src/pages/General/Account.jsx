import ToggleButton from '../../components/ToggleButton';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { HiOutlineLogout, HiPresentationChartBar } from 'react-icons/hi';
import {BiWallet, BiMoneyWithdraw} from 'react-icons/bi';
import {FaUsersLine} from 'react-icons/fa6';
import defaulAvatar from '../../assets/images/default.png';
import Modal from '../../components/CustomModal';
import UpdateProfileForm from './UpdateProfileForm';
import GuageCharts from '../../components/Charts/GuageCharts';
import { FaChartLine } from 'react-icons/fa';
import ChangePasswordForm from './ChangePasswordForm';
import LoadingIndicator from '../../components/LoadingIndicator';
import axios from '../../lib/axios';


export default function Account() {
    const user = JSON.parse(localStorage.getItem('user'));
    const [darkMode, setDarkMode] = useState(document.documentElement.classList.contains('dark'));
    const changeThemeMode = (darkmode) => {
        if (darkmode == true) {
            localStorage.setItem('theme', 'dark')
        } else {
            localStorage.removeItem('theme')
        }

        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
            setDarkMode(true);
        } else {
            document.documentElement.classList.remove('dark')
            setDarkMode(false);
        }
    }

  

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    const formatDate = inputDate =>{
        const date = new Date(inputDate);
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year  = date.getFullYear();

        day = day < 10 ?   '0' + day : day; 
        month = month < 10 ? '0' + month : month;

        let formattedDate = `${day}-${month}-${year}`
        return formattedDate;
    }
    const [profileModal, setProfileModal] =useState(false);
    const [changePasswordModal, setChangePasswordModal] =useState(false);


    const [investments, setInvestment] = useState();
    const [wallet, setWallet] = useState();
    const [fetched, setFetched] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [stats, setStats] = useState(false);

    
    // Fetch Dashboard Statistics
    let fetchStats = async () => {
        let url = user.role == 'admin'? 'api/v1/stats/admin': 'api/v1/stats/users';
        await axios.get(url)
        .then((res) => {
            if(user.role == 'user')  setWallet(res.data.data.stats.wallet)
            setStats(res.data.data.stats)
           
        }).catch(error => console.log(error))
    }

    let fetchInvestments = async () => {
        setProcessing(true)
        await axios.get('api/v1/users/me/investments')
        .then((res) => {
            setInvestment(res.data.data.investments);
            setFetched(true);
            setProcessing(false)
        })
    }


    useEffect(() => {
        fetchStats();
        fetchInvestments()
    }, [])
    return (
        <>

            <section className={`min-h-[70vh]`}>

                <div className="flex flex-col lg:flex-row gap-x-10 justify-center">

                    <div className="w-full lg:w-1/3">

                        <div className='rounded-2xl shadow-lg bg-white dark:bg-slate-700'>
                            <div className='text-center pt-4'>
                                
                                <img src={(user.photo && user.photo != 'default.png') ? user.photo : defaulAvatar} alt=" " className={` h-32 w-32 mx-auto rounded-full`} />
                                
                            </div>

                            <div className='p-5'>
                                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 text-center">My Profile</h2>

                                <div className="mt-5 flex border-b border-b-slate-200">
                                    <p className='font-semibold text-slate-500 mr-auto dark:text-gray-100'>Profile Name:</p>
                                    <p>{user.name}</p>

                                </div>

                                <div className="mt-5 flex border-b border-b-slate-200">
                                   <p className='font-semibold text-slate-500 mr-auto dark:text-gray-100'>Mobile Number:</p>
                                   <p>{user.phone}</p>
                                </div>

                                <div className="mt-5 flex border-b border-b-slate-200">
                                   <p className='font-semibold text-slate-500 mr-auto dark:text-gray-100'>Email Address:</p>
                                   <p>{user.email}</p>
                                </div>

                                <div className="mt-5 flex border-b border-b-slate-200">
                                   <p className='font-semibold text-slate-500 mr-auto dark:text-gray-100'>Nationality:</p>
                                   <p>{user.country}</p>
                                </div>

                                <div className="mt-5 flex border-b border-b-slate-200">
                                   <p className='font-semibold text-slate-500 mr-auto dark:text-gray-100'>Date Join:</p>
                                   <p>{formatDate(user.createdAt)}</p>
                                </div>

                                <div className="mt-5 flex justify-between">
                                    <button className='font-bold flex justify-center items-center gap-3 bg-primary  text-slate-100 rounded-full py-2 px-3 md:px-4 border' onClick={() => setProfileModal(true)}>Edit Profile</button>
                                  {user.role !=='admin'&&  <button className='font-bold flex justify-center items-center gap-3  bg-gradient-to-t from-teal-600 to-teal-500 d text-slate-100 rounded-full py-2 px-3 md:px-4 border' onClick={() => setChangePasswordModal(true)}>Change Password</button>}
                                </div>
                            </div>
                        </div>

                    </div>
                    
                    <div className='w-full lg:w-1/2 mt-7 lg:mt-0'>
                        <div className=' grid grid-cols-2 gap-4'>

                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 bg-white dark:bg-slate-800 space-y-1 rounded-lg py-2 px-3 shadow md:px-4 h-full lg:col-span-1">
                                <BiWallet className={`md:h-10 md:w-10 h-6 w-6`} />
                                <aside>
                                    <p className={`text-sm`}>
                                        Account Balance
                                    </p>
                                    {user.role == 'admin' && (
                                        <h1 className={`font-black text-2xl mb-1 text-teal-600 dark:text-[#1bffcb]`}>
                                          ${stats && stats.total_balance.toLocaleString() || 0}
                                        </h1>
                                    )}

                                    {user.role == 'user' && (
                                        <h1 className={`font-black text-2xl mb-1 text-teal-600 dark:text-[#1bffcb]`}>
                                            ${wallet?.balance.toLocaleString() || 0} 
                                        </h1>
                                    )}
                                    <div className='text-xs '>
                                        <Link href={``}>
                                            Current Balance Amount
                                        </Link>
                                    </div>
                                </aside>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 bg-white dark:bg-slate-800 space-y-1 rounded-lg py-2 px-3 shadow md:px-4 h-full lg:col-span-1">
                                <FaUsersLine className={`md:h-10 md:w-10 h-6 w-6`} />
                                <aside>
                                    <p className={`text-sm text-primary`}>
                                        Referral Balance
                                    </p>
                                    {
                                        user.role =='admin'&&(
                                        <h1 className={`font-black text-2xl mb-1  dark:text-[#1bffcb]`}>
                                            ${stats && stats.total_referral_balance.toLocaleString() || 0}
                                        </h1>
                                        )
                                    }

                                    {
                                        user.role == 'user' &&(
                                                <h1 className={`font-black text-2xl mb-1  dark:text-[#1bffcb]`}>
                                                 ${wallet?.referralBalance.toLocaleString() || 0}
                                            </h1>
                                        )
                                    }
                                    <div className='text-xs '>
                                        <Link href={``}>
                                            Current Balance Amount
                                        </Link>
                                    </div>
                                </aside>
                            </div>

                           
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 bg-white dark:bg-slate-800 space-y-1 rounded-lg py-2 px-3 shadow md:px-4 h-full lg:col-span-1">
                                <FaUsersLine className={`md:h-10 md:w-10 h-6 w-6`} />
                                
                                <aside>
                                    <p className={`text-sm text-primary`}>
                                        Total Referrals
                                    </p>
                                      
                                        <h1 className={`font-black text-2xl mb-1  dark:text-[#1bffcb]`}>
                                            ${stats && stats.total_referrals || 0}
                                        </h1>
                                           
                                    <div className='text-xs '>
                                        <Link href={``}>
                                            Current referrals
                                        </Link>
                                    </div>
                                </aside>
                            </div>

                                
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 bg-white dark:bg-slate-800 space-y-1 rounded-lg py-2 px-3 shadow md:px-4 h-full lg:col-span-1">
                                <BiMoneyWithdraw className={`md:h-10 md:w-10 h-6 w-6`} />
                                
                                <aside>
                                    <p className={`text-sm text-primary`}>
                                        Total Withdrawal
                                    </p>
                                    <h1 className={`font-black text-2xl mb-1  dark:text-[#1bffcb]`}>
                                        ${stats && stats.total_withdrawal.toLocaleString() || 0}
                                    </h1>
                                    <div className='text-xs '>
                                        <Link href={``}>
                                            Current Balance Amount
                                        </Link>
                                    </div>
                                </aside>
                            </div>
                          
                            
                        </div>

                    {user && user.role !== 'admin' && (
                        <aside className="bg-white dark:bg-slate-700 mt-5 rounded-md shadow-md min-h-[280px] px-4 py-3">
                         <h2 className="font-bold">
                             <HiPresentationChartBar className="h-7 w-7 inline-block" /> Active Investment Status
                         </h2>
                        
                         {(processing && !fetched) ? <>
                             <div>
                                 <LoadingIndicator type='dots' size={7}  />
                                
                             </div>
                         </> : <>
                             {(investments && investments != null) ? <GuageCharts /> :
                             
                             <div className='py-20 text-center text-sm'>
                                 <p className="mb-4">No Active Investment found</p>
                                 <Link to='/manage/investor/investments' className={`border-primary text-primary dark:border-primaryLight dark:text-primaryLight border inline-flex gap-3 px-4 py-2 rounded-3xl text-sm`}>
                                     <FaChartLine className={`h-5 w-5`} /> Invest Now
                                 </Link>
                                
                             </div>
                             }
                         </>}
                         <div>

                         </div>
                     </aside>
                    )}
                        {/* <aside className="bg-white dark:bg-slate-700 mt-5 rounded-md shadow-md min-h-[280px] px-4 py-3">
                            <h2 className="font-bold">
                                <HiPresentationChartBar className="h-7 w-7 inline-block" /> Active Investment Status
                            </h2>
                           
                            {(processing && !fetched) ? <>
                                <div>
                                    <LoadingIndicator type='dots' size={7}  />
                                   
                                </div>
                            </> : <>
                                {(investments && investments != null) ? <GuageCharts /> :
                                
                                <div className='py-20 text-center text-sm'>
                                    <p className="mb-4">No Active Investment found</p>
                                    <Link to='/manage/investor/investments' className={`border-primary text-primary dark:border-primaryLight dark:text-primaryLight border inline-flex gap-3 px-4 py-2 rounded-3xl text-sm`}>
                                        <FaChartLine className={`h-5 w-5`} /> Invest Now
                                    </Link>
                                   
                                </div>
                                }
                            </>}
                            <div>

                            </div>
                        </aside> */}
                    </div>
                </div>
            </section>
            

            <Modal show={profileModal} maxWidth="md" onClose={() => setProfileModal(false)} backDrop={false}>
                <UpdateProfileForm  user={user}/>
            </Modal>

            <Modal show={changePasswordModal} maxWidth="md" onClose={() => setChangePasswordModal(false)} backDrop={false}>
                <ChangePasswordForm user={user}/>
            </Modal>
                

            <div className="py-2">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <section className={`md:hidden`}>
                        <div className="my-2">
                            <ToggleButton initialState={darkMode} text="Dark Mode" onToggle={(state) => changeThemeMode(state)} />
                        </div>
                        <Link method="post" to='logout' as="button" className={`font-bold flex justify-center items-center gap-3 bg-primary dark:bg-transparent text-slate-100 rounded-full w-full py-2 px-3 md:px-4 border dark:text-slate-300 `}>
                            <HiOutlineLogout className={`h-6 w-6`} /> <span className={`text-xs md:text-base`}> Logout </span>
                        </Link>
                    </section>
                </div>
            </div>
        </>
    );
}
