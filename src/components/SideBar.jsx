import React, { useEffect, useState } from 'react';
import logo from '../assets/images/logo.png';
import {RxDashboard} from 'react-icons/rx'
import {FaChartLine} from 'react-icons/fa'
import {FaMoneyBillTransfer, FaUsers} from 'react-icons/fa6'
import {MdManageAccounts} from 'react-icons/md'
import {HiOutlineLogout} from 'react-icons/hi'
import ToggleButton from './ToggleButton';
import {NavLink, useLocation, useNavigate } from 'react-router-dom';
import LoadingIndicator from './LoadingIndicator';
import { logout } from '../utils/logout';
const SideBar = ({user}) => {
  
    const [darkMode, setDarkMode] = useState(document.documentElement.classList.contains('dark'));
    const [routing, setRouting] = useState(false);
    const [nextRoute, setNextRoute] = useState('');
    const [processing, setProcessing] = useState(false);
    const navigate = useNavigate()
    useEffect(() => {
        if (document.documentElement.classList.contains('dark')) {
            setDarkMode(true);
        } else {
            setDarkMode(false);
        }
        
    }, [])
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
    const location = useLocation(); // Hook to get the current location
    const splitedPath = location.pathname.split('/');
    const currentPath = splitedPath.slice(2).join('/');
    useEffect(() => {
        // Stop loading if the current location matches the target route
        if (currentPath === nextRoute) {
          setRouting(false);
        }
    }, [location.pathname, nextRoute]);
   
    const setRoutingMode = (route) => {
        setNextRoute(route);
        setRouting(true);
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
        <div className={`md:py-2 md:px-4 flex flex-col h-full`}>
            {/* Brand Name goes here*/}
            <section className={`bg-slate-700 dark:bg-slate-900 p-3 mt-1 rounded-md shadow-md hidden md:block`}>
                <img src={logo} alt=""className='' />
            </section>

            <hr className="my-5 hidden md:block" />

            {/* Navigations */}
            <section className={`flex-grow relative z-50 max-w-full`}>
                <ul className={`flex md:flex-col justify-between md:justify-start md:gap-3`}>
                    { user?.role === 'admin' ? <>
                        <li className='flex-grow'>
                            <NavLink
                                to="admin/dashboard"
                                onClick={() => setRoutingMode('admin/dashboard')}
                                className={({ isActive }) =>
                                    `font-bold md:gap-2 rounded-md flex flex-col md:flex-row items-center py-3 px-3 md:px-4 
                                    ${isActive ? 'text-primary dark:text-primaryLight shadow border-primary border-t-2 md:border-t-0 md:border-r-2 dark:bg-primaryLight dark:bg-opacity-10' : 'text-slate-800 dark:text-slate-300'}`
                                }
                                >
                                {routing && nextRoute === 'admin/dashboard' ? (
                                    <LoadingIndicator type="dots" size={5} />
                                ) : (
                                    <RxDashboard className="h-5 w-5" />
                                )}
                                <span className="text-xs md:text-sm">Dashboard</span>
                            </NavLink>

                        </li>
                        
                        <li className="flex-grow">
                            <NavLink
                                to='admin/users' onClick={() => setRoutingMode('admin/users')}
                                className={({ isActive }) =>
                                    `font-bold md:gap-2 rounded-md flex flex-col md:flex-row items-center py-3 px-3 md:px-4 
                                    ${isActive ? 'text-primary dark:text-primaryLight shadow border-primary border-t-2 md:border-t-0 md:border-r-2 dark:bg-primaryLight dark:bg-opacity-10' : 'text-slate-800 dark:text-slate-300'}`
                                }
                            >
                                { (routing && nextRoute == "admin/users") ? <LoadingIndicator type={`dots`} size={5} /> : <FaUsers className={`h-5 w-5`} /> }
                                    <span className={`text-xs md:text-sm`}> <span className="hidden md:inline">Manage</span> Accounts </span>
                            </NavLink>
                        </li>
                        <li className="flex-grow">
                            <NavLink
                                to='admin/transactions' 
                                onClick={() => setRoutingMode('admin/transactions')} 
                                className={({ isActive }) =>
                                    `font-bold md:gap-2 rounded-md flex flex-col md:flex-row items-center py-3 px-3 md:px-4 
                                    ${isActive ? 'text-primary dark:text-primaryLight shadow border-primary border-t-2 md:border-t-0 md:border-r-2 dark:bg-primaryLight dark:bg-opacity-10' : 'text-slate-800 dark:text-slate-300'}`
                                }
                            >
                                { (routing && nextRoute == "admin/transactions") ? <LoadingIndicator type={`dots`} size={5} /> : <FaMoneyBillTransfer className={`h-5 w-5 dark:text-slate-400`} /> }
                                    <span className={`text-xs md:text-sm`}> Transactions </span>
                            </NavLink>
                        </li>
                        <li className="flex-grow">
                            <NavLink
                                to='admin/investments' 
                                onClick={() => setRoutingMode('admin/investments')} 
                                className={({ isActive }) =>
                                    `font-bold md:gap-2 rounded-md flex flex-col md:flex-row items-center py-3 px-3 md:px-4 
                                    ${isActive ? 'text-primary dark:text-primaryLight shadow border-primary border-t-2 md:border-t-0 md:border-r-2 dark:bg-primaryLight dark:bg-opacity-10' : 'text-slate-800 dark:text-slate-300'}`
                                }
                            >
                                { (routing && nextRoute == "admin/investments") ? <LoadingIndicator type={`dots`} size={5} /> : <FaChartLine className={`h-5 w-5 dark:text-slate-400`} /> }
                                    <span className={`text-xs md:text-sm`}> Investments </span>
                            </NavLink>
                        </li>
                        <li className="flex-grow">
                            <NavLink 
                                to='admin/profile' 
                                onClick={() => setRoutingMode('admin/profile')}
                                className={({ isActive }) =>
                                    `font-bold md:gap-2 rounded-md flex flex-col md:flex-row items-center py-3 px-3 md:px-4 
                                    ${isActive ? 'text-primary dark:text-primaryLight shadow border-primary border-t-2 md:border-t-0 md:border-r-2 dark:bg-primaryLight dark:bg-opacity-10' : 'text-slate-800 dark:text-slate-300'}`
                                } 
                               
                            >
                                { (routing && nextRoute == "admin/profile") ? <LoadingIndicator type={`dots`} size={5} /> : <MdManageAccounts className={`h-5 w-5`} /> }
                                <span className={`text-xs md:text-sm`}> Account </span>
                            </NavLink>
                        </li>
                    </> : <>
                        <li className="flex-grow">
                            <NavLink
                                to="investor/dashboard"
                                onClick={() => setRoutingMode('investor/dashboard')}
                                className={({ isActive }) =>
                                    `font-bold md:gap-2 rounded-md flex flex-col md:flex-row items-center py-3 px-3 md:px-4 
                                    ${isActive ? 'text-primary dark:text-primaryLight shadow border-primary border-t-2 md:border-t-0 md:border-r-2 dark:bg-primaryLight dark:bg-opacity-10' : 'text-slate-800 dark:text-slate-300'}`
                                }
                                >
                                {routing && nextRoute === 'investor/dashboard' ? (
                                    <LoadingIndicator type="dots" size={5} />
                                ) : (
                                    <RxDashboard className="h-5 w-5" />
                                )}
                                <span className="text-xs md:text-sm">Dashboard</span>
                            </NavLink>
                        </li>
                        <li className="flex-grow">
                            <NavLink
                                to='investor/investments' onClick={() => setRoutingMode('investor/investments')}
                                className={({ isActive }) =>
                                    `font-bold md:gap-2 rounded-md flex flex-col md:flex-row items-center py-3 px-3 md:px-4 
                                    ${isActive ? 'text-primary dark:text-primaryLight shadow border-primary border-t-2 md:border-t-0 md:border-r-2 dark:bg-primaryLight dark:bg-opacity-10' : 'text-slate-800 dark:text-slate-300'}`
                                }
                            >
                                { (routing && nextRoute == "investor/investments") ? <LoadingIndicator type={`dots`} size={5} /> : <FaChartLine className={`h-5 w-5`} /> }
                                    <span className={`text-xs md:text-sm`}> Investments </span>
                            </NavLink>
                        </li>
                        <li className="flex-grow">
                            <NavLink
                                to='investor/transactions' onClick={() => setRoutingMode('investor/transactions')}
                                className={({ isActive }) =>
                                    `font-bold md:gap-2 rounded-md flex flex-col md:flex-row items-center py-3 px-3 md:px-4 
                                    ${isActive ? 'text-primary dark:text-primaryLight shadow border-primary border-t-2 md:border-t-0 md:border-r-2 dark:bg-primaryLight dark:bg-opacity-10' : 'text-slate-800 dark:text-slate-300'}`
                                }
                            >
                                { (routing && nextRoute == "investor/transactions") ? <LoadingIndicator type={`dots`} size={5} /> : <FaMoneyBillTransfer className={`h-5 w-5`} /> }
                                    <span className={`text-xs md:text-sm`}> Transactions </span>
                            </NavLink>
                        </li>
                        <li className="flex-grow">
                            <NavLink
                               to='investor/profile' onClick={() => setRoutingMode('investor/profile')}
                                className={({ isActive }) =>
                                    `font-bold md:gap-2 rounded-md flex flex-col md:flex-row items-center py-3 px-3 md:px-4 
                                    ${isActive ? 'text-primary dark:text-primaryLight shadow border-primary border-t-2 md:border-t-0 md:border-r-2 dark:bg-primaryLight dark:bg-opacity-10' : 'text-slate-800 dark:text-slate-300'}`
                                }
                            >
                                { (routing && nextRoute == "investor/profile") ? <LoadingIndicator type={`dots`} size={5} /> : <MdManageAccounts className={`h-5 w-5`} /> }
                                    <span className={`text-xs md:text-sm`}> Account </span>
                            </NavLink>
                       
                        </li>
                    </>}
                </ul>
            </section>
            <section className={`hidden md:block`}>
                <div className="my-2 text-center">
                    <ToggleButton initialState={darkMode} text="Dark Mode" onToggle={(state) => changeThemeMode(state)} />
                </div>
                <button onClick={handleLogout} className={`btn-primary py-2 px-3 md:px-4 w-full flex flex-col md:flex-row items-center justify-center`}>
                    {processing ? <LoadingIndicator size={5} />  : <><HiOutlineLogout className={`h-6 w-6`} /> <span className={`text-xs md:text-sm`}> Logout </span> </> }
                   
                </button>
            </section>
        </div>
    )
}

export default SideBar