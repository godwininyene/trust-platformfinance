import Modal from '../../components/CustomModal';
import LoadingIndicator from '../../components/LoadingIndicator';
import moment from 'moment/moment';
import { useEffect, useState } from 'react';
import { BiTransferAlt } from 'react-icons/bi';
import {FaMoneyBillTransfer} from 'react-icons/fa6'
import Deposit from './Deposit';
import Withdrawal from './Withdrawal';
import BankAccounts from './BankAccounts';
import axios from '../../lib/axios';

export default function Transactions() {
    const user = JSON.parse(localStorage.getItem('user'));
    const [transactions, setTransactions] = useState([]);
    const [fetched, setFetched] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [depModal, setDepositModal] = useState(false);
    const [witdModal, setWithdrawModal] = useState(false);
    const [accountModal, setAccountModal] = useState(false);

    // Fetch Dashboard Statistics
    let fetchStats = async () => {
        setProcessing(true)
        await axios.get('api/v1/users/me/transactions')
        .then((res) => {
            setTransactions(res.data.data.transactions);
            setFetched(true);
            setProcessing(false)
        })
    }

    

    useEffect(() => {
    fetchStats();
    }, [])


    return (
        <>

            <section className="my-6 flex justify-between text-sm md:text-base">
                <div className="flex md:gap-3">
                    <button className="btn-primary py-2 px-4 md:px-10 text-white" onClick={() => setDepositModal(true)}>
                        Deposit
                    </button>
                    <button className="btn-secondary py-2 px-4 md:px-10 text-white" onClick={() => setWithdrawModal(true)}>
                        Withdraw
                    </button>
                </div>
                
                <button className="btn-secondary py-2 px-4 md:px-10 text-white" onClick={() => setAccountModal(true)}>
                    My Bank Accounts
                </button>
            </section>


            {/* Transaction Table */}
            <section className="my-4">
                <aside className="">
                    {/* Transaction History */}
                    <div className="bg-white dark:bg-slate-800 space-y-1 rounded-lg py-2 px-3 shadow md:px-4 min-h-[200px]">
                        <h2 className="py-2 border-b font-semibold flex justify-between items-center">
                            <span> <BiTransferAlt className="w-6 h-6 inline-block" /> Transaction History  </span>
                            <div>
                                {/* Filter By:  */}
                            </div>
                        </h2>
                        <div className="overflow-x-auto">
                            <table className="w-full table border-collapse bg-white dark:bg-slate-700 rounded-md overflow-hidden shadow-md">
                                    <thead className="bg-primary dark:bg-primaryLight text-white text-left">
                                        <tr>
                                           
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
                                        <tr key={transaction._id} className="odd:bg-red-50 dark:odd:bg-slate-800">
                                           
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
                                    { (transactions.length == 0 && !processing) && (
                                        <tr className="odd:bg-red-50 dark:odd:bg-slate-800">
                                            <td className="px-2 py-2" colSpan={5}>
                                                <div className="flex flex-col items-center justify-center py-3">
                                                    <p className="mb-4">
                                                        No Transaction in history. Make your first transaction by depositing funds in your wallet.
                                                    </p>
                                                    <button className="btn-primary py-2 px-8 md:px-10 text-white" onClick={() => setDepositModal(true)}>
                                                        Fund your wallet Now
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ) }
                                    </tbody>
                                </table>
                        </div>
                    </div>
                </aside>
            </section>

            {/* Deposit Modal */}
            <Modal show={depModal} maxWidth="md" onClose={() => setDepositModal(false)} backDrop={false}>
                <Deposit onBack={() => {setDepositModal(false); fetchStats();}} />
            </Modal>
            {/* Withdrawal Modal */}
            <Modal show={witdModal} maxWidth="sm" onClose={() => setWithdrawModal(false)} backDrop={false}>
                <Withdrawal onBack={() => {setWithdrawModal(false); fetchStats();}} user={user}/>
            </Modal>
            {/* Withdrawal Modal */}
            <Modal show={accountModal} maxWidth="md" onClose={() => setAccountModal(false)} backDrop={false}>
                <BankAccounts />
            </Modal>
        </>
    );
}
