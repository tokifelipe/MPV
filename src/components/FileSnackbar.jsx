import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SnackbarContent from '@mui/material/SnackbarContent';

const action = (
  <Button color="secondary" size="small">
    Borrar Archivo
  </Button>
);

export default function FileSnackbar() {
  return (
    <Stack spacing={2} sx={{ maxWidth: 600 }}>
        <h2>Archivos subidos</h2> 
      <SnackbarContent message="Cantidad_alumnos.txt" action={action} />
     
      <SnackbarContent
        message="honorarios.pdf"
        action={action}
      />
      <SnackbarContent
        message={
            "estudiantes.pdf"
        }
        action={action}
      />
    </Stack>
  );
}
