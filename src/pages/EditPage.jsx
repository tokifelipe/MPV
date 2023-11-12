import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { actasData } from './actasData';

import { 
    TextField,
    Button,
    Grid, 
    Container,
    Box,
    Modal,
    Typography
} from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const EditPage = () => {
    const { value } = useParams();
    const navigate = useNavigate();

    const [id, setId] = useState("");
    const [actaDate, setActaDate] = useState("");
    const [reunionTitle, setReunionTitle] = useState("");
    const [resumenText, setResumenText] = useState("");
    const [documentos, setDocumentos] = useState([]);
    const [openExit, setOpenExit] = useState(false);
    const [openFile, setOpenFile] = useState(false);
    const [rmvFile, setRmvFile] = useState("");

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

    const handleOpenExit = () => setOpenExit(true);
    const handleCloseExit = () => setOpenExit(false);

    const handleOpenFile = (filename) => {
        setRmvFile(filename);
        setOpenFile(true);
    };
    const handleCloseFile = () => setOpenFile(false);

    const backToMenu = () => {
        navigate("/");
    }

    // Función para recortar el nombre del archivo
    const truncateText = (text) => {
        return text.length > 22 ? text.slice(0, 22) + '...' : text;
    }

    const handleFileUpload = () => {
        const files = document.getElementById("uploads").files;

        for(let i = 0; i < files.length; i++) {
            const filename = files[i].name;
            setDocumentos([...documentos, filename]);
        }
    }

    const deleteFile = () => {
        const index = documentos.indexOf(rmvFile);
        if (index > -1) {
            documentos.splice(index, 1);
            setRmvFile("");
            handleCloseFile();
        }
    }

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

        handleOpenExit();
    }

    return (
        <div className='page'>
            <NavBar />
            <Container maxWidth="bg" >
                <Box component='form' onSubmit={handleSubmit}>
                    <Container sx={{ mt: 3 }} >
                        <h1 className='page__title'>Editor de la Reunión</h1>
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
                        </Grid>
                    </Container>
                    <Container sx={{ mt: 3 }} >
                        <h1 className='page__title'>Editor de la Documentación</h1>
                        <Grid container spacing={4} sx={{ py: 2, pr: 80 }}>
                            {documentos.map((doc) => (
                                <Grid item xs={6} onClick={() => handleOpenFile(doc)}>
                                    <div className="icon me-2">📄</div>
                                    {truncateText(doc)}
                                </Grid>
                            ))}
                        </Grid>
                        <Grid container spacing={4} sx={{ py: 2, pr: 80 }}>
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    component="label"
                                >
                                    Agregar archivo
                                    <input
                                        type="file"
                                        id="uploads"
                                        onChange={handleFileUpload}
                                        hidden
                                        multiple
                                    />
                                </Button>
                            </Grid>
                        </Grid>       
                    </Container>
                    <Container sx={{ mt: 3 }}>
                        <Grid container spacing={4} sx={{ py: 2 }}>
                            <Grid item xs={12}>
                                <Button type="submit" variant='contained' >
                                    Realizar Cambios
                                </Button>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </Container>

            <Modal
                open={openFile}
                onClose={handleCloseFile}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-title" variant="h6">
                        Eliminar Archivo
                    </Typography>

                    <Typography id="modal-description">
                        <div className="icon me-2">📄</div>
                        ¿Desea eliminar este archivo?
                    </Typography>

                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={6}>
                            <Button variant="contained" onClick={deleteFile}>
                                Si
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button variant="contained" onClick={handleCloseFile}>
                                No
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>

            <Modal
                open={openExit}
                onClose={handleCloseExit}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-title" variant="h6">
                        Cambios realizados con exito
                    </Typography>

                    <Typography id="modal-description">
                        ¿Desea volver al inicio?
                    </Typography>

                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={6}>
                            <Button variant="contained" onClick={backToMenu}>
                                Volver al Menu
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button variant="contained" onClick={handleCloseExit}>
                                Seguir Editando
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </div>
    )
}

export default EditPage;