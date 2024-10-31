import Modal from '../../components/CustomModal';
import LoadingIndicator from '../../components/LoadingIndicator';
import { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import {BiQuestionMark, BiSave, BiTrash} from 'react-icons/bi';
import { MdAddCircleOutline } from 'react-icons/md';
import axios from '../../lib/axios';

const FaqManager = () => {
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loadingPlans, setLoadOptionState] = useState(false);
  const [questionsList, loadQuestions] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState();
  const [editModal, setEditModal] = useState(false);
  const [ID, setID] = useState(null);
  const toggleID = ID=>setID(prevID=> prevID == null ? ID :null)

  useEffect(() => {
    fetchFaqs();
  }, [])

  let fetchFaqs = async () => {
    setLoadOptionState(true);
    await axios.get('api/v1/faqs')
    .then((res) => {
      setLoadOptionState(false);
      setFetched(true);
      loadQuestions(res.data.data.faqs);
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
    await axios.post('api/v1/faqs', form)
    .then((res) => {
      setProcessing(false);
      loadQuestions(prev => [res.data.data.faq, ...prev ]);
      e.target.reset();
    })
    .catch((err) => {
      setProcessing(false);
      setErrors(err.response.data.errors);
    });
  }



  let deleteFaq = async (id) => {
    setDeleting(true);
    try {
      const response = await axios.delete(`api/v1/faqs/${id}`);
      if (response.status === 204) {
        // Update the questions state to exclude the deleted question
        loadQuestions(questions => questions.filter(el => el._id !== id));
        alert("Faq was deleted successfully!");
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
    //             <BsQuestionCircle className={`h-5 w-5`} /> <span> Manage FAQs </span>
    //         </h2>}
    //     >
    //       <Head title="Investment Plans" />
        <>
            <section>
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 max-w-5xl">
                <aside className='col-span-2 bg-white dark:bg-slate-700 px-4 py-3 rounded-md'>
                    <h1 className="text-lg font-semibold mb-4 border-b">
                        Add New Question
                    </h1>
                    <form method="post" onSubmit={submit} encType="multipart/form-data">
                        <div className="mb-5 relative">
                            <label htmlFor="question" className='text-sm block'> Question </label>
                            <input type="text" name="question" placeholder="Enter a question"  required
                                className='peer w-full py-3 px-5 rounded-md bg-slate-100 text-slate-900 transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0  focus:bg-white focus:shadow-lg'
                            />
                        </div>
                        <div className="mb-5 relative">
                            <label htmlFor="answer" className='text-sm block'> Corresponding Answer </label>
                            <textarea rows={6} type="text" name="answer" placeholder="Answer the question"  required
                                className='peer w-full py-3 px-5 rounded-md bg-slate-100 text-slate-900 transition-all duration-300 border-0 border-b-[3px] border-b-transparent focus:border-b-primary focus:outline-0 focus:ring-0  focus:bg-white focus:shadow-lg'
                            />
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
                            <button className='w-full inline-flex gap-2 justify-center items-center bg-primary hover:bg-green-700  rounded-md font-semibold px-2 py-3 transition-all duration-300 ease-in  text-white'>
                                {processing ? <LoadingIndicator size={5} />  : <BiSave className="w-6 h-6"  /> }
                                Save  FAQ
                            </button>
                        </div>
                    </form>
                </aside>
                <aside className='col-span-3 bg-white dark:bg-slate-700 px-4 py-1 pb-3 rounded-md'>
                  <h2 className="py-2 mb-4 border-b font-semibold flex justify-between items-center">
                      <span className="flex gap-2 items-center"> <BiQuestionMark className="w-6 h-6 inline-block" /> Frequently Asked Questions  </span>
                  </h2>
                  <div className="overflow-x-auto">
                    {/* Cards */}
                    <div className=''>
                        {
                            questionsList.map((question, i)=>(
                            <div key={question._id} className={`${i==0 ? 'border-b-0' : 'border-b'} border-b-slate-400 border-t border-t-slate-300 px-4`}>
                                <div className='py-5 relative cursor-pointer flex justify-between w-full'>
                                    <h3 className='text-xl font-bold dark:text-white flex-grow' role='button' onClick={()=>toggleID(question._id)}>{question.question}</h3>
                                    <button onClick={()=>toggleID(question._id)}>
                                    {
                                        (ID !== question._id)?(
                                            <MdAddCircleOutline className='h-8 w-8 text-primary m-auto'/>
                                        ):(
                                            <AiOutlineClose className='h-7 w-7 text-primary m-auto'/>
                                        )
                                    }
                                    </button>
                                    <button className="px-3 py-1" onClick={()=> {deleteFaq(question._id); setSelectedFaq(question)}}>
                                        {(deleting && selectedFaq._id == question._id) ? <LoadingIndicator size={8} /> : <BiTrash className='h-8 w-8 text-primary m-auto'/> }
                                    </button>
                                </div>
                                <div className={`${ID == question._id ? 'block': 'hidden'}`}>
                                    <div className='pb-5'>
                                        <p className='text-slate-500 dark:text-white'>
                                           {question.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            ))
                        }
                    </div>
                  </div>
                </aside>
              </div>
            </section>

            <Modal show={editModal} maxWidth="sm" onClose={() => setEditModal(false)} backDrop={false}>
             
            </Modal>
    </>
  )
}

export default FaqManager