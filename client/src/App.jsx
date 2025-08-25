import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import ExamPage from './components/ExamPage'

const App = () => {

  const isLogined = localStorage.getItem("Logined") === "true";

  return (
    <>
      <Routes>
        <Route path='/' element={isLogined ? <ExamPage /> : <Login />} />
        <Route path='/exampaper' element={<ExamPage />} />
      </Routes>
    </>

  )
}

export default App