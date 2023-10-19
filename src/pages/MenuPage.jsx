import React from 'react';
import NavBar from '../components/NavBar';
import {
    useNavigate
} from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { 
    createTheme, 
    ThemeProvider
} from '@mui/material/styles';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const MenuPage = () => {
    const navigate = useNavigate();

    const verHandler = () => {
        navigate('/home');
    }

    const editarHandler = () => {
        navigate('/edit');
    }

    return (
    <div className='page'>
        <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
    <h1 className='page__title'>Reuniones Anteriores</h1>
      <NavBar />
        <main>
            {/* Hero unit */}
            <Container sx={{ py: 8 }} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
                {cards.map((card) => (
                <Grid item key={card} xs={12} sm={6} md={4}>
                    <Card
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                    >
                
                    <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="h2">
                        Reunion sobre el estallido
                        </Typography>
                        <Typography>
                        Aqui va toda la info
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button 
                            size="small"
                            onClick={verHandler}
                        >Ver</Button>
                        <Button 
                            size="small"
                            onClick={editarHandler}
                        >Editar</Button>
                    </CardActions>
                    </Card>
                </Grid>
                ))}
            </Grid>
            </Container>
        </main>
        {/* Footer */}
        <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
            <Typography variant="h6" align="center" gutterBottom>
            DIU
            </Typography>
            <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            component="p"
            >
            Producto mínimo viable
            </Typography>
            <Copyright />
        </Box>
        {/* End footer */}
        </ThemeProvider>
    </div>
    );
}

export default MenuPage