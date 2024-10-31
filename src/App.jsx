import {createBrowserRouter, createRoutesFromElements, RouterProvider ,Route} from 'react-router-dom';
import BaseLayout from './layouts/BaseLayout';
import GuestLayout from './layouts/GuestLayout';
import Index from './pages/Index';
import About from './pages/About';
import Investment from './pages/Investment';
import Contact from './pages/Contact';
import FAQs from './pages/FAQs';
import Login from './auth/Login';
import Register from './auth/Register';
import AuthenticatedLayout from './layouts/AuthenticatedLayout';
import NotFound from './pages/NotFound';
import Error from './components/Error';
import { requireAuth } from './utils/protect';
//Admin Pages
import Dashboard from './pages/Admin/Dashboard';
import Plans from './pages/Admin/Plans';
import Investments from './pages/Admin/Investments';
import Users from './pages/Admin/Users';
import Transactions from './pages/Admin/Transactions';
import Account from './pages/General/Account';
import FaqManager from './pages/Admin/FaqManager';
import PaymentOptions from './pages/Admin/PaymentOptions';
//Investor Pages
import InvestorDashboard from './pages/Investors/Dashboard'
import InvestorInvestments from './pages/Investors/Investments'
import InvestorTransactions from './pages/Investors/Transactions'
import CompleteRegistration from './pages/Investors/CompleteRegistration';
import PendingVerification from './pages/Investors/PendingVerification';


function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <>
      <Route path='/' element={<BaseLayout />}>
        <Route index element={<Index />} />
        <Route path='about_us' element={<About />} />
        <Route path='investment' element={<Investment />} />
        <Route path='contact_support' element={<Contact />} />
        <Route path='FAQs' element={<FAQs />} />
      </Route>

      <Route path='/users' element={<GuestLayout />}>
        <Route path='login' element={<Login />}></Route>
        <Route path='register' element={<Register />}></Route>
      </Route>

      <Route path='/manage' element={<AuthenticatedLayout />}   errorElement={<Error />} loader={async({request})=> await requireAuth(request)}>
        {/* Admin Related Routes */}
        <Route path='admin/dashboard' element={<Dashboard />}></Route>
        <Route path='admin/plans' element={<Plans />}></Route>
        <Route path='admin/investments' element={<Investments />}></Route>
        <Route path='admin/users' element={<Users />}></Route>
        <Route path='admin/transactions' element={<Transactions />}></Route>
        <Route path='admin/profile' element={<Account />}></Route>
        <Route path='admin/faq' element={<FaqManager />}></Route>
        <Route path='admin/payment_options' element={<PaymentOptions />}></Route>

        {/* Investor Related Routes */}
        <Route path='investor/dashboard' element={<InvestorDashboard />}></Route>
        <Route path='investor/investments' element={<InvestorInvestments />}></Route>
        <Route path='investor/transactions' element={<InvestorTransactions />}></Route>
        <Route path='investor/profile' element={<Account />}></Route>
      
      </Route>
      <Route path='complete_registration' element={<CompleteRegistration />}></Route>
      <Route path='pending_verification' element={<PendingVerification />}></Route>
      <Route path="*" element={<NotFound />} />
    
    </> 
  ))
  return (
    <RouterProvider router={router} />
  )
}

export default App
