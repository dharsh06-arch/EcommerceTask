import React from 'react'
import Header from '../../auth/admin/Header'
import Aside from '../../auth/admin/Aside'
import { Outlet } from 'react-router-dom'

const Adminlayout = () => {
  return (
   <div className="min-h-screen ">
        <Aside />
     
      <div className="flex flex-col pl-56 ">
         <Header />
        <main className="flex-1 p-6 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Adminlayout
