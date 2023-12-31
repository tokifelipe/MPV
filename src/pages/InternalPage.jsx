import React from 'react'
import { Button } from '@mui/material'
import Box from '@mui/material/Box';

import NavBar from '../components/NavBar'
import LogoUSM from '../assets/usm.png'

const InternalPage = () => {
  return (
    <div className='page'>
      <h1 className='page__title'>Frontend Sample App</h1>
      <NavBar />
      <h2>Página Interna</h2>
      <img src={LogoUSM} height={100} alt='logo usm' /><br />
      <Button variant='contained'>Material UI Button</Button>
      <Box
            sx={{
                bgcolor: 'background.paper',
                pt: 8,
                pb: 6,
            }}
      >
        kajkak
      </Box>
    </div>
  )
}

export default InternalPage
