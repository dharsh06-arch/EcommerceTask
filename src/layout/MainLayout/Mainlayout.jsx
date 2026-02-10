import React from 'react'
import Header from '../../components/client/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../../components/client/Footer'

const Mainlayout = () => {
  return (
    <div className='w-full flex flex-col min-h-screen'>
      <Header />
      <main className='flex-1'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Mainlayout
