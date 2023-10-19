import React from 'react'
import { Button } from '@mui/material'
import NavBar from '../components/NavBar'

const HomePage = () => {
  return (
    <div className='page'>
      <h1 className='page__title'>Frontend Sample App</h1>
      <NavBar />
      <h2>Página de Inicio</h2>
      <Button variant='contained'>Planificar Reunión</Button>
    </div>
  )
}

export default HomePage
