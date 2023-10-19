import React from 'react'
import { Button, Grid } from '@mui/material'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import NavBar from '../components/NavBar'
import LongTextSnackbar from '../components/LongTextSnackbar'
import FileSnackbar from '../components/FileSnackbar'
import FullWidthTextField from '../components/FullWidthTextField'
import FormPropsTextFields from '../components/FormPropsTextFields'

const divStyle = {
  display: 'flex',
  alignItems: 'center'
};
const PlanPage = () => {
  return (
    <div className='page'>
      <h1 className='page__title'>Planificación de reuniones</h1>
      <NavBar />
      
      
      <Container style={divStyle} sx={{ py: 10 }}   maxWidth="md">
        <Grid container spacing={10}>
        <h2>Ingresa Tema reunión</h2>
        <FullWidthTextField></FullWidthTextField>
        <Button sx={{ px: 5}} variant='contained'>Registrar</Button>
        <Button
          variant="contained"
          component="label"
        >
          Subir archivos
          <input
            type="file"
            hidden
          />
        </Button>
        </Grid>
        <LongTextSnackbar sx={{ py: 10 }} ></LongTextSnackbar>
        <FileSnackbar></FileSnackbar>
      
      </Container>
     

      <Container style={divStyle}  sx={{ py: 10 }}  sy={{ px: 10 }} maxWidth="md">
      <Grid container spacing={10}>
      <FormPropsTextFields></FormPropsTextFields>
      <Button variant='contained'>Ingresar Reunión </Button>
     
      </Grid>
        
        
      </Container>

    </div>
  )
}

export default PlanPage