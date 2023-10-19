import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SnackbarContent from '@mui/material/SnackbarContent';

const action = (
  <Button color="secondary" size="small">
    Borrar Tema
  </Button>
);

export default function LongTextSnackbar() {
  return (
    <Stack spacing={2} sx={{ maxWidth: 600 }}>
     <h2>Temas registrados</h2> 
      <SnackbarContent message="Aglomeraciones en el casino" action={action} />
     
      <SnackbarContent
        message="Precio de los almuerzos"
        action={action}
      />
      <SnackbarContent
        message={
            "Alimentacion de los estudiantes"
        }
        action={action}
      />
    </Stack>
  );
}
