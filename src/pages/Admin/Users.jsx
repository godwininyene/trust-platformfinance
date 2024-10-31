import {FaUserClock} from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import { BsGenderAmbiguous, BsListStars, BsTrash3 } from 'react-icons/bs';
import {BiGlobeAlt, BiGridAlt, BiMapPin, BiPhone, BiPlug, BiTrashAlt, BiUserCheck } from 'react-icons/bi';
import { RiExchangeFundsLine} from 'react-icons/ri';
import LoadingIndicator from '../../components/LoadingIndicator';
import defaulAvatar from '../../assets/images/default.png';
import coverImage from '../../assets/images/forex.jpeg';
import { IoEye } from 'react-icons/io5';
import { FaUserTimes } from 'react-icons/fa';
import Modal from '../../components/CustomModal';
import FundAccount from './FundAccount';
import axios from '../../lib/axios';
// import Pagination from '@/Components/Pagination';

export default function Users() {
    const [displayStyle, setDisplayStyle] = useState('list');
    const [currentScreen, setCurrentScreen] = useState('users_list');
    const [fetched, setFetched] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [userModal, setUserModal] = useState(false);
    const [users, loadUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [pagination, setPagination] = useState();
    useEffect(() => {
        fetchUsers();
    }, [])

    const fetchUsers = async () => {
        setProcessing(true);
        await axios.get('api/v1/users')
        .then((res) => {
          
            if(res.data.status = 'success'){
                loadUsers(res.data.data.users);
                // setPagination(res.data.body.users)
                setFetched(true);
                setProcessing(false);
            }
        })
        .catch((error) => {
            setFetched(true);
            setProcessing(false);
            console.log(error.response.data.message);
        })
    };

    const updateUserInList = (user, action="update") => {
        let clients = [...users];
        clients.forEach((client, index) =>{
            if(client._id === user._id){
                if(action === "delete"){
                    clients.splice(index, 1);
                }else{
                    // replace existing clients record with user record
                    clients[index] = user;
                }
            }
        })
        loadUsers(clients);
    };


    const updateAccountStatus = async (status, user) => {
        const data ={status}
        try {
            setUpdating(true);
            const res = await axios.patch(`api/v1/users/${user._id}/status`, data );
            if (res.data.status === 'success') {
                setSelectedUser(res.data.data.user);
                updateUserInList(res.data.data.user);
            }
        } catch (error) {
            if (error.response) {
                alert(error.response.data.message);
            }
            console.log(error.response?.data || error.message);
        } finally {
            setUpdating(false);
        }
    };
    

    const deleteUsers = async (user) => {
        alert("Not yet working")
        // setDeleting(true);
        // await axios.post(route('api.delete_user'), {user_id: user.id})
        // .then((res) => {
        //     console.log(res.data)
        //     if(res.data.success){
        //         alert(res.data.message)
        //         setUserModal(false)
        //         updateUserInList(res.data.body.user, 'delete');
        //         setDeleting(false);
        //     }
        // })
        // .catch((error) => {
        //     setDeleting(false);
        //     console.log(error.response.data.message);
        // })
    };

    const paginateResult = (data)=>{
        setPagination(data.body.users)
        loadUsers(data.body.users.data);
    }
    
    
    return (
        // <AuthenticatedLayout
        //     user={auth.user}
        //     header={<h2 className="font-semibold text-xl leading-tight flex items-center gap-2">
        //         <FaUsers className={`h-5 w-5`} /> <span> Users Account</span>
        //     </h2>}
        // >
        <>
            {/* Show Default User List Page */}
            {currentScreen === 'users_list' && <>
                {/* <Head title="Manage Users Account" /> */}

                <h1 className="flex gap-1 items-center font-bold mb-4">
                    <span>
                        Display Style: 
                    </span>
                    <button className="px-1 rounded-lg" onClick={() => setDisplayStyle((prev) => prev == "list" ? "grid":"list")}>
                        {(displayStyle == "list") ? <BsListStars className="h-7 w-7 font-bold" /> : <BiGridAlt className="h-7 w-7 font-bold" />}
                    </button>
                </h1>

                {/* Users Display Table and Grid */}
                <section>
                    {(displayStyle == "list") ? <>
                        {/* Display style List:Table */}
                        <aside>
                            <div className="overflow-x-auto">
                                <table className="w-full table border-collapse bg-white dark:bg-slate-700 rounded-md overflow-hidden shadow-md">
                                    <thead className="bg-primary dark:bg-primaryLight text-white text-left">
                                        <tr>
                                            <th className="w-16 py-1 px-3">
                                            </th>
                                            <th className="py-1 px-3">Fullname</th>
                                            <th className="py-1 px-3">Email</th>
                                            <th className="py-1 px-3 whitespace-nowrap">Wallet Bal.</th>
                                            <th className="py-1 px-3">status </th>
                                            <th className="py-1 px-3"></th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                    { (processing || !fetched) && (<tr>
                                            <td colSpan={6} className="shadow-md py-6 h-32 animate-pulse text-center">
                                                <LoadingIndicator type='dots' size={10} />
                                            </td>
                                        </tr>)}

                                    { users.length > 0 && users.map(user => (
                                        <tr key={user.id} >
                                            <td className="w-16 py-2 px-3">
                                                <span>
                                                    <img src={(user.photo && user.photo != 'default.png') ? user.photo : defaulAvatar} alt=" " className={`bg-slate-300 h-10 w-10 rounded-full overflow-hidden`} />
                                                </span>
                                            </td>
                                            <td className=" py-2 px-3 whitespace-nowrap">{ user.name}</td>
                                            <td className=" py-2 px-3 whitespace-nowrap">{ user.email }</td>
                                            <td className=" py-2 px-3 whitespace-nowrap">${ user?.wallet[0].balance.toLocaleString()}</td>
                                            <td className=" py-2 px-3 whitespace-nowrap">
                                                {(user.approvalStatus == 'approved') && (<span className="text-xs flex items-center gap-1">
                                                    <div className="h-3 w-3 rounded-full bg-green-400 inline-block"></div> Active
                                                </span>)}
                                                {(user.approvalStatus == 'denied') && (<span className="text-xs flex items-center gap-1">
                                                    <div className="h-3 w-3 rounded-full bg-red-400 inline-block"></div> Denied
                                                </span>)}
                                                {(user.approvalStatus == 'pending') && (<span className="text-xs flex items-center gap-1">
                                                    <div className="h-3 w-3 rounded-full bg-orange-400 inline-block"></div> Pending
                                                </span>)}
                                                {(user.approvalStatus == 'deactivated') && (<span className="text-xs flex items-center gap-1">
                                                    <div className="h-3 w-3 rounded-full bg-red-400 inline-block"></div> Deactivated
                                                </span>)}
                                            </td>
                                            <td className=" py-2 px-3 whitespace-nowrap flex items-center gap-2">
                                                { (user.approvalStatus == 'pending') ? (<>
                                                    {/* Pedding Icon */}
                                                    <button className="py-1 text-orange-500"  onClick={()=> {updateAccountStatus('approve', user); setSelectedUser(user);}}>
                                                        {(updating && user.id == selectedUser.id) ? <LoadingIndicator size={6} /> : <FaUserClock className="h-6 w-6" /> }
                                                    </button>
                                                </>) : (user.approvalStatus == 'approved') ? (<>
                                                    {/* Approved Icon */}
                                                    <button className="py-1 text-green-500" onClick={()=> {updateAccountStatus('deactivate', user); setSelectedUser(user);}}>
                                                        {(updating && user.id == selectedUser.id) ? <LoadingIndicator size={6} /> : <BiUserCheck className="h-6 w-6" /> }
                                                    </button>
                                                </>) : (<>
                                                    {/* Denied Icon */}
                                                    <button className="py-1 text-red-500" onClick={()=> {updateAccountStatus('approve', user); setSelectedUser(user);}}>
                                                        {(updating && user.id == selectedUser.id) ? <LoadingIndicator size={6} /> : <FaUserTimes className="h-6 w-6" /> }
                                                    </button>
                                                </>)}
                                                <button className="py-1 text-blue-500" onClick={() => { setSelectedUser(user); setUserModal(true)}}>
                                                    <IoEye className="h-6 w-7" />
                                                </button>
                                                <button className="py-1 text-red-500" onClick={()=> deleteUsers(user)}>
                                                    {deleting ? <LoadingIndicator size={6} /> : <BiTrashAlt  className="h-6 w-6"  /> }
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </aside>
                    </> : <>
                        {/* Display style Grid:Cards */}
                        <aside>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            { users.length > 0 && users.map(user => (
                                <div key={user.id} className="bg-white dark:bg-slate-700 shadow rounded-md">
                                    <div className="min-h-[150px] bg-cover rounded-t-md" style={{backgroundImage: `url(${coverImage})`}}>

                                    </div>
                                    <div>
                                        <span className="mx-auto h-32 w-32 block -mt-20">
                                            <img src={(user.photo && user.photo != 'default.png') ? user.photo : defaulAvatar} alt=" " className={`bg-slate-300 h-32 w-32 rounded-full overflow-hidden`} />
                                        </span>
                                        <section className="px-4 py-3 text-center">
                                            <h1 className="text-xl font-bold" role="button" onClick={() => { setSelectedUser(user); setUserModal(true)}}>
                                                { user.name}
                                            </h1>
                                            <p className="text-sm font-semibold" role="button" onClick={() => { setSelectedUser(user); setUserModal(true)}}>
                                                { user.email }
                                            </p>
                                            <p className="text-sm capitalize" role="button" onClick={() => { setSelectedUser(user); setUserModal(true)}}>
                                                Status: 
                                                <span className={`ml-2 font-bold ${(user.approvalStatus == 'pending') ? 'text-orange-500' : (user.approvalStatus == 'approved') ? 'text-green-500' : 'text-red-500'}`}>
                                                    {user.approvalStatus}
                                                </span>
                                            </p>
                                            <div className="grid grid-cols-3 mt-6 border-y pb-1 pt-2 divide-x">
                                                {/* Action */}
                                               
                                               
                                                <aside>
                                                    <h6>Balance</h6>
                                                    ${user.wallet[0]?.balance.toLocaleString()}
                                                </aside>
                                                {/* Fund */}
                                                <aside>
                                                    <h6>Profit</h6>
                                                    ${user.wallet[0]?.profit.toLocaleString()}
                                                </aside>
                                                {/* Delete Account */}
                                                <aside>
                                                    <h6>Referral Bal.</h6>
                                                    ${user.wallet[0]?.referralBalance.toLocaleString()}
                                                </aside>
                                                            
                                                
                                            </div>
                                            <div className="grid grid-cols-3 border-y pb-1 pt-2 divide-x">
                                                {/* Action */}
                                                <aside>
                                                    { (user.approvalStatus == 'approved') ? (<>
                                                            {/* Pedding Icon */}
                                                            <button className="bg-red-500 text-white py-1 px-2 rounded-sm block mx-auto" onClick={()=> updateAccountStatus('deactivate', user)}>
                                                                {updating ? <LoadingIndicator size={6} /> : <BiPlug  className="h-6 w-6"  /> }
                                                            </button>
                                                            <span className="capitallize">
                                                                De-Activate
                                                            </span>
                                                        </>) : (<>
                                                            {/* Approved Icon */}
                                                            <button className="bg-green-500 text-white py-1 px-2 rounded-sm block mx-auto" onClick={()=> updateAccountStatus('activate', user)}>
                                                                {updating ? <LoadingIndicator size={6} /> : <BiUserCheck  className="h-6 w-6"  /> }
                                                            </button>
                                                            <span className="capitallize">
                                                                Activate
                                                            </span>
                                                        </>)}
                                                </aside>
                                                {/* Fund */}
                                                <aside>
                                                { (user.approvalStatus == 'pending') ? (<>
                                                        {/* Deny Icon */}
                                                        <button className="bg-red-500 text-white py-1 px-2 rounded-sm block mx-auto" onClick={()=> updateAccountStatus('deactivate', user)}>
                                                            {updating ? <LoadingIndicator size={6} /> : <FaUserTimes  className="h-6 w-6"  /> }
                                                        </button>
                                                        <span className="capitallize">
                                                            Deny Access
                                                        </span>
                                                        </>) : (<>
                                                            {/* Fund Icon */}
                                                        <button className="bg-blue-500 text-white py-1 px-2 rounded-sm block mx-auto" onClick={() => { setSelectedUser(user); setCurrentScreen('fund_user'); setUserModal(false)}}>
                                                            <RiExchangeFundsLine  className="h-6 w-6"  />
                                                        </button>
                                                        <span className="capitallize">
                                                            Fund
                                                        </span>
                                                    </>)}
                                                </aside>
                                                {/* Delete Account */}
                                                <aside>
                                                    <button className="bg-red-500 text-white py-1 px-2 rounded-sm block mx-auto" onClick={()=> deleteUsers(user)}>
                                                        {deleting ? <LoadingIndicator size={6} /> : <BsTrash3  className="h-6 w-6"  /> }
                                                    </button>
                                                    <span className="capitallize">
                                                        Delete
                                                    </span>
                                                </aside>
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            )) }
                            </div>
                        </aside>
                    </>}
                </section>

                {/* {pagination && <div className="mt-3 flex justify-end">
                    <Pagination pageLimit={pagination.per_page} totalRecords={pagination.total} links={pagination.links} onPageResponse={(data) => paginateResult(data)} />
                </div>} */}


                <Modal show={userModal} maxWidth="sm" onClose={() => setUserModal(false)} backDrop={false}>
                    {/* User Card */}
                    <div className="bg-white dark:bg-slate-700 dark:text-slate-200 rounded-md">
                        <div className="min-h-[150px] bg-cover md:rounded-t-md" style={{backgroundImage: `url(${coverImage})`}}>

                        </div>
                        { selectedUser !== null && (<>
                            <div>
                                <span className="mx-auto h-32 w-32 block -mt-20">
                                    <img src={(selectedUser.photo && selectedUser.photo != 'default.png') ? selectedUser.photo : defaulAvatar} alt=" " className={`bg-slate-300 h-32 w-32 rounded-full overflow-hidden`} />
                                </span>
                                <section className="px-4 pt-3 text-center">
                                    <h1 className="text-xl font-bold">
                                        { selectedUser.name }
                                    </h1>
                                    <p className="text-sm font-semibold text-primary">
                                        { selectedUser.email }
                                    </p>
                                    <p className="text-sm capitalize">
                                        Status: 
                                        <span className={`ml-2 font-bold ${(selectedUser.approvalStatus == 'pending') ? 'text-orange-500' : (selectedUser.approvalStatus== 'approved') ? 'text-green-500' : 'text-red-500'}`}>
                                            {selectedUser.approvalStatus}
                                        </span>
                                    </p>
                                    <div className="grid grid-cols-3 mt-2 border-y pb-1 pt-2 divide-x">
                                        {/* Action */}
                                        <aside>
                                            { (selectedUser.approvalStatus == 'approved') ? (<>
                                                    {/* Pedding Icon */}
                                                    <button className="bg-red-500 text-white py-1 px-2 rounded-sm block mx-auto" onClick={()=> updateAccountStatus('deactivate', selectedUser)}>
                                                        {updating ? <LoadingIndicator size={6} /> : <BiPlug  className="h-6 w-6"  /> }
                                                    </button>
                                                    <span className="capitallize">
                                                        De-Activate
                                                    </span>
                                                </>) : (<>
                                                    {/* Approved Icon */}
                                                    <button className="bg-green-500 text-white py-1 px-2 rounded-sm block mx-auto" onClick={()=> updateAccountStatus('approve', selectedUser)}>
                                                        {updating ? <LoadingIndicator size={6} /> : <BiUserCheck  className="h-6 w-6"  /> }
                                                    </button>
                                                    <span className="capitallize">
                                                        Activate
                                                    </span>
                                                </>)}
                                        </aside>
                                        {/* Fund */}
                                        <aside>
                                        { (selectedUser.approvalStatus == 'pending') ? (<>
                                                {/* Deny Icon */}
                                                <button className="bg-red-500 text-white py-1 px-2 rounded-sm block mx-auto" onClick={()=> updateAccountStatus('deny', selectedUser)}>
                                                    {updating ? <LoadingIndicator size={6} /> : <FaUserTimes  className="h-6 w-6"  /> }
                                                </button>
                                                <span className="capitallize">
                                                    Deny Access
                                                </span>
                                                </>) : (<>
                                                    {/* Fund Icon */}
                                                    
                                                <button className="bg-blue-500 text-white py-1 px-2 rounded-sm block mx-auto" onClick={() => {setCurrentScreen('fund_user'); setUserModal(false)}}>
                                                    <RiExchangeFundsLine  className="h-6 w-6"  />
                                                </button>
                                                <span className="capitallize">
                                                    Fund
                                                </span>
                                            </>)}
                                        </aside>
                                        {/* Delete Account */}
                                        <aside>
                                            <button className="bg-red-500 text-white py-1 px-2 rounded-sm block mx-auto" onClick={()=> deleteUsers(selectedUser)}>
                                                {deleting ? <LoadingIndicator size={6} /> : <BsTrash3  className="h-6 w-6"  /> }
                                            </button>
                                            <span className="capitallize">
                                                Delete
                                            </span>
                                        </aside>
                                    </div>
                                </section>
                                {/* User Information */}
                                <section className="text-left">
                                    <h2 className="py-2 px-4 font-semibold border-b bg-primary bg-opacity-20">
                                        More about {selectedUser.name}
                                    </h2>
                                    <ul className="px-4 pt-1 pb-3 grid md:grid-cols-2 gap-4">
                                        <li className="flex items-center gap-3 text-sm">
                                            <span>
                                                <BiPhone className="w-6 h-6" />
                                            </span>
                                            <div>
                                                <h3 className="font-semibold">
                                                    Phone Number
                                                </h3>
                                                <span>
                                                    {selectedUser.phone}
                                                </span>
                                            </div>
                                        </li>
                                        <li className="flex items-center gap-3 text-sm">
                                            <span>
                                                <BiGlobeAlt className="w-6 h-6" />
                                            </span>
                                            <div>
                                                <h3 className="font-semibold">
                                                    Country
                                                </h3>
                                                <span>
                                                    {selectedUser.country}
                                                </span>
                                            </div>
                                        </li>
                                        <li className="flex items-center gap-3 text-sm">
                                            <span>
                                                <BiMapPin className="w-6 h-6" />
                                            </span>
                                            <div>
                                                <h3 className="font-semibold">
                                                    Address
                                                </h3>
                                                <span>
                                                    {selectedUser.address}
                                                </span>
                                            </div>
                                        </li>
                                        <li className="flex items-center gap-3 text-sm">
                                            <span>
                                                <BsGenderAmbiguous className="w-6 h-6" />
                                            </span>
                                            <div>
                                                <h3 className="font-semibold">
                                                    Gender
                                                </h3>
                                                <span>
                                                    {selectedUser.gender}
                                                </span>
                                            </div>
                                        </li>
                                    </ul>
                                </section>
                            </div>
                        </>)}
                    </div>
                </Modal>
            </>}
            
            {/* Show Fund User Page start here*/}
            {currentScreen === 'fund_user' && <>

                {/* <Head title="Fund User Account" /> */}

                <FundAccount user={selectedUser} onBack={() => setCurrentScreen('users_list')} onFunded={(user) => {setSelectedUser(user); updateUserInList(user)}} />
            
            </>}
            
        </>
    );
}
