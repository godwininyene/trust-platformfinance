import React, {useEffect} from 'react'
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import AOS from "aos";
import 'aos/dist/aos.css';
import { Outlet } from 'react-router-dom';


export default function BaseLayout() {
  useEffect(()=>{
    AOS.init();
    // const tidioChatBox = document.getElementById('tidio-chat-iframe');
    // if(tidioChatBox){
    //   tidioChatBox.style.display = 'block';
    // }
    buildTawkChatWidget();
  })

  const buildTawkChatWidget = async()=>{
    var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
    var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
    s1.async=true;
    s1.src='https://embed.tawk.to/66a9a8a01601a2195b9e82a9/1i43bld1t';
    s1.charset='UTF-8';
    s1.setAttribute('crossorigin','*');
    s0.parentNode.insertBefore(s1,s0);
  }
  return (
    <div>
      {/* Page Header and Banner Section */}
      <section className={`bg-no-repeat bg-cover bg-center-top`} >
        <div className={`bg-dark  text-primary`}>
          <Navigation />
        </div>
      </section>
      
      {/* Page Body */}
      <main className={`min-h-screen bg-slate-200 dark:bg-slate-900`}>
        <Outlet />
      </main>

      {/* Footer Section */}
      <section>
        <Footer />
      </section>
    </div>
  )
}

