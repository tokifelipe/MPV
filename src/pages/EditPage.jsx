import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { actasData } from './actasData';

import { 
    TextField,
    Button,
    Grid, 
    Container,
    Box
} from '@mui/material';

const EditPage = () => {
    const { value } = useParams();
    const navigate = useNavigate();

    const [id, setId] = useState("");
    const [actaDate, setActaDate] = useState("");
    const [reunionTitle, setReunionTitle] = useState("");
    const [resumenText, setResumenText] = useState("");
    const [documentos, setDocumentos] = useState([]);

    let actaData = actasData.find((actaData) => actaData.id === value);
    if (!actaData) {
        actaData = actasData.find((actaData) => actaData.id === '0');
    }

    useEffect(() => {
        setId(actaData.id);
        setActaDate(actaData.actaDate);
        setReunionTitle(actaData.reunionTitle);
        setResumenText(actaData.resumenText);
        setDocumentos(actaData.documentos);
    }, [actaData])

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const updatedReunion = {
            id,
            actaDate,
            reunionTitle,
            resumenText,
            documentos,
        }

        const index = actasData.findIndex((x) => x.id === id);
        actasData[index] = updatedReunion;

        navigate('/');
    }

    return (
        <div className='page'>
            <h1 className='page__title'>Editor de Reuniones</h1>
            <NavBar />
            <Container maxWidth="bg" >
                <Box component='form' onSubmit={handleSubmit}>
                    <Grid container spacing={4} sx={{ py: 2 }}>
                        <Grid item xs={12}>
                            <TextField 
                                id="filled-basic" 
                                label="Fecha del Acta"
                                name='actaDate'
                                value={actaDate}
                                variant="filled" 
                                onChange={(e) => setActaDate(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={4} sx={{ py: 2, pr: 80 }}>
                        <Grid item xs={12}>
                            <TextField 
                                fullWidth 
                                multiline
                                id="filled-basic"
                                label="Título de Reunión" 
                                value={reunionTitle}
                                variant="filled"
                                onChange={(e) => setReunionTitle(e.target.value)} 
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={4} sx={{ py: 2, pr: 80 }}>
                        <Grid item xs={12}>
                            <TextField 
                                fullWidth 
                                multiline 
                                id="filled-basic" 
                                label="Resumen"
                                value={resumenText}
                                variant="filled" 
                                onChange={(e) => setResumenText(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField 
                                fullWidth 
                                multiline 
                                id="filled-basic" 
                                label="Documentos" 
                                name='documentos'
                                defaultValue={actaData.documentos} 
                                variant="filled" 
                            
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={4} sx={{ py: 2 }}>
                        <Grid item xs={12}>
                            <Button type="submit" variant='contained' >
                                Realizar Cambios
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </div>
    )
}

export default EditPage;