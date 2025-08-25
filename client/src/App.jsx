import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import ExamPage from './components/ExamPage'
import Main_paper from './components/Main_paper'

const App = () => {

  const isLogined = localStorage.getItem("Logined") === "true";

  return (
    <>
      <Routes>
        <Route path='/' element={isLogined ? <ExamPage /> : <Login />} />
        <Route path='/exampaper' element={<ExamPage />} />
        <Route path='/main_paper' element={<Main_paper />} />
      </Routes>
    </>

  )
}

export default App