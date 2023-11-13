import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function FormPropsTextFields() {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="on"
    >
      <div>
      <TextField
          required
          id="outlined-required"
          label="Titulo de la Reunión"
          defaultValue=""
        />
        <TextField
          required
          id="outlined-required"
          label="Campús de la Reunión"
          defaultValue=""
        />
        <TextField
          id="outlined-required"
          label="Fecha Reunión"
          type="date"
          InputLabelProps={{ shrink: true }}  
          defaultValue="12-07-2000"
        />
         <TextField
          id="outlined-required"
          label="Hora reunión"
          type="time"
          InputLabelProps={{ shrink: true }} 
          defaultValue=""
        />
        
      </div>
     
     
    </Box>
  );
}
