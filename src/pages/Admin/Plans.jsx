import Checkbox from '../../components/Checkbox';
import Modal from '../../components/CustomModal';
import LoadingIndicator from '../../components/LoadingIndicator';
import { useEffect, useState } from 'react';
import { BiEditAlt, BiSave, BiTrashAlt } from 'react-icons/bi';
import { ImPieChart } from 'react-icons/im';
import axios from '../../lib/axios';

const Plans = () => {
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loadingPlans, setPlanState] = useState(false);
  const [plans, loadPlans] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(false);
  const [editModal, setEditModal] = useState(false);

  useEffect(() => {
    fetchPlan();
  }, [])

  let fetchPlan = async () => {
    setPlanState(true);
    await axios.get('api/v1/plans')
    .then((res) => {
      setPlanState(false);
      setFetched(true);
      loadPlans(res.data.data.plans);
    })
    .catch((err) => {
      setPlanState(false);
    });
  }

  let submit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setErrors('');
    let form = new FormData(e.target);
    await axios.post('api/v1/plans', form)
    .then((res) => { 
      if(res.data.status == 'success'){
        setProcessing(false);
        alert("Plan added successfully")
        loadPlans(prev => [res.data.data.plan, ...prev ]);
        e.target.reset();
      }
     
    })
    .catch((err) => {
      console.log(err);
        
      setProcessing(false);
      if (err && !err.response) {
        alert(err);
      } else {
        alert(err.response.data.errors);
      }
    });
  }

  let updatePlan = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setErrors('');
    
    let form = new FormData(e.target);
  
    try {
      const response = await axios.patch(`api/v1/plans/${selectedPlan._id}`, form);
      if (response.data.status === 'success') {
        // Replace the updated plan in the state
        loadPlans(prevPlans => 
          prevPlans.map(plan => 
            plan._id === selectedPlan._id ? response.data.data.plan : plan
          )
        );
        e.target.reset();
        alert("Plan was updated successfully!");
      }
      
      setProcessing(false);
      setEditModal(false);
    } catch (err) {
      setProcessing(false);
      if (err && !err.response) {
        alert(err);
      } else {
        alert(err.response.data.errors);
      }
    }
  };
  
  let deletePlan = async (plan) => {
    setDeleting(true);
    try {
      const response = await axios.delete(`api/v1/plans/${plan._id}`);
      if (response.status === 204) {
        // Update the plans state to exclude the deleted plan
        loadPlans(plans => plans.filter(el => el._id !== plan._id));
        alert("Plan was deleted successfully!");
      }
      setDeleting(false);
    } catch (err) {
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
    //             <ImPieChart className={`h-5 w-5`} /> <span> Manage Plans </span>
    //         </h2>}
    //     >
    //       <Head title="Investment Plans" />
        <>
            <section>
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 max-w-5xl">
                <aside className='col-span-2 bg-white dark:bg-slate-700 px-4 py-3 rounded-md'>
                  <h1 className="text-lg font-semibold mb-4 border-b">
                    Add New Plan
                  </h1>
                  <form method="post" onSubmit={submit}>
                    <div className="mb-5 relative">
                      <label htmlFor="name" className='text-sm block'>Plan Name <small>(optional)</small> </label>
                      <input type="text" name="name" placeholder="Enter Plan Name"  
                          className='peer w-full py-3 px-5 rounded-md bg-slate-100 text-slate-900 transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0  focus:bg-white focus:shadow-lg'
                      />
                    </div>
                    <div className="mb-5 relative">
                      <label htmlFor="planDuration" className='text-sm block'>Plan Duration </label>
                      <div className="grid grid-cols-2 items-start gap-4">
                        <input type="number" id='planDuration' name="planDuration" placeholder="Duration"  required 
                            className='peer w-full py-3 px-5 rounded-md bg-slate-100 text-slate-900 transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0  focus:bg-white focus:shadow-lg'
                        />
                        <select
                            name="timingParameter" defaultValue="" required
                            className='mb-2 peer w-full py-3 px-5 rounded-md  bg-slate-100 dark:text-slate-700  transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0'
                        >
                            <option value="hours">Hours</option>
                            <option value="days">Days</option>
                        </select>
                      </div>
                    </div>
                    <div className="mb-5 relative">
                      <div className="grid grid-cols-2 items-start gap-4">
                          <aside>
                            <label htmlFor="minDeposit" className='text-sm block'>Min. Deposit <small>($)</small> </label>
                            <input type="number" name="minDeposit" placeholder="Minimum Deposit" id="minDeposit" required
                                className='peer w-full py-3 px-5 rounded-md bg-slate-100 text-slate-900 transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0  focus:bg-white focus:shadow-lg'
                            />
                          </aside>
                          <aside>
                            <label htmlFor="maxDeposit" className='text-sm block'>Max. Deposit <small>($)</small> </label>
                            <input type="number" name="maxDeposit" placeholder="Maximum Deposit" id="maxDeposit" required
                                className='peer w-full py-3 px-5 rounded-md bg-slate-100 text-slate-900 transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0  focus:bg-white focus:shadow-lg'
                            />
                          </aside>
                      </div>
                    </div>
                    <div className="mb-5 relative">
                      <div className="grid grid-cols-2 items-start gap-4">
                          <aside>
                            <label htmlFor="percentage" className='text-sm block'>Return Percentage <small>(%)</small> </label>
                            <input type="number" name="percentage" placeholder="Investment Percentage" id="percentage" required
                                className='peer w-full py-3 px-5 rounded-md bg-slate-100 text-slate-900 transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0  focus:bg-white focus:shadow-lg'
                            />
                          </aside>
                          <aside>
                            <label htmlFor="referalBonus" className='text-sm block'>Refferal Bonus <small>(%)</small> </label>
                            <input type="number" name="referalBonus" placeholder="Referral Bonus" id="referalBonus"
                                className='peer w-full py-3 px-5 rounded-md bg-slate-100 text-slate-900 transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0  focus:bg-white focus:shadow-lg'
                            />
                          </aside>
                      </div>
                    </div>
                    <div className="mb-5 relative">
                      <Checkbox name="returnPrincipal" id="returnPrincipal" type="checkbox" className='' 
                          />
                      <label htmlFor="returnPrincipal" className='inline-block pl-4 text-sm'>
                          Return principal
                      </label>
                    </div>
                    <div className="mb-5 relative">
                      {/* {error && (<p className="text-sm text-red-500 mb-4">{ error }</p>)} */}
                      <button className='w-full inline-flex gap-2 justify-center items-center bg-primary hover:bg-green-700 rounded-md font-semibold px-2 py-3 transition-all duration-300 ease-in  text-white'>
                          {processing ? <LoadingIndicator size={5} />  : <BiSave className="w-6 h-6"  /> }
                          Save Plan
                      </button>
                    </div>
                  </form>
                </aside>
                <aside className='col-span-3 bg-white dark:bg-slate-700 px-4 py-1 pb-3 rounded-md'>
                  <h2 className="py-2 border-b font-semibold flex justify-between items-center">
                      <span className="flex gap-2 items-center"> <ImPieChart className="w-6 h-6 inline-block" /> All Plans  </span>
                  </h2>
                  <div className="overflow-x-auto">
                      <table className="w-full table border-collapse bg-white dark:bg-slate-700 rounded-md overflow-hidden shadow-md">
                              <thead className="bg-primary dark:bg-primaryLight text-white text-left">
                                  <tr>
                                      <th className="py-1 px-3 whitespace-nowrap">Duration</th>
                                      <th className="py-1 px-3 whitespace-nowrap">Min. Deposit</th>
                                      <th className="py-1 px-3 whitespace-nowrap">Max. Deposit</th>
                                      <th className="py-1 px-3 whitespace-nowrap">Percentage </th>
                                      <th className="py-1 px-3 whitespace-nowrap">Actions</th>
                                  </tr>
                              </thead>

                              <tbody className="max-h-[100px] md:max-h-[100px] overflow-y-auto text-sm">
                              { (loadingPlans || !fetched) && (<tr>
                                      <td colSpan={5} className="shadow-md py-6 h-32 animate-pulse text-center">
                                          <LoadingIndicator type='dots' size={10} />
                                      </td>
                                  </tr>)}
                              
                              { (plans.length > 0 && !loadingPlans) && plans.map((plan) => (
                                  <tr key={plan.id} className="odd:bg-red-50 dark:odd:bg-slate-800">
                                      <td className="px-2 py-2">{plan.planDuration} {plan.timingParameter}</td>
                                      <td className="px-2 py-2">${plan.minDeposit.toLocaleString()}</td>
                                      <td className="px-2 py-2">${plan.maxDeposit.toLocaleString()}</td>
                                      <td className="px-2 py-2">{plan.percentage}%</td>
                                      <td className="px-2 py-2 whitespace-nowrap">
                                        <button className="py-1 px-2 text-blue-500" onClick={()=> {setSelectedPlan(plan); setEditModal(true);}}>
                                          <BiEditAlt  className="h-6 w-6"  />
                                        </button>
                                        <button className="py-1 px-2 text-red-500" onClick={()=> {deletePlan(plan); setSelectedPlan(plan)}}>
                                          {(deleting && selectedPlan.id == plan.id) ? <LoadingIndicator size={6} /> : <BiTrashAlt  className="h-6 w-6"  /> }
                                        </button>
                                      </td>
                                  </tr>
                              )) }
                              </tbody>
                          </table>
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
                  <form method="post" onSubmit={updatePlan}>
                    <input type="hidden" name="id" value={selectedPlan.id} />
                    <div className="mb-5 relative">
                      <label htmlFor="name" className='text-sm block'>Plan Name <small>(optional)</small> </label>
                      <input type="text" name="name" placeholder="Enter Plan Name" defaultValue={selectedPlan.name} 
                          className='peer w-full py-3 px-5 rounded-md bg-slate-100 text-slate-900 transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0  focus:bg-white focus:shadow-lg'
                      />
                    </div>
                    <div className="mb-5 relative">
                      <label htmlFor="planDuration" className='text-sm block'>Plan Duration </label>
                      <div className="grid grid-cols-2 items-start gap-4">
                        <input type="number" id='planDuration' name="planDuration" placeholder="Duration"  required defaultValue={selectedPlan.planDuration}
                            className='peer w-full py-3 px-5 rounded-md bg-slate-100 text-slate-900 transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0  focus:bg-white focus:shadow-lg'
                        />
                        <select
                            name="timingParameter" defaultValue={selectedPlan.timingParameter} required
                            className='mb-2 peer w-full py-3 px-5 rounded-md  bg-slate-100 dark:text-slate-700  transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0'
                        >
                            <option value="hours">Hours</option>
                            <option value="days">Days</option>
                        </select>
                      </div>
                    </div>
                    <div className="mb-5 relative">
                      <div className="grid grid-cols-2 items-start gap-4">
                          <aside>
                            <label htmlFor="minDeposit" className='text-sm block'>Min. Deposit <small>($)</small> </label>
                            <input type="number" name="minDeposit" placeholder="Minimum Deposit" id="minDeposit" required defaultValue={selectedPlan.minDeposit}
                                className='peer w-full py-3 px-5 rounded-md bg-slate-100 text-slate-900 transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0  focus:bg-white focus:shadow-lg'
                            />
                          </aside>
                          <aside>
                            <label htmlFor="maxDeposit" className='text-sm block'>Max. Deposit <small>($)</small> </label>
                            <input type="number" name="maxDeposit" placeholder="Maximum Deposit" id="maxDeposit" required defaultValue={selectedPlan.maxDeposit}
                                className='peer w-full py-3 px-5 rounded-md bg-slate-100 text-slate-900 transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0  focus:bg-white focus:shadow-lg'
                            />
                          </aside>
                      </div>
                    </div>
                    <div className="mb-5 relative">
                      <div className="grid grid-cols-2 items-start gap-4">
                          <aside>
                            <label htmlFor="percentage" className='text-sm block'>Return Percentage <small>(%)</small> </label>
                            <input type="number" name="percentage" placeholder="Investment Percentage" id="percentage" required defaultValue={selectedPlan.percentage}
                                className='peer w-full py-3 px-5 rounded-md bg-slate-100 text-slate-900 transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0  focus:bg-white focus:shadow-lg'
                            />
                          </aside>
                          <aside>
                            <label htmlFor="referalBonus" className='text-sm block'>Refferal Bonus <small>(%)</small> </label>
                            <input type="number" name="referalBonus" placeholder="Referral Bonus" id="referalBonus" defaultValue={selectedPlan.referalBonus}
                                className='peer w-full py-3 px-5 rounded-md bg-slate-100 text-slate-900 transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0  focus:bg-white focus:shadow-lg'
                            />
                          </aside>
                      </div>
                    </div>
                    <div className="mb-5 relative">
                      <Checkbox name="returnPrincipal" id="returnPrincipal" type="checkbox" className='' defaultValue={selectedPlan.returnPrincipal} 
                          />
                      <label htmlFor="returnPrincipal" className='inline-block pl-4 text-sm'>
                          Return principal
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
                          Update Plan
                      </button>
                    </div>
                  </form>
                </aside>
              </section>
            </Modal>
        </>
  )
}

export default Plans