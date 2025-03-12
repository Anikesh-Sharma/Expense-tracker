import React from 'react'
import ExpenseTracker from './ExpenseTracker'
import Login from './component/Login'
import { Routes, Route } from 'react-router-dom';
// import Login from './component/Login';

const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<ExpenseTracker />}/>
      <Route path='/login' element={<Login />}/>
    </Routes>

    </>
  )
}

export default App