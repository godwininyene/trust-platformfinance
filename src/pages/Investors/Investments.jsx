import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { BiChart, BiWalletAlt } from 'react-icons/bi';
import Invest from './Invest';
import moment from 'moment/moment';
import LoadingIndicator from '../../components/LoadingIndicator';
import {FaChartLine} from 'react-icons/fa'
import axios from '../../lib/axios';

export default function Investments() {
    const [invest, setInvestState] = useState(false);
    const [loadingInvestment, setLoadingInvestmentState] = useState(true);
    const [amount, setTotalAmount] = useState(0);
    const [profit, setProfit] = useState(0);
    const [totalInvest, setTotalInvest] = useState();
    const [investments, loadInvestments] = useState();
    const [wallet, setWallet] = useState(null);
    const [fetched, setFetched] = useState(false);
    const [processing, setProcessing] = useState(false);
    
    // Fetch Dashboard Statistics
    let fetchStats = async () => {
        setProcessing(true)
        await axios.get('api/v1/stats/users')
        .then((res) => {
            setWallet(res.data.data.stats.wallet)
            setTotalInvest(res.data.data.stats.total_investment)
            setTotalAmount(res.data.data.stats.total_amount);
            setProfit(res.data.data.stats.total_profit).toFixed(2);
            setProcessing(false)
            setFetched(true);
        }).catch((err)=>{
            setProcessing(false)
            setFetched(true);
        })
    }

    const fetchInvestments = async()=>{
        try{
            setProcessing(true)
            const res = await axios.get('api/v1/users/me/investments');
            loadInvestments(res.data.data.investments)
            setProcessing(false)
            setFetched(true);
            setLoadingInvestmentState(false);
        }catch(error){
            console.log(error)
        }
    }


    useEffect(() => {
      fetchStats();
      fetchInvestments();
    }, [])

    return (
    
        <>
        {invest ? 
            <Invest onBack={() => setInvestState(false)} wallet={wallet} onInvestComplete={() => {fetchInvestments(); setLoadingInvestmentState(false);}} />
        : <main>
        
            <section className=" max-w-4xl">
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-2 bg-white dark:bg-slate-800 space-y-1 rounded-lg py-2 px-3 shadow md:px-4 h-full lg:col-span-1 relative">
                        <BiWalletAlt className={`md:h-10 md:w-10 h-10 w-10 mt-2 absolute right-3 top-0`} />
                        <aside className="pt-10">
                            <h1 className={`font-black text-3xl text-teal-600 dark:text-[#1bffcb]`}>
                                ${profit.toLocaleString()||0} 
                            </h1>
                            <p className={`text-sm`}>
                                Total Profit
                            </p>
                        </aside>
                    </div>
                    <div className="flex flex-col lg:flex-row lg:items-center gap-2 bg-white dark:bg-slate-800 space-y-1 rounded-lg py-2 px-3 shadow md:px-4 h-full lg:col-span-1 relative">
                        <BiWalletAlt className={`md:h-10 md:w-10 h-10 w-10 mt-2 absolute right-3 top-0`} />
                        <aside className="pt-10">
                            <h1 className={`font-black text-3xl text-teal-600 dark:text-[#1bffcb]`}>
                                {totalInvest || 0}
                            </h1>
                            <p className={`text-sm`}>
                                Total Investments
                            </p>
                        </aside>
                    </div>
                    <div className=" flex flex-col lg:flex-row lg:items-center gap-2 bg-white dark:bg-slate-800 space-y-1 rounded-lg py-2 px-3 shadow md:px-4 h-full xs:col-span-1 relative">
                        <BiWalletAlt className={`md:h-10 md:w-10 h-10 w-10 mt-2 absolute right-3 top-0`} />
                        <aside className="pt-10">
                            <h1 className={`font-black text-3xl text-teal-600 dark:text-[#1bffcb]`}>
                                ${amount.toLocaleString() || 0}
                            </h1>
                            <p className={`text-sm`}>
                                Total Amount Invested
                            </p>
                        </aside>
                    </div>
                </div>
            </section>

            <section className="my-6 max-w-4xl">
                <div className="bg-white dark:bg-slate-800 shadow-lg rounded-xl py-5 px-4 flex items-center justify-center">
                    <button className="btn-primary py-2 px-8 md:px-10 text-white" onClick={() => setInvestState(true)}>
                        Invest Now
                    </button>
                </div>
            </section>

            <section>
                <aside className='col-span-3 bg-white dark:bg-slate-800 px-4 py-1 pb-3 rounded-md'>
                    <h2 className="py-2 border-b font-semibold flex justify-between items-center">
                        <span> <BiChart className="w-6 h-6 inline-block" /> My Investments  </span>
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full table border-collapse bg-white dark:bg-slate-800 rounded-md overflow-hidden shadow-md">
                            <thead className="bg-primary  text-white text-left">
                                <tr>
                                    <th className="py-1 px-3 whitespace-nowrap">Plan</th>
                                    <th className="py-1 px-3 whitespace-nowrap">Amount Invested</th>
                                    <th className="py-1 px-3 whitespace-nowrap">Profit</th>
                                    <th className="py-1 px-3 whitespace-nowrap">Start Date/Time</th>
                                    <th className="py-1 px-3 whitespace-nowrap">End Date/Time</th>
                                    <th className="py-1 px-3 whitespace-nowrap">Status</th>
                                </tr>
                            </thead>
                            <tbody className="max-h-[100px] md:max-h-[100px] overflow-y-auto text-sm">
                              { (processing || !fetched) && (<tr>
                                      <td colSpan={5} className="shadow-md py-6 h-32 animate-pulse text-center">
                                          <LoadingIndicator type='dots' size={10} />
                                      </td>
                                  </tr>)}
                              
                              { (investments?.length > 0 && !loadingInvestment) && investments.map((investment) => (
                                  <tr key={investment.id} className="odd:bg-red-50 dark:odd:bg-slate-800">
                                      <td className="px-2 py-2">{investment?.plan?.name}</td>
                                      <td className="px-2 py-2">${investment.amount.toLocaleString()}</td>
                                      <td className="px-2 py-2">${parseFloat(investment?.profit.toLocaleString()).toFixed(2)}</td>
                                      <td className="px-2 py-2">{moment(investment.createdAt).calendar()}</td>
                                      <td className="px-2 py-2">{moment(investment.expiryDate).calendar()}</td>
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
                </aside>
            </section>
        </main>}
        </>
    );
}
