import LoadingIndicator from '../../components/LoadingIndicator';
import React, { useEffect, useState } from 'react'
import { BiSave } from 'react-icons/bi';
import { FaTimesCircle } from 'react-icons/fa';
import { MdAdd } from 'react-icons/md'
import axios from '../../lib/axios';

const BankAccounts = () => {
  const [addNewBank, setAddBankState] = useState(false);
  const [error, setError] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [banks, setBanks] = useState([]);


  let fetchMyAccounts = async () => {
    await axios.get('api/v1/users/me/banks')
    .then((res) => {
      console.log(res)
      if(res.data.status === 'success'){
        setBanks(res.data.data.accounts);
      }
    })
    .catch((error) => {
      alert(error?.response.data.message);
      console.log(error);
    })
  }

  useEffect(() => {
    fetchMyAccounts();
  }, [])
  

  let submit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    let form = new FormData(e.target);
    let jsonData = Object.fromEntries(form);
    await axios.post('api/v1/users/me/banks', jsonData)
    .then((res) => {
      setProcessing(false);
      if(res.data.status === 'success'){
        setBanks(res.data.data.account);
        setAddBankState(false)
        form.reset();
      }
    })
    .catch((error) => {
      setProcessing(false);
      setError(error?.response.data.message);
      alert(error?.response.data.message);
      console.log(error);
    })
  }


  return (
    <div>
        <section className="px-4 py-3">
            <h2 className="pt-2 flex justify-between">
                <span className="font-bold">Bank Accounts</span>
                { (addNewBank == false) ?
                <button onClick={() => setAddBankState(true)} className="py-1 px-2 rounded-md bg-teal-500 text-white"> 
                  <MdAdd className="inline" /> Add New
                </button> :
                <button onClick={() => setAddBankState(false)} className="py-1 px-2 rounded-md bg-red-500 text-white"> 
                <FaTimesCircle className="inline" /> Cancel
              </button> }
            </h2>
            <hr className="my-2" />
            { addNewBank ? (
              <aside>
                {/* Form */}
                <form onSubmit={submit}>
                  <div className="mb-5 relative">
                      <label htmlFor="bankName" className='text-sm block'> Bank Name </label>
                      <input type="text" name="bankName" id="bankName" placeholder="Enter the Bank's name" required defaultValue={``}
                          className='peer w-full py-3 px-5 rounded-md bg-slate-100 text-slate-900 transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0  focus:bg-white focus:shadow-lg'
                      />
                  </div>
                  <div className="mb-5 relative">
                      <label htmlFor="accountNumber" className='text-sm block'> Account Number / IBAN </label>
                      <input type="number" name="accountNumber" id="accountNumber" placeholder="Enter your account number" required defaultValue={``}
                          className='peer w-full py-3 px-5 rounded-md bg-slate-100 text-slate-900 transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0  focus:bg-white focus:shadow-lg'
                      />
                  </div>
                  <div className="mb-5 relative">
                      <label htmlFor="accountName" className='text-sm block'> Account Holder's Name </label>
                      <input type="text" name="accountName" id="accountName" placeholder="Enter the account's name" required defaultValue={``}
                          className='peer w-full py-3 px-5 rounded-md bg-slate-100 text-slate-900 transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0  focus:bg-white focus:shadow-lg'
                      />
                  </div>
                  <div className="mb-5 relative">
                      <label htmlFor="accountType" className='text-sm block'> Account Type </label>
                      <select
                          name="accountType" id="accountType" defaultValue={``} required
                          className='mb-2 peer w-full py-3 px-5 rounded-md capitalize bg-slate-100 dark:text-slate-700  transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0'
                        >
                          <option value="" disabled>Select Account Type</option>
                          <option value="savings">savings Account</option>
                          <option value="current">Current Account</option>
                          <option value="fix_deposit">Fix Deposit Account</option>
                          <option value="others">Others</option>
                      </select>
                    </div>
                    <div className="mb-5 relative">
                        {error && (<p className="text-sm w-full text-red-500 mb-4">{ error }</p>)}
                        <button className='bg-primary hover:bg-green-700 rounded-md font-semibold px-2 py-2 transition-all duration-300 ease-in  text-white'>
                            {processing ? <span className='inline-flex gap-x-2 justify-center items-center'><LoadingIndicator size={5} /> Saving... </span> : 
                            <span className='inline-flex gap-x-2 justify-center items-center'><BiSave className="w-6 h-6"  /> Save Account Details </span> }
                        </button>
                    </div>
                </form>
              </aside>
            ) : (
              <aside className="md:max-h-[400px] overflow-y-auto">
                {/* Show Accounts */}
                {banks?.length > 0 && banks.map((bank) => (
                  <aside key={bank.id} className="grid grid-cols-1 md:grid-cols-2 gap-2 bg-primary bg-opacity-20 rounded-lg px-2 py-3 mb-5">
                    <div className="mb-5 relative">
                      <label htmlFor="bank" className='text-sm block'> Bank Name </label>
                      <p className="text-lg font-bold">{bank.bankName}</p>
                    </div>
                    <div className="mb-5 relative">
                      <label htmlFor="bank" className='text-sm block'> Account Holder </label>
                      <p className="text-lg font-bold">{bank.accountName}</p>
                    </div>
                    <div className="mb-5 relative">
                      <label htmlFor="bank" className='text-sm block'> Account Number </label>
                      <p className="text-lg font-bold">{bank.accountNumber}</p>
                    </div>
                    <div className="mb-5 relative">
                      <label htmlFor="bank" className='text-sm block'> Account Type </label>
                      <p className="text-lg font-bold">{bank.accountType}</p>
                    </div>
                  </aside>
                ))}
                {banks?.length == 0 && <div className="text-base py-8 px-4 italic text-centerr "> 
                    You have no bank information! Kindly add your own bank information here by clicking on the "Add New" button above.
                </div>}
              </aside>
            )

            }
        </section>
    </div>
  )
}

export default BankAccounts