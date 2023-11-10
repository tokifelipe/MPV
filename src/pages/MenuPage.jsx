import React from 'react';
import NavBar from '../components/NavBar';
import AppFooter from '../components/Footer'
import { actasData } from './actasData';
import {
    useNavigate
} from 'react-router-dom';

import { Container } from 'react-bootstrap';

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

// Función para recortar el texto
const truncateText = (text) => {
    return text.length > 52 ? text.slice(0, 52) + '...' : text;
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const MenuPage = () => {
    const navigate = useNavigate();

    const verHandler = (index) => {
        navigate('/minute/'+index);
    }

    const editarHandler = (index) => {
        navigate('/edit/'+index);
    }
    
    return (
    <div className='page'>
        <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <NavBar />
        <Container fluid="md" id="menu-container">
            <Container sx={{ py: 8 }} maxWidth="md">
            <h1 className='page__title'>Reuniones Anteriores</h1>
            <Grid container spacing={4}>
                {actasData.map((acta) => (
                <Grid item key={acta.id} xs={12} sm={6} md={4}>
                    <Card
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                    >
                    <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="h2">
                        {acta.reunionTitle}
                        </Typography>
                        <Typography>
                        {acta.actaDate}
                        </Typography>
                        <Typography>
                        {truncateText(acta.resumenText)}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button 
                            className='button acta-button'
                            size="small"
                            onClick={() => verHandler(acta.id)}
                        >Ver</Button>
                        <Button 
                            className='button acta-button'
                            size="small"
                            onClick={() => editarHandler(acta.id)}
                        >Editar</Button>
                    </CardActions>
                    </Card>
                </Grid>
                ))}
            </Grid>
            </Container>
        </Container>
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