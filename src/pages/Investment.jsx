import CryptoWidget from '../components/CryptoWidget';
import PageBanner from '../components/PageBanner';
import { Link } from 'react-router-dom';
import acctType from '../assets/images/acct_type.png';
import payment from '../assets/images/payment.png';
import promo from '../assets/images/promo.png';
import trading from '../assets/images/trading.png';
import { MdManageAccounts } from 'react-icons/md';
import { BsFillAwardFill, BsShieldCheck } from 'react-icons/bs';
import {useEffect, useState } from 'react';
import {FaCheckCircle} from 'react-icons/fa'
import axios from '../lib/axios';

export default function Investment({ auth }) {
    const pageHeadInfo = {
        title: 'Investment Plan',
        description: `We're building much more than just profits
        with all investments fully secured and good returns on your investments.`,
        action_caption: 'A truly profitable platform for your trading!',
    };


    const [plans, setPlans] = useState(null);
  

    const getPlans = async ()=>{
        try {
             const res = await axios.get('api/v1/plans');
             setPlans(res.data.data.plans)
         } catch (error) {
             console.log(error);
         }
    }

    useEffect(()=>{
        getPlans();
    },[]);

    const widthrawals =
        [
            {
                id:0,
                name:"Tyrnan",
                amount:"$5,200",
            },
    
            {
                id:1,
                name:"Monae",
                amount:"$4,899",
            },
    
            {
                id:2,
                name:"Vladislav",
                amount:"$500",
            },
    
            {
                id:3,
                name:"Michael-Jame",
                amount:"$3,500",
            },
    
            {
                id:4,
                name:"Yusuf",
                amount:"$3,000",
            },
    
            {
                id:5,
                name:"Esteban",
                amount:"$4,000",
            },
    
            {
                id:6,
                name:"Brian",
                amount:"$2,000",
            },
    
            {
                id:7,
                name:"Dregan",
                amount:"$2,550",
            },
    
            {
                id:8,
                name:"Woodard",
                amount:"$967",
            },
    
            {
                id:9,
                name:"Lorenz",
                amount:"$805",
            },
        ]
    ;
    

    const deposits = [
        {
            id:0,
            name:"Alexzander",
            amount:"$1,932",
        },

        {
            id:1,
            name:"Reegan",
            amount:"$787",
        },

        {
            id:2,
            name:"Michaella",
            amount:"$500",
        },

        {
            id:3,
            name:"Andreas",
            amount:"$700",
        },

        {
            id:4,
            name:"Clinto",
            amount:"$1,000",
        },

        {
            id:5,
            name:"Mark",
            amount:"$700",
        },

        {
            id:6,
            name:"Morenio",
            amount:"$2,000",
        },

        {
            id:7,
            name:"John",
            amount:"$1,600",
        },

        {
            id:8,
            name:"Marvin",
            amount:"$2,000",
        },

        {
            id:9,
            name:"Robbi",
            amount:"$1,000",
        },
    
    ]

    const[startIndex, setStartIndex] = useState(0);

    const [displayDeposits, setDisplayDeposits] = useState([]);

    const [displayWithdrawals, setDisplayWithdrawals] = useState([]);

    useEffect(() => {
        const shuffleDeposits = () => {
          const shuffled = deposits.sort(() => Math.random() - 0.5);
          const shuffledWithdrawal = widthrawals.sort(() => Math.random() - 0.5);
          setDisplayDeposits(shuffled.slice(0, 5));
          setDisplayWithdrawals(shuffledWithdrawal.slice(0,5));
        };
    
        shuffleDeposits(); // Initial shuffle
        const interval = setInterval(shuffleDeposits, 4000); // Shuffle every 5 seconds
    
        return () => clearInterval(interval); // Cleanup on component unmount
      }, []);

   
   

    return (
        <div>
            <PageBanner page={pageHeadInfo} />

          
            {/*Features Content Start */}
             <section className='py-12 lg:py-20 px-4 lg:px-0 bg-dark-light overflow-hidden'>
        	    <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                        <div className='p-3'>
                            <div className='text-center bg-dark  p-7 rounded-xl cursor-pointer service_card border-2 border-transparent' data-aos='fade-up' data-aos-duration='800'>
                                <img src={acctType} className='inline-block'/>
                                
                                <h5 className='font-semibold text-xl text-white transition-all duration-150 mt-3'>Account Types</h5>
                                <p className='mt-6 text-text-dark'>
                                    Massive Wealth offers wide range of distinct investment packages to suite people of all income class.
                                </p>

                            </div>
                        </div>

                        <div className='p-3'>
                            <div className='text-center bg-dark p-7 rounded-xl cursor-pointer service_card border-2 border-transparent'  data-aos='fade-up' data-aos-duration='900'>
                                <img src={payment} className='inline-block'/>
                                <h5 className='font-semibold text-xl transition-all duration-150 mt-3 text-white'>Payment Options</h5>
                                
                                <p className='mt-6 text-text-dark'>
                                    Cryptocurrency options for fast and easy transaction.
                                </p>

                            </div>
                        </div>
                        
                        <div className='p-3'>
                            <div className='text-center bg-dark p-7 rounded-xl cursor-pointer service_card border-2 border-transparent'  data-aos='fade-up' data-aos-duration='1000'>
                                <img src={promo} className='inline-block'/>
                                <h5 className='font-semibold text-xl transition-all duration-150 mt-3 text-white'>Promotions/Bonus</h5>
                                <p className='mt-6 text-text-dark'>
                                    Our frequent bonuses and loyalty program is for everyone to enjoy little extra!
                                </p>

                            </div>
                        </div>

                        <div className='p-3'>
                            <div className='text-center bg-dark p-7 rounded-xl cursor-pointer service_card border-2 border-transparent'  data-aos='fade-up' data-aos-duration='1100'>
                                <img src={trading} className='inline-block'/>
                                <h5 className='font-semibold text-xl transition-all duration-150 mt-3 text-white'>Trading Instruments</h5>
                                <p className='mt-6 text-text-dark'>
                                Our auto-trading cover wide range of market.
                                </p>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
           {/*Features Content End */}


          {/*plan Content Start */}
            <section className='py-12 lg:py-24 bg-dark px-4 lg:px-0'>
                <div className='max-w-6xl mb-5 mx-auto dark:text-white'  data-aos="fade-up" data-aos-delay="150">
                    <h2 className='text-center uppercase text-3xl md:text-4xl font-black text-white'>Our <span className='text-primary'>Investment</span> Plans</h2>
                    <p className='text-center text-text-dark text-xl mt-3 mb-10 md:mb-20 w-[70%] ml-[15%] '>
                        We provide top-tier investment plans with swift returns and complete security.
                        All investments are fully insured for your peace of mind.
                    </p>
                </div>
                <div className="max-w-6xl mx-auto">
                  

                     <div className='gap-x-5 gap-y-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>

                       {
                        plans && plans.map((plan, i)=>(
                            <div key={plan.id} className='mt-2'>
                            <div className='h-full bg-dark rrelative border-[3px] border-primary rounded-xl px-5 pb-3' data-aos="flip-left" data-aos-easing="ease-out-cubic">
                                <div className='h-16 w-16 rounded-full border-[3px] border-primary mx-auto flex items-center justify-center text-4xl font-black bg-white relative -top-10'>{i + 1}</div>
                                <div className="w-12 h-12 rounded-full border-[3px] border-primary  bg-white text-black   mx-auto flex items-center justify-center text-2xl p-7 font-black relative -top-14 left-5">{plan.percentage}%</div>
                                <div className='pb-3 px-2'>
                                    <h3 className='uppercase text-xl font-semibold text-white'>
                                        {plan.name}
                                    </h3>
                                    <h3 className='uppercase text-2xl font-semibold mb-5 text-primary'>
                                        After {plan.planDuration + " "+ plan.timingParameter}
                                    </h3>
                                
                                    <div className='flex mb-5' data-aos="fade-up" data-aos-delay="200" data-aos-duration="500">
                                        <div className='flex-shrink-0 mr-2 items-center'>
                                            <FaCheckCircle className='text-primary text-2xl'/>
                                        </div>
                                        <div className=''>
                                            <div className=''>
                                                <small className='text-lg text-white  block'>Minimum Deposit - ${plan.minDeposit.toLocaleString()}</small>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='flex mb-5' data-aos="fade-up" data-aos-delay="200" data-aos-duration="500">
                                        <div className='flex-shrink-0 mr-2 items-center'>
                                            <FaCheckCircle className='text-primary text-2xl'/>
                                        </div>
                                        <div className=''>
                                            <div className=''>
                                                <small className='text-lg text-white  block'>Maximum Deposit - ${plan.maxDeposit.toLocaleString()}</small>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='flex mb-5' data-aos="fade-up" data-aos-delay="200" data-aos-duration="500">
                                        <div className='flex-shrink-0 mr-2 items-center'>
                                            <FaCheckCircle className='text-primary text-2xl'/>
                                        </div>
                                        <div className=''>
                                            <div className=''>
                                                <small className='text-lg text-white  block'>Referral Bonus - {plan.referalBonus}%</small>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='flex mb-5' data-aos="fade-up" data-aos-delay="200" data-aos-duration="500">
                                        <div className='flex-shrink-0 mr-2 items-center'>
                                            <FaCheckCircle className='text-primary text-2xl'/>
                                        </div>
                                        <div className=''>
                                            <div className=''>
                                                <small className='text-lg text-white  block'>Principal Return -  {plan.returnPrincipal ? 'Yes' : 'No'}</small>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className='px-2 pb-4'>
                                    <Link to='/users/register' className={`text-primary w-full inline-block text-center font-semibold border ${plan.name =='Gold' ? 'bg-primary text-white hover:bg-transparent hover:text-primary' : 'bg-transparent'} border-primary rounded-lg py-4 px-8 transition-all duration-300 hover:bg-primary hover:text-black`}>Get Started</Link>
                                </div>
                            </div>
                        </div>
                        ))
                       }

                    </div>
                </div>
            </section>
          {/*plan Content End */}

           {/* Section Last Transaction Start  */}
           <section className='py-12 lg:py-24 bg-dark-light  px-4 lg:px-0'>
                <div className='max-w-6xl mb-5 mx-auto dark:text-white'  data-aos="fade-up" data-aos-delay="150">
                    <h2 className='text-center uppercase text-3xl md:text-4xl font-black text-white'><span className='text-primary'>Deposits</span> and <span className='text-primary'>Withdrawal</span></h2>
                    <p className='text-center text-text-dark text-xl mt-3 mb-10 md:mb-20 w-[70%] ml-[15%] '>
                        We offer accurate statistics that anyone can verify.
                        Below, you'll find the most recent five deposit and withdrawal
                        transactions completed by our members.
                    </p>
                </div>

                <div className="max-w-6xl mx-auto">
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>

                        <div className='bg-dark px-4 py-3 rounded-md'>
                            <h1 className="text-lg font-semibold mb-4 border-b text-primary">
                                Recent Deposits
                            </h1>

                            {
                                displayDeposits.map((item, i)=>(
                                    <div key={item.id} className='flex items-center my-7 border-b pb-2'>
                                        <div className='h-10 w-10 rounded-full border-[3px] border-primary flex items-center justify-center text-xl font-black bg-white'>{i + 1}</div>
                                        <div className='text-white px-5 py-2 bg-dark-light ml-auto'>{item.name}</div>
                                        <div className='text-white px-5 py-2 bg-dark-light ml-auto'>{item.amount}</div>
                                    </div>
                                ))
                            }


                        </div>

                        <div className='bg-dark px-4 py-3 rounded-md'>
                            <h1 className="text-lg font-semibold mb-4 border-b text-primary">
                                Recent Withdrawals
                            </h1>

                            {
                                displayWithdrawals.map((item,i)=>(
                                    <div key={item.id} className='flex items-center my-7 border-b pb-2'>
                                        <div className='h-10 w-10 rounded-full border-[3px] border-primary flex items-center justify-center text-xl font-black bg-white'>{i + 1}</div>
                                        <div className='text-white px-5 py-2 bg-dark-light ml-auto'>{item.name}</div>
                                        <div className='text-white px-5 py-2 bg-dark-light ml-auto'>{item.amount}</div>
                                    </div>
                                ))
                            }

                        </div>
                    </div>

                </div>
            </section>
            {/* Section Last Transaction End  */}


          {/*Security Content Start */}
          <section className='py-12 lg:py-24 bg-dark-light  px-4 lg:px-0' >
                <div className='max-w-6xl mx-auto text-white'  data-aos="fade-up" data-aos-delay="150">
                    <h2 className='text-center uppercase text-3xl md:text-3xl font-black max-w-[600px] mx-auto'>maintaining the security of our <span className='text-primary'>clients' funds.</span></h2>
                    <p className='text-center text-xl text-text-dark mt-3 mb-10 md:mb-20 w-[70%] ml-[15%] '>
                        We deposit clients' fund into segregated accounts with leading global Tier 1 banks. 
                        With our risk management program in place,
                        we will always keep our clients’ funds safe.
                    </p>
                </div>
                <div className="max-w-6xl mx-auto">
                    <div className=" my-6 grid grid-cols-1  lg:grid-cols-3 gap-2">

                        <div className="mx-4 md:mx-0">
                            <div data-aos="fade-up" data-aos-delay="150" className="h-full rounded-md px-4 py-4 md:border-b">
                                <div className="text-center">
                                 
                                    {/* <img src={globe} className='inline-block'/> */}
                                    <MdManageAccounts className='text-7xl text-slate-500 inline-block' />
                                    <h2 className="my-1 font-semibold text-white text-lg uppercase">ISOLATED CLIENT FUNDS ACCOUNT</h2>
                                   
                                    <p className="text-text-dark">
                                        All client funds are deposited and secured in a isolated account, 
                                        completely separate from the company's operational account.
                                        The company cannot access these funds for its own use under any circumstances.
                                        Client funds are stored safely and separately in reputable banking institutions worldwide.
                                    </p>

                                </div>
                            </div>
                        </div>

                        <div className="mx-4 md:mx-0">
                            <div data-aos="fade-up" data-aos-delay="150" className="h-full rounded-md px-4 py-4  md:border-b">
                                <div className="text-center">
                                    <BsShieldCheck  className='text-7xl text-slate-500 inline-block'/>
                                    <h2 className="my-1 font-semibold  text-white text-lg uppercase">INVESTOR COMPENSATION FUND PROTECTION</h2>
                                   
                                    <p className="text-text-dark">
                                        Our clients are eligible for compensation for claims arising from a Fund member's 
                                        inability or failure to meet its financial obligations.
                                        The security of claims depends on various factors, so please check the eligibility requirements for securing claims.
                                    </p>

                                </div>
                            </div>
                        </div>

                        <div className="mx-4 md:mx-0">
                            <div data-aos="fade-up" data-aos-delay="150" className="h-full rounded-md px-4 py-4  border-b">
                                <div className="text-center">
                                    <BsFillAwardFill className='text-7xl text-slate-500 inline-block'/>
                                    <h2 className="my-1 font-semibold text-white text-lg uppercase">LFSA Regulatory Standards</h2>
                                   
                                    <p className="text-text-dark">
                                        Trust Platform is a licensed broker regulated by the Labuan Financial Services
                                        Authority (Labuan FSA). We rigorously submit all financial reports to the LFSA and
                                        adhere to their strict standards. The LFSA Malaysia money broking license uniquely approves the STP-only business model.
                                    </p>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </section>
          {/*Security Content End */}
        </div>
    );
}
