import React from 'react'
import Header from '../../components/client/Header'
import { Outlet } from 'react-router-dom'

const Mainlayout = () => {
  return (
    <div className='w-full flex flex-col h-screen'>
        <Header/>
        <main className='flex-1'>
            <Outlet/>
        </main>
      
    </div>
  )
}

export default Mainlayout
