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
    Typography
} from '@mui/material';
import { Row, Col, Card } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

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

    //Función para mostrar los archivos durante edición
    const handleFileUpload = () => {
        const files = document.getElementById("uploads").files;

        for(let i = 0; i < files.length; i++) {
            const filename = files[i].name;
            setDocumentos([...documentos, filename]);
        }
    }

    //Función para eliminar archivo
    const deleteFile = () => {
        const index = documentos.indexOf(rmvFile);
        if (index > -1) {
            documentos.splice(index, 1);
            setRmvFile("");
            handleCloseFile();
        }
    }

    //Submit de forma
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
            <Container sx={{ mt : 4}}>
                <Row className='justify-content-md-center' >
                    <Col md={8} >
                        <Box 
                            component='form' 
                            onSubmit={handleSubmit}
                            noValidate
                            autoComplete="on"
                        >
                            <Card className='mb-4' sx={{ mt: 3 }} >
                                <Card.Header className='page__title'>Editor de la Reunión</Card.Header>
                                <Card.Body>
                                    <Grid container spacing={4} sx={{ py: 2 }}>
                                        <Grid item xs={12}>
                                            <TextField 
                                                id="outlined-required" 
                                                label="Fecha del Acta"
                                                name='actaDate'
                                                value={actaDate}
                                                variant="filled"
                                                pattern="[1-9]|[12][0-9]|3[01]/[1-9]|1[012]/\d{4,4}"
                                                onChange={(e) => setActaDate(e.target.value)}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={4} sx={{ py: 2 }}>
                                        <Grid item xs={12}>
                                            <TextField 
                                                fullWidth 
                                                multiline
                                                id="outlined-required"
                                                label="Título de Reunión" 
                                                value={reunionTitle}
                                                variant="filled"
                                                onChange={(e) => setReunionTitle(e.target.value)} 
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={4} sx={{ py: 2 }}>
                                        <Grid item xs={12}>
                                            <TextField 
                                                fullWidth 
                                                multiline 
                                                id="outlined-required" 
                                                label="Resumen"
                                                value={resumenText}
                                                variant="filled" 
                                                onChange={(e) => setResumenText(e.target.value)}
                                            />
                                        </Grid>
                                    </Grid>
                                </Card.Body>
                            </Card>
                            <Card sx={{ mt: 3 }} >
                                <Card.Header className='page__title'>Editor de la Documentación</Card.Header>
                                <Card.Body>
                                    <Grid container spacing={4} sx={{ py: 2 }}>
                                        {documentos.map((doc) => (
                                            <Grid item xs={3} onClick={() => handleOpenFile(doc)}>
                                                <div className="icon me-2">📄</div>
                                                {truncateText(doc)}
                                            </Grid>
                                        ))}
                                    </Grid>
                                    <Grid container spacing={4} sx={{ py: 2 }}>
                                        <Grid item xs={12}>
                                            <Button
                                                variant="outlined"
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
                                </Card.Body>  
                            </Card>
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
                    </Col>
                </Row>
            </Container>

            <Modal
                show={openFile}
                onHide={handleCloseFile}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Eliminar Archivo
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div>
                        <div className="icon me-2">📄</div>
                        <h4>{rmvFile}</h4>
                    </div>
                    ¿Desea eliminar este archivo?
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={deleteFile}>
                        Si
                    </Button>

                    <Button variant="primary" onClick={handleCloseFile}>
                        No
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal
                show={openExit}
                onHide={handleCloseExit}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Cambios realizados con exito
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    ¿Desea volver al inicio?
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={backToMenu}>
                        Volver al Menu
                    </Button>
                    <Button variant="primary" onClick={handleCloseExit}>
                        Seguir Editando
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default EditPage;