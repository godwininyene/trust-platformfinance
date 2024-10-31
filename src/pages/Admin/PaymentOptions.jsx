import Checkbox from '../../components/Checkbox';
import Modal from '../../components/CustomModal';
import LoadingIndicator from '../../components/LoadingIndicator';
import { useEffect, useState } from 'react';
import {BiSave, BiTrashAlt, BiWallet } from 'react-icons/bi';
import { BsBank, BsEye, BsEyeSlash } from 'react-icons/bs';
import { GiBank } from 'react-icons/gi';
import axios from '../../lib/axios';

const PaymentOptions = () => {
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loadingPlans, setLoadOptionState] = useState(false);
  const [payOptions, loadPayOptions] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [selectedOption, setSelectedOption] = useState();
  const [editModal, setEditModal] = useState(false);

  useEffect(() => {
    fetchPayOption();
  }, [])

  let fetchPayOption = async () => {
    setLoadOptionState(true);
    await axios.get('api/v1/paymentOptions')
    .then((res) => {
      setLoadOptionState(false);
      setFetched(true);
      loadPayOptions(res.data.data.paymentOptions);
    })
    .catch((err) => {
      setLoadOptionState(false);
    });
  }

  let submit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setErrors('');
    let form = new FormData(e.target);
    await axios.post('api/v1/paymentOptions', form)
    .then((res) => {
      if(res.data.status == 'success'){
        alert("Payment Option added successfully!")
        loadPayOptions(prev => [res.data.data.paymentOption, ...prev ]);
        e.target.reset();
      }

      setProcessing(false);
    })
    .catch((err) => {
      setProcessing(false);
      setErrors(err.response.data.errors);
    });
  }

  let updateOption = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setErrors('');
    let form = new FormData(e.target);
    await axios.patch(`api/v1/paymentOptions/${selectedOption._id}`, form)
    .then((res) => {  
        if(res.data.status == 'success'){
            alert("Payment Option updated successfully!")
            loadPayOptions(prevOptions => 
                prevOptions.map(payOption => 
                    payOption._id === selectedOption._id ? res.data.data.paymentOption : payOption
                )
            );
            e.target.reset();
            setEditModal(false);
        }
        setProcessing(false);
    })
    .catch((err) => {
      setProcessing(false);
      setErrors(err.response.data.errors);
    });
  }


  let deleteOption = async () => {
    setDeleting(true);
    try {
      const response = await axios.delete(`api/v1/paymentOptions/${selectedOption._id}`);
      if (response.status === 204) {
        // Update the payOptions state to exclude the deleted payOption
        loadPayOptions(payOptions => payOptions.filter(el => el._id !== selectedOption._id));
        alert("Pay Option was deleted successfully!");
      }
      setDeleting(false);
      setEditModal(false);
    } catch (err) {
        setEditModal(false);
      setDeleting(false);
      if (err && !err.response) {
        alert(err);
      } else {
        setErrors(err.response.data.errors);
      }
    }
  };

  return (
    // <AuthenticatedLayout
    //         user={auth.user}
    //         header={<h2 className="font-semibold text-xl leading-tight flex items-center gap-2">
    //             <BsBank className={`h-5 w-5`} /> <span> Payment Options </span>
    //         </h2>}
    //     >
    //       <Head title="Investment Plans" />
        <>
            <section>
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 max-w-5xl">
                <aside className='col-span-2 bg-white dark:bg-slate-700 px-4 py-3 rounded-md'>
                    <h1 className="text-lg font-semibold mb-4 border-b">
                        Add New Payment Option
                    </h1>
                    <form method="post" onSubmit={submit} encType="multipart/form-data">
                        <div className="mb-5 relative">
                            <label htmlFor="payOption" className='text-sm block'> Payment Option </label>
                            <select
                                    name="payOption" required
                                    className='mb-2 peer w-full py-3 px-5 rounded-md  bg-slate-100 dark:text-slate-700  transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0'
                                >
                                <option value="">--select--</option>
                                <option value="bank">Bank</option>
                                <option value="mobile wallet">Mobile Wallet</option>
                                <option value="crypto wallet">Crypto Wallet</option>
                            </select>
                        </div>
                        <div className="mb-5 relative">
                            <label htmlFor="bank" className='text-sm block'> Bank Name/Wallet </label>
                            <input type="text" name="bank" placeholder="Enter Bank Name or Wallet"  
                                className='peer w-full py-3 px-5 rounded-md bg-slate-100 text-slate-900 transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0  focus:bg-white focus:shadow-lg'
                            />
                        </div>
                        <div className="mb-5 relative">
                            <label htmlFor="accountNumber" className='text-sm block'> Account Number / Wallet Address </label>
                            <input type="text" name="accountNumber" placeholder="Enter Account Number or Wallet Address"  
                                className='peer w-full py-3 px-5 rounded-md bg-slate-100 text-slate-900 transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0  focus:bg-white focus:shadow-lg'
                            />
                        </div>
                        <div className="mb-5 relative">
                            <div className="grid grid-cols-2 items-start gap-4">
                                <aside>
                                    <label htmlFor="image" className='text-sm block'>Image/Barcode </label>
                                    <input type="file" id='image' name="image" placeholder="Upload Image/Barcode" accept="image"
                                        className='peer w-full py-3 px-1 rounded-md bg-slate-100 text-slate-900 transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0  focus:bg-white focus:shadow-lg'
                                    />
                                </aside>
                                <aside>
                                    <label htmlFor="extra" className='text-sm block'>Extra Info <small>(optional)</small> </label>
                                    <input type="text" id='extra' name="extra" placeholder="Extra Infomation" 
                                        className='peer w-full py-3 px-3 rounded-md bg-slate-100 text-slate-900 transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0  focus:bg-white focus:shadow-lg'
                                    />
                                </aside>
                            </div>
                        </div>
                        <div className="mb-5 relative">
                            <Checkbox name="display_status" id="display_status" type="checkbox" className='' 
                                />
                            <label htmlFor="display_status" className='inline-block pl-4 text-sm'>
                                Show Payment Option
                            </label>
                        </div>
                        <div className="mb-5 relative">
                            {/* {error && (<p className="text-sm text-red-500 mb-4">{ error }</p>)} */}
                            {errors && errors.length > 0 && (
                                <div>
                                <div className="font-medium text-red-600">
                                    Whoops! Something went wrong.
                                </div>
                                <ul className="mt-3 list-disc list-inside text-sm text-red-600">
                                    {errors.map((error, index) => (
                                    // Use Object.keys() to iterate over the keys of the error object
                                    Object.keys(error).map((key) => (
                                        <li key={`${index}-${key}`}>{`${key}: ${error[key]}`}</li>
                                    ))
                                    ))}
                                </ul>
                                </div>
                            )}
                            <button className='w-full inline-flex gap-2 justify-center items-center bg-primary hover:bg-green-700 rounded-md font-semibold px-2 py-3 transition-all duration-300 ease-in  text-white'>
                                {processing ? <LoadingIndicator size={5} />  : <BiSave className="w-6 h-6"  /> }
                                Save  Payment Option
                            </button>
                        </div>
                    </form>
                </aside>
                <aside className='col-span-3 bg-white dark:bg-slate-700 px-4 py-1 pb-3 rounded-md'>
                  <h2 className="py-2 mb-4 border-b font-semibold flex justify-between items-center">
                      <span className="flex gap-2 items-center"> <BsBank className="w-6 h-6 inline-block" /> All Payment Options  </span>
                  </h2>
                  <div className="overflow-x-auto">
                    {/* Cards */}
                    <ul className="grid grid-cols-1  gap-y-5">
                        { payOptions && payOptions.map((payOption) => (
                            <li key={payOption.id} className={`px-4 pt-3 pb-0 shadow-md rounded-md bg-primary text-white bg-opacity-80`} role='button' onClick={()=> {setSelectedOption(payOption); setEditModal(true);}}>
                                <span className="flex items-center gap-2 text-lg font-semibold  mb-5"> 
                                    { payOption.payOption == 'bank' ? (<><GiBank className="w-6 h-6" /> Bank</>) : (<><BiWallet className="w-6 h-6" /> Wallet</>) }
                                </span>
                                <h3 className="text-xl">
                                    { payOption.bank }
                                </h3>
                                <h1 className="font-black text-3xl space-x-2">
                                    { payOption.accountNumber }
                                </h1>
                                <small>{ payOption.extra } </small>
                                <p className="text-right w-full mb-0">
                                    <span className="inline-flex items-center gap-2 text-lg font-semibold  mb-5"> 
                                        { payOption.displayStatus == true ? (<><BsEye className="w-6 h-6" /> showing</>) : (<><BsEyeSlash className="w-6 h-6" /> not showing</>) }
                                    </span>
                                </p>
                            </li>))
                        }
                    </ul>
                  </div>
                </aside>
              </div>
            </section>

            <Modal show={editModal} maxWidth="sm" onClose={() => setEditModal(false)} backDrop={false}>
              <section>
              <aside className='col-span-2 bg-white dark:bg-slate-700 px-4 py-3 rounded-md'>
                  <h1 className="text-lg font-semibold mb-4 border-b">
                    Edit New Plan
                  </h1>
                  <form method="post" onSubmit={updateOption}>
                   
                        <div className="mb-5 relative">
                            <label htmlFor="payOption" className='text-sm block'> Payment Option </label>
                            <select
                                    name="payOption" defaultValue={selectedOption?.payOption} required
                                    className='mb-2 peer w-full py-3 px-5 rounded-md  bg-slate-100 dark:text-slate-700  transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0'
                                >
                                <option value="bank">Bank</option>
                                <option value="mobile wallet">Mobile Wallet</option>
                                <option value="crypto wallet">Crypto Wallet</option>
                            </select>
                        </div>
                        <div className="mb-5 relative">
                            <label htmlFor="bank" className='text-sm block'> Bank Name/Wallet </label>
                            <input type="text" name="bank" placeholder="Enter Bank Name or Wallet" defaultValue={selectedOption?.bank}
                                className='peer w-full py-3 px-5 rounded-md bg-slate-100 text-slate-900 transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0  focus:bg-white focus:shadow-lg'
                            />
                        </div>
                        <div className="mb-5 relative">
                            <label htmlFor="accountNumber" className='text-sm block'> Account Number / Wallet Address </label>
                            <input type="text" name="accountNumber" placeholder="Enter Account Number or Wallet Address"  defaultValue={selectedOption?.accountNumber}
                                className='peer w-full py-3 px-5 rounded-md bg-slate-100 text-slate-900 transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0  focus:bg-white focus:shadow-lg'
                            />
                        </div>
                        <div className="mb-5 relative">
                            <div className="grid grid-cols-2 items-start gap-4">
                                <aside>
                                    <label htmlFor="image" className='text-sm block'>Image/Barcode </label>
                                    <input type="file" id='image' name="image" placeholder="Upload Image/Barcode" accept="image"
                                        className='peer w-full py-3 px-1 rounded-md bg-slate-100 text-slate-900 transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0  focus:bg-white focus:shadow-lg'
                                    />
                                </aside>
                                <aside>
                                    <label htmlFor="extra" className='text-sm block'>Extra Info <small>(optional)</small> </label>
                                    <input type="text" id='extra' name="extra" placeholder="Extra Infomation" defaultValue={selectedOption?.extra}
                                        className='peer w-full py-3 px-3 rounded-md bg-slate-100 text-slate-900 transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0  focus:bg-white focus:shadow-lg'
                                    />
                                </aside>
                            </div>
                        </div>
                        <div className="mb-5 relative">
                            <Checkbox name="displayStatus" id="displayStatus" type="checkbox" className=''
                                />
                            <label htmlFor="displayStatus" className='inline-block pl-4 text-sm'>
                                Show Payment Option
                            </label>
                        </div>
                        <div className="mb-5 relative">
                            {/* {error && (<p className="text-sm w-full text-red-500 mb-4">{ error }</p>)} */}
                            {errors.length > 0 && (
                                <div>
                                    <div className="font-medium text-red-600">
                                        Whoops! Something went wrong.
                                    </div>
                                    <ul className="mt-3 list-disc list-inside text-sm text-red-600">
                                        {errors.map((error, index) => (
                                        // Use Object.keys() to iterate over the keys of the error object
                                        Object.keys(error).map((key) => (
                                            <li key={`${index}-${key}`}>{`${key}: ${error[key]}`}</li>
                                        ))
                                        ))}
                                    </ul>
                                </div>
                            )}
                            <button className='inline-flex gap-2 justify-center items-center bg-primary hover:bg-green-700 rounded-md font-semibold px-2 py-2 transition-all duration-300 ease-in  text-white'>
                                {processing ? <LoadingIndicator size={5} />  : <BiSave className="w-6 h-6"  /> }
                                Update Payment Option
                            </button>
                            <button type='button' className='inline-flex gap-2 ml-1 justify-center items-center bg-red-500 hover:bg-red-600 rounded-md font-semibold px-2 py-2 transition-all duration-300 ease-in  text-white' onClick={()=> {deleteOption(selectedOption)}}>
                                {(deleting) ? <LoadingIndicator size={6} /> : <BiTrashAlt  className="h-6 w-6"  /> } Delete
                            </button>
                        </div>
                  </form>
                </aside>
              </section>
            </Modal>
    </>
  )
}

export default PaymentOptions