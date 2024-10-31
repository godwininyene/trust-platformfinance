import LoadingIndicator from '../../components/LoadingIndicator'
import React, { useEffect, useState } from 'react'
import { BiSave } from 'react-icons/bi'
import axios from '../../lib/axios'

const Withdrawal = ({onBack, user}) => {
  const [error, setError] = useState();
  const [processing, setProcessing] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [avBalance, setAvBalance] = useState(0);

  const submit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    let form = new FormData(e.target);
    await axios.post('api/v1/users/me/transactions', form)
    .then((res) => {
      setProcessing(false);
      if (res.data.status === 'success') {
        onBack();
      }
    })
    .catch((error) => {
      setProcessing(false);
      setError(error?.response.data.message);
      // console.log(error);
    })
  }

  // const fetchBankAccounts = async () => {
  //   await axios.get(route('api.fetch_bank_accounts'))
  //   .then((res) => {
  //     setAccounts(res.data.body.accounts);
  //   })
  // }
  // useEffect(() => {
  //   fetchBankAccounts();
  // }, []);

  const handleChange = type=>{
    setAvBalance(user.wallet[0][type])
  }

  return (
    <div>
      <section className="px-4 py-3">
        <h2 className="pt-2 font-bold">
          Requeust Withdrawal
        </h2>
        <hr className="my-2" />
        <form onSubmit={submit}>
          <input type="hidden" name='type' value='withdrawal'/>
          <div className="mb-5 relative">
            <label htmlFor="pay_option" className='text-sm block'> Withdraw From </label>
            <select
                name="pay_option" defaultValue={``} required onChange={(e) => handleChange(e.target.value)}
                className='mb-2 peer w-full py-3 px-5 rounded-md capitalize bg-slate-100 dark:text-slate-700  transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0'
              >
                <option value="" disabled>Select Wallet</option>
                {user && <>
                  <option value='balance'>Wallet Balance</option>
                  <option value='profit'>Wallet Profit</option>
                  <option value='referralBalance'>Referral Balance</option>
               
                </>}
            </select>
          </div>
          <div className="mb-5 relative">
              <label htmlFor="bank" className='text-sm block'> Available Balance </label>
              <input type="text" readOnly name="bank" placeholder="Your Available Balance" value={`$${avBalance}`}
                  className='peer w-full py-3 px-5 rounded-md bg-slate-100 text-slate-900 transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0  focus:bg-white focus:shadow-lg'
              />
          </div>
          <div className="mb-5 relative">
              <label htmlFor="amount" className='text-sm block'> Withdrawal Amount </label>
              <input type="number" required name="amount" max={avBalance} placeholder="Enter the deposit amount" defaultValue={``}
                  className='peer w-full py-3 px-5 rounded-md bg-slate-100 text-slate-900 transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0  focus:bg-white focus:shadow-lg'
              />
          </div>
          <div className="mb-5 relative">
            <label htmlFor="bank_id" className='text-sm block'> Payout Bank </label>
            <select
                name="bank_id" defaultValue={``} 
                className='mb-2 peer w-full py-3 px-5 rounded-md capitalize bg-slate-100 dark:text-slate-700  transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0'
              >
                <option value="" disabled>Select Payout Account</option>
                {(accounts && accounts.length > 0) ? accounts.map(account =>(
                  <option key={account.id} value={account.id}>{ account.bank_name }</option>)
                  ) :
                  (<option value={``} readOnly>No Bank Account Found</option>)
                }
            </select>
          </div>
          <div className="mb-5 relative">
              {error && (<p className="text-sm w-full text-red-500 mb-4">{ error }</p>)}
              <button className='inline-flex gap-2 justify-center items-center bg-primary hover:bg-green-700 rounded-md font-semibold px-2 py-2 transition-all duration-300 ease-in  text-white'>
                  {processing ? <LoadingIndicator size={5} />  : <BiSave className="w-6 h-6"  /> }
                  Save Transaction Details
              </button>
          </div>

        </form>
      </section>
    </div>
  )
}

export default Withdrawal