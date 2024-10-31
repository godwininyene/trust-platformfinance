import { Link } from 'react-router-dom';
import {RxDashboard} from 'react-icons/rx';
import {BiWallet, BiMoneyWithdraw, BiCopy} from 'react-icons/bi';
import {FaMoneyBillTransfer, FaUsersLine} from 'react-icons/fa6';
import {BsCashCoin} from 'react-icons/bs';
import defaulAvatar from '../../assets/images/default.png'
import { FaChartLine } from 'react-icons/fa';
import { useRef, useState, useEffect } from 'react';
import { MdVerified } from 'react-icons/md';
import FunnelChaart from '../../components/Charts/FunnelChart';
import GuageCharts from '../../components/Charts/GuageCharts';
import { HiPresentationChartBar } from 'react-icons/hi';
import LoadingIndicator from '../../components/LoadingIndicator';
import axios from '../../lib/axios';
import moment from 'moment/moment';

export default function Dashboard() {
    const user = JSON.parse(localStorage.getItem('user'));
    const [showTip, setShowTip] = useState(false);
    const [deposits, setDeposits] = useState();
    const [investments, setInvestments] = useState([]);
    const [wallet, setWallet] = useState(null)
    const [fetched, setFetched] = useState(false);
    const [processing, setProcessing] = useState(false);
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

   
    
    // Fetch Dashboard Statistics
    let fetchStats = async () => {
        setProcessing(true)
        await axios.get('api/v1/stats/users')
        .then((res) => {
            setInvestments(res.data.data.stats.investments)
            setDeposits(res.data.data.stats.total_deposit);
            setWallet(res.data.data.stats.wallet)
            setProcessing(false)
            setFetched(true);
        }).catch((err)=>{
            setProcessing(false)
            setFetched(true);
        })
    }

    useEffect(()=>{
        async function doMining() {
            await axios.patch('api/v1/investments/mine')
            await axios.get('api/v1/users/me').then(res => console.log(res.data))
        }
      
        fetchStats();
        doMining()
    }, [])

    return (
        <>

            <section>
                <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                    <div className="bg-white dark:bg-slate-800 rounded-lg py-2 px-3 shadow md:px-4 col-span-2 lg:col-span-2 lg:row-span-2">
                        <section className={`flex flex-col items-center md:flex-row gap-2 md:gap-4 md:items-start h-full py-3`}>
                            <aside className={`h-16 md:h-24 w-16 md:w-24 rounded-full shadow relative`}>
                                <img src={(user.photo && user.photo != 'default.png') ? user.photo : defaulAvatar} alt="" className={`h-16 md:h-24 w-16 md:w-24 rounded-full overflow-hidden`} />
                                
                            </aside>
                            <aside className='md:mt-4 text-center md:text-left flex-grow w-full md:max-w-[300px]'>
                                <h1 className="text-xl md:text-3xl font-black">
                                    { user.name } 
                                </h1>
                                <p className="mb-2 text-blue-600 dark:text-blue-400">
                                { user.email } 
                                </p>
                                <div className="mb-4">
                                    <label htmlFor="refid" className="block text-sm text-left">Referral Link</label>
                                    <div className="flex h-8 w-full border rounded-md">
                                        <input type="text" ref={reffid} readOnly value={`${import.meta.env.VITE_APP_URL}/users/register?refid= ${user.accountId}`} className="flex-grow dark:text-slate-700 rounded-l-sm border-none outline-none ring-0 text-sm" /> 
                                        <button onClick={() => copyReffLink()} className="p-2 flex justify-center items-center bg-slate-200 relative">
                                            <div className={`absolute -top-9 ${!showTip && 'hidden'} text-sm right-0 py-1 px-3 rounded-t-lg rounded-bl-lg bg-blue-100`}>
                                                Copied
                                            </div>
                                            <BiCopy className="h-6 w-6 dark:text-slate-700" />
                                        </button>
                                    </div>
                                </div>
                                <div className={`flex gap-3 justify-center`}>
                                    <Link to='/manage/investor/investments' className={`border-teal-700 text-teal-700 dark:border-[#1bffcb] dark:text-[#1bffcb] border inline-flex gap-3 px-4 py-2 rounded-3xl text-sm`}>
                                        <FaChartLine className={`h-5 w-5`} /> Investments
                                    </Link>
                                    <Link to='/manage/investor/transactions' className={`bg-primary text-white dark:bg-primaryLight inline-flex gap-3 px-4 py-2 rounded-3xl text-sm`}>
                                        <FaMoneyBillTransfer className={`h-5 w-5`} /> Transactions
                                    </Link>
                                </div>
                            </aside>
                        </section>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 bg-white dark:bg-slate-800 space-y-1 rounded-lg py-2 px-3 shadow md:px-4 h-full lg:col-span-1">
                        <BiWallet className={`md:h-10 md:w-10 h-6 w-6`} />
                        <aside>
                            <p className={`text-sm`}>
                                Account Balance
                            </p>
                            <h1 className={`font-black text-2xl mb-1 text-teal-600 dark:text-[#1bffcb]`}>
                                ${wallet?.balance.toLocaleString() || 0} 
                            </h1>
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
                            <h1 className={`font-black text-2xl mb-1`}>
                                ${wallet?.referralBalance.toLocaleString() || 0} 
                            </h1>
                            <div className='text-xs'>
                                <Link href={''}>
                                    Current Balance Amount
                                </Link>
                            </div>
                        </aside>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 bg-white dark:bg-slate-800 space-y-1 rounded-lg py-2 px-3 shadow md:px-4 h-full lg:col-span-1">
                        <BsCashCoin className={`md:h-10 md:w-10 h-6 w-6`} />
                        <aside>
                            <p className={`text-sm text-primary`}>
                                Total Deposit
                            </p>
                            <h1 className={`font-black text-2xl mb-1`}>
                                ${deposits ? deposits.toLocaleString() : 0} 
                            </h1>
                            <div className='text-xs'>
                                <Link to='/manage/investor/transactions'>
                                    Click to see your transactions
                                </Link>
                            </div>
                        </aside>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 bg-white dark:bg-slate-800 space-y-1 rounded-lg py-2 px-3 shadow md:px-4 h-full lg:col-span-1">
                        <BiMoneyWithdraw className={`md:h-10 md:w-10 h-6 w-6`} />
                        <aside>
                            <p className={`text-sm text-primary`}>
                                Total Accrued Profit
                            </p>
                            <h1 className={`font-black text-2xl mb-1`}>
                                ${wallet?.profit.toLocaleString()||0} 
                            </h1>
                            <div className='text-xs'>
                                <Link to='/manage/investor/investments'>
                                    Click to see your investments
                                </Link>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            <section className="my-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {(investments.length > 0) && investments.map((investment) =>(<aside key={investment._id} className="bg-white dark:bg-slate-700 rounded-md shadow-md min-h-[300px] px-4 py-3">
                        <h2 className="font-bold">
                            <HiPresentationChartBar className="h-7 w-7 inline-block" /> Active Investment Status :: <strong>{ `$${investment.investment.amount.toLocaleString()}` }</strong>
                        </h2>
                        {(processing && !fetched) ? <>
                            <div>
                                <LoadingIndicator type='dots' size={7}  />
                            </div>
                        </> : <>
                            {(investment && investment != null) ? <div>
                                <GuageCharts percent={(investment.percentage).toFixed(2)} />
                                <section className="mt-4 flex text-sm justify-between items-center">
                                    <span>
                                        <p className="flex flex-col md:flex-row gap-x-1 mb-2"><strong>Start Date: </strong> <span className='text-primary dark:text-primaryLight font-medium'>{ moment(investment.investment?.createdAt).format('L LT') }</span> </p>
                                        <p className="flex flex-col md:flex-row gap-x-1"><strong>End Date: </strong> <span className='text-primary dark:text-primaryLight font-medium'>{ moment(investment.investment?.expiryDate).format('L LT') }</span> </p>
                                    </span>
                                    <span>
                                        <p className="flex flex-col md:flex-row gap-x-1 mb-2"><strong>Total Duration: </strong> <span className='text-primary dark:text-primaryLight font-medium'>{ investment.totalDuration } hours</span> </p>
                                        <p className="flex flex-col md:flex-row gap-x-1"><strong>Time Remaining: </strong> <span className='text-primary dark:text-primaryLight font-medium'>{investment.totalDuration - investment.currentLevel } hours</span> </p>
                                    </span>
                                </section>
                            </div> :
                            <div className='py-20 text-center text-sm'>
                                <p className="mb-4">No Active Investment found</p>
                                <Link to='my_investments' className={`border-primary text-primary dark:border-primaryLight dark:text-primaryLight border inline-flex gap-3 px-4 py-2 rounded-3xl text-sm`}>
                                    <FaChartLine className={`h-5 w-5`} /> Invest Now
                                </Link>
                            </div>
                            }
                        </>}
                        <div>

                        </div>
                    </aside>)
                    )}

                    {(investments.length == 0) && (<aside className="bg-white dark:bg-slate-700 rounded-md shadow-md min-h-[300px] px-4 py-3">
                        <h2 className="font-bold">
                            <HiPresentationChartBar className="h-7 w-7 inline-block" /> Active Investment Status
                        </h2>
                        {(processing && !fetched) ? <>
                            <div>
                                <LoadingIndicator type='dots' size={7}  />
                            </div>
                        </> : <>
                            <div className='py-20 text-center text-sm'>
                                <p className="mb-4">No Active Investment found</p>
                                <Link to='my_investments' className={`border-primary text-primary dark:border-primaryLight dark:text-primaryLight border inline-flex gap-3 px-4 py-2 rounded-3xl text-sm`}>
                                    <FaChartLine className={`h-5 w-5`} /> Invest Now
                                </Link>
                            </div>
                        </>}
                        <div>

                        </div>
                    </aside>
                    )}

                    {(investments.length == 0 || investments.length == 1 || investments.length == 3 || investments.length == 5) && <aside className="bg-white dark:bg-slate-700 rounded-md shadow-md min-h-[300px] px-4 py-3 flex items-center justify-center">
                        <FunnelChaart />
                    </aside>}
                </div>
            </section>
        </>


            
        
    );
}
