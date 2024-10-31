import {Link} from 'react-router-dom'
import {BiTransferAlt, BiWallet} from 'react-icons/bi';
import {FaUsers, FaUsersLine} from 'react-icons/fa6';
import {BsBank,BsCashCoin, BsQuestionCircle} from 'react-icons/bs';
import {ImPieChart} from 'react-icons/im';
import { useEffect, useRef, useState } from 'react';
import LoadingIndicator from '../../components/LoadingIndicator';
import moment from 'moment/moment';
import FunnelChaart from '../../components/Charts/FunnelChart';
import RadialBarCharts from '../../components/Charts/RadialBarChartsDummy';
import { HiPresentationChartBar } from 'react-icons/hi';
import axios from '../../lib/axios';

export default function Dashboard() {
    const [showTip, setShowTip] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [investments, setInvestments] = useState([]);
    const [fetched, setFetched] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [stats, setStats] = useState(false);
    // const reffVid = useRef();
    const reffid = useRef();
    const copyReffLink = () => {
        setShowTip(true);
        // document.
        reffid.current.select();
        navigator.clipboard.writeText( reffid.current.value)
        setTimeout(() => {
            setShowTip(false);
        }, 3000);
        console.log('copied link');
    }

    const fetchStats = async()=>{
        setProcessing(true)
        try{
            const res = await axios.get('api/v1/stats/admin');
            setStats(res.data.data.stats)
            setTransactions(res.data.data.latest_transactions)
            setInvestments(res.data.data.latest_investments)  
            setProcessing(false)
            setFetched(true);      
           
        }catch(error){
            console.log(error)
            setProcessing(false)
            setFetched(true); 
        }
    }

    useEffect(() => {
        fetchStats();
    }, [])
  
    return (
        <>

            <section>
                <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 bg-white dark:bg-slate-800 rounded-lg py-5 px-3 shadow md:px-4 h-full lg:col-span-1">
                        <FaUsers className={`md:h-10 md:w-10 h-8 w-8`} />
                        <aside className="md:space-y-1">
                            <p className={`text-sm`}>
                                No of Users
                            </p>
                            <h1 className={`font-black text-2xl mb-1`}>
                                {stats.users || 0}
                            </h1>
                            <div className='text-xs '>
                                <Link to='/manage/admin/users' className={`py-1 px-3 inline-block bg-teal-600 dark:bg-primary dark:text-white text-white rounded-md`}>
                                    Manage Users Account
                                </Link>
                            </div>
                        </aside>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 bg-white dark:bg-slate-800 rounded-lg py-5 px-3 shadow md:px-4 h-full lg:col-span-1">
                        <BiWallet className={`md:h-10 md:w-10 h-8 w-8`} />
                        <aside className="md:space-y-1">
                            <p className={`text-sm text-primary`}>
                                Total Balance
                            </p>
                            <h1 className={`font-black text-2xl mb-1`}>
                               ${stats && stats.total_balance.toLocaleString() || 0}
                            </h1>
                            <div className='text-xs'>
                                <Link to={`/manage/admin/transactions`}>
                                    Click to see transactions
                                </Link>
                            </div>
                        </aside>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 bg-white dark:bg-slate-800 rounded-lg py-5 px-3 shadow md:px-4 h-full lg:col-span-1">
                        <BsCashCoin className={`md:h-10 md:w-10 h-8 w-8`} />
                        <aside className="md:space-y-1">
                            <p className={`text-sm text-primary`}>
                                Total Profits
                            </p>
                            <h1 className={`font-black text-2xl mb-1`}>
                              ${stats &&  stats.total_profit.toLocaleString() || 0}
                            </h1>
                            <div className='text-xs'>
                                <Link to={`/manage/admin/transactions`}>
                                    See All Ttransactions
                                </Link>
                            </div>
                        </aside>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 bg-white dark:bg-slate-800 rounded-lg py-5 px-3 shadow md:px-4 h-full lg:col-span-1">
                        <FaUsersLine className={`md:h-10 md:w-10 h-8 w-8`} />
                        <aside className="md:space-y-1">
                            <p className={`text-sm text-primary`}>
                                Total Referral Bal.
                            </p>
                            <h1 className={`font-black text-2xl mb-1`}>
                                ${stats && stats.total_referral_balance.toLocaleString() || 0}
                            </h1>
                            <div className='text-xs'>
                                <Link href={``}>
                                    Current Balance
                                </Link>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            {/* Manage Buttuns */}
            <section className="my-4">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                    {/* Transaction History */}
                    <aside className="md:col-span-3">
                        {/* Transaction Table */}
                        <div className="bg-white dark:bg-slate-800 space-y-1 rounded-lg py-2 px-3 shadow md:px-4 min-h-[200px]">
                            <h2 className="py-2 border-b font-semibold flex justify-between items-center">
                                <span> <BiTransferAlt className="w-6 h-6 inline-block" /> Transaction History  </span>
                                <Link to='/manage/admin/transactions' className="text-blue-500 underline text-sm py-2 px-3 inline-block">View All</Link>
                            </h2>
                            <div className="overflow-x-auto">
                                <table className="w-full table border-collapse bg-white dark:bg-slate-700 rounded-md overflow-hidden shadow-md">
                                        <thead className="bg-primary dark:bg-primaryLight text-white text-left">
                                            <tr>
                                                <th className="py-1 px-3 whitespace-nowrap">User</th>
                                                <th className="py-1 px-3 whitespace-nowrap">Type</th>
                                                <th className="py-1 px-3 whitespace-nowrap">Amount</th>
                                                <th className="py-1 px-3 whitespace-nowrap">status </th>
                                                <th className="py-1 px-3 whitespace-nowrap">Date</th>
                                            </tr>
                                        </thead>

                                        <tbody className="max-h-[100px] md:max-h-[100px] overflow-y-auto text-sm">
                                        { (processing || !fetched) && (<tr>
                                                <td colSpan={5} className="shadow-md py-6 h-32 animate-pulse text-center">
                                                    <LoadingIndicator type='dots' size={10} />
                                                </td>
                                            </tr>)}
                                        
                                        { (transactions.length > 0 && !processing) && transactions.map((transaction) => (
                                            <tr key={transaction.id} className="odd:bg-red-50 dark:odd:bg-slate-800">
                                                <td className="px-2 py-2">{transaction.user?.name}</td>
                                                <td className="px-2 py-2">{transaction.type}</td>
                                                <td className="px-2 py-2">${transaction.amount.toLocaleString()}</td>
                                                <td className="px-2 py-2">
                                                    <span className={`${transaction.status == 'success' ? 'text-green-500 dark:text-teal-400' : (transaction.status == 'pending' ? 'text-orange-500 dark:text-orange-300' : '')}`}>
                                                        {transaction.status}
                                                    </span>
                                                </td>
                                                <td className="px-2 py-2">{ moment(transaction.createdAt).calendar() }</td>
                                            </tr>
                                        )) }
                                        </tbody>
                                    </table>
                            </div>
                        </div>
                        {/* Investment Table */}
                        <div className="bg-white mt-7 dark:bg-slate-800 space-y-1 rounded-lg py-2 px-3 shadow md:px-4 min-h-[200px]">
                            <h2 className="py-2 border-b font-semibold flex justify-between items-center">
                                <span> <BiTransferAlt className="w-6 h-6 inline-block" /> Investment History  </span>
                                <Link to='/manage/admin/investments' className="text-blue-500 underline text-sm py-2 px-3 inline-block">View All</Link>
                            </h2>
                            <div className="overflow-x-auto">
                                <table className="w-full table border-collapse bg-white dark:bg-slate-700 rounded-md overflow-hidden shadow-md">
                                    <thead className="bg-primary dark:bg-primaryLight text-white text-left">
                                        <tr>
                                            <th className="py-1 px-3 whitespace-nowrap">User</th>
                                            <th className="py-1 px-3 whitespace-nowrap">Plan</th>
                                            <th className="py-1 px-3 whitespace-nowrap">Amount Invested</th>
                                            <th className="py-1 px-3 whitespace-nowrap">Profit</th>
                                            <th className="py-1 px-3 whitespace-nowrap">Status</th>
                                        </tr>
                                    </thead>

                                    <tbody className="max-h-[100px] md:max-h-[100px] overflow-y-auto text-sm">
                                        { (processing || !fetched) && (<tr>
                                                <td colSpan={5} className="shadow-md py-6 h-32 animate-pulse text-center">
                                                    <LoadingIndicator type='dots' size={10} />
                                                </td>
                                            </tr>)}
                                        
                                        { (investments.length > 0 && !processing) && investments.map((investment) => (
                                            <tr key={investment.id} className="odd:bg-red-50 dark:odd:bg-slate-800">
                                                <td className="px-2 py-2">{investment.user?.name} </td>
                                                <td className="px-2 py-2">{investment?.plan?.name}</td>
                                                <td className="px-2 py-2">${investment.amount.toLocaleString()}</td>
                                                <td className="px-2 py-2">${parseFloat(investment?.profit.toLocaleString()).toFixed(2)}</td>
                                                <td className="px-2 py-2">
                                                    {(investment.status == 'active' || investment.status == 'completed') && (<span className="text-xs flex items-center gap-1">
                                                        <div className="h-3 w-3 rounded-full bg-green-400 inline-block"></div> {investment.status}
                                                    </span>)}
                                                    {(investment.status == 'denied') && (<span className="text-xs flex items-center gap-1">
                                                        <div className="h-3 w-3 rounded-full bg-red-400 inline-block"></div> {investment.status}
                                                    </span>)}
                                                </td>
                                            </tr>
                                        )) }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </aside>

                    {/* Action Cards */}
                    <aside className="grid grid-cols-2 gap-3 md:col-span-2 h-[280px]">
                        {/* Card */}
                        <Link to='/manage/admin/plans' className="flex flex-col sm:items-center gap-2 justify-center bg-white dark:bg-slate-800 space-y-1 rounded-lg py-4 px-3 shadow md:px-4 h-full lg:col-span-1">
                            <ImPieChart className={`md:h-10 md:w-10 h-6 w-6`} />
                            <aside>
                                <p className={`text-lg font-semibold`}>
                                    Manage Plans
                                </p>
                                <div className='text-xs italic'>
                                    Add, edit, or delete plan
                                </div>
                            </aside>
                        </Link>
                        {/* Card */}
                        <Link to='/manage/admin/payment_options' className="flex flex-col sm:items-center gap-2 justify-center bg-white dark:bg-slate-800 space-y-1 rounded-lg py-4 px-3 shadow md:px-4 h-full lg:col-span-1">
                            <BsBank className={`md:h-10 md:w-10 h-6 w-6`} />
                            <aside>
                                <p className={`text-lg font-semibold`}>
                                    Payment Options
                                </p>
                                <div className='text-xs italic'>
                                    Add or edit payment options
                                </div>
                            </aside>
                        </Link>
                        {/* Card */}
                        <Link to='/manage/admin/investments' className="flex flex-col sm:items-center gap-2 justify-center bg-white dark:bg-slate-800 space-y-1 rounded-lg py-4 px-3 shadow md:px-4 h-full lg:col-span-1">
                            <HiPresentationChartBar className={`md:h-10 md:w-10 h-6 w-6`} />
                            <aside>
                                <p className={`text-lg font-semibold`}>
                                    View Investments
                                </p>
                                <div className='text-xs italic'>
                                    Clients Investments
                                </div>
                            </aside>
                        </Link>
                        {/* Card */}
                        <Link to='/manage/admin/faq' className="flex flex-col sm:items-center gap-2 justify-center bg-white dark:bg-slate-800 space-y-1 rounded-lg py-4 px-3 shadow md:px-4 h-full lg:col-span-1">
                            <BsQuestionCircle className={`md:h-10 md:w-10 h-6 w-6`} />
                            <aside>
                                <p className={`text-lg font-semibold`}>
                                    Manage FAQ
                                </p>
                                <div className='text-xs italic'>
                                    Add and manage FAQs
                                </div>
                            </aside>
                        </Link>
                    </aside>
                </div>
            </section>

            <section className="my-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <aside className="bg-white dark:bg-slate-700 rounded-md shadow-md min-h-[300px] px-4 py-3 flex items-center justify-center">
                        <RadialBarCharts />
                    </aside>

                    <aside className="bg-white dark:bg-slate-700 rounded-md shadow-md min-h-[300px] px-4 py-3 flex items-center justify-center">
                        <FunnelChaart />
                    </aside>
                </div>
            </section>
            
        </>
    );
}
