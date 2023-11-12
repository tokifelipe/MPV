import React from 'react'
import { Button } from '@mui/material'
import NavBar from '../components/NavBar'

const HomePage = () => {
  return (
    <div className='page'>
      <NavBar />
      <h1 className='page__title'>Planificador de Actas</h1>
      <h2>Página de Inicio</h2>
    </div>
  )
}

export default HomePage
