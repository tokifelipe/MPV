import React from 'react'
import { Button } from '@mui/material'
import Box from '@mui/material/Box';

import NavBar from '../components/NavBar'
import LogoUSM from '../assets/usm.png'

const PlanPage = () => {
  return (
    <div className='page'>
      <h1 className='page__title'>Planificación de reuiones</h1>
      <NavBar />
      <h2>Planifica tu próxima Reunión</h2>
      <img src={LogoUSM} height={100} alt='logo usm' /><br />
      <Button variant='contained'>Guardar Reunión</Button>
      <Box
            sx={{
                bgcolor: 'background.paper',
                pt: 8,
                pb: 6,
            }}
      >
        Ingrese Tema reunion
      </Box>
    </div>
  )
}

export default PlanPage