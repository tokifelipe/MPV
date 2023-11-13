import React from 'react'
import { Grid, Box, TextField, Button } from '@mui/material'
import Container from '@mui/material/Container';
import { useParams, useNavigate } from 'react-router-dom';

import NavBar from '../components/NavBar'
import ListGroup from 'react-bootstrap/ListGroup';
import FormPropsTextFields from '../components/FormPropsTextFields'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Row, Col, Card, Form, InputGroup, FormControl } from 'react-bootstrap';

import { actasData } from './actasData';

const divStyle = {
  display: 'flex',
  alignItems: 'center'
};

const PlanPage = () => {
  const { value } = useParams();
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [actaDate, setActaDate] = useState("");
  const [reunionTitle, setReunionTitle] = useState("");
  const [resumenText, setResumenText] = useState("");
  const [documentos, setDocumentos] = useState([]);
  const [openExit, setOpenExit] = useState(false);
  const [openFile, setOpenFile] = useState(false);
  const [warning, setWarning] = useState(false);
  
  const handleOpenExit = () => setOpenExit(true);
  const handleCloseExit = () => {
    setId("");
    setActaDate("");
    setReunionTitle("");
    setResumenText("");
    setDocumentos([]);

    setWarning(false);

    setOpenExit(false);
  };
  
  const handleOpenFile = (filename) => {
    setRmvFile(filename);
    setOpenFile(true);
  };
  const handleCloseFile = () => setOpenFile(false);

  const backToMenu = () => {
    navigate("/");
}

  const handleFileUpload = () => {
    const files = document.getElementById("uploads").files;

    for(let i = 0; i < files.length; i++) {
      const filename = files[i].name;
      setDocumentos([...documentos, filename]);
    }
  }
  const truncateText = (text) => {
    return text.length > 22 ? text.slice(0, 22) + '...' : text;
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

    const flag = (actaDate !== "") && (reunionTitle !== "") && (resumenText !== "");

    if(flag) {
      actasData.push(updatedReunion);
      handleOpenExit();
    } else {
      setWarning(true);
    }
  }

  return (
    <div className='page'>
      <NavBar />


      <Row className='justify-content-md-center'>
        <Col md={8}>
          <Card className='mb-4'>
            <Card.Header as="h1">Datos de la reunión</Card.Header>
            <Card.Body>
              <Card.Title>Ingrese todos los datos asociados a la reunión</Card.Title>
                    
              <Container  sx={{ py: 11 }}  sy={{ px: 10 }} maxWidth="md">
                <Grid container spacing={10}>
                  <Box
                    component="form"
                    onSubmit={handleSubmit}
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
                          value={reunionTitle}
                          variant="filled"
                          onChange={(e) => setReunionTitle(e.target.value)}
                        />
                        <TextField
                          required
                          id="outlined-required"
                          label="Campús de la Reunión"
                          value={resumenText}
                          variant="filled"
                          onChange={(e) => setResumenText(e.target.value)}
                        />
                        <TextField
                          required
                          id="outlined-required"
                          label="Fecha Reunión"
                          value={actaDate}
                          variant="filled"
                          onChange={(e) => setActaDate(e.target.value)}
                        />

                        {/*          
                        <TextField
                          id="outlined-required"
                          label="Hora reunión"
                          type="time"
                          InputLabelProps={{ shrink: true }} 
                          defaultValue=""
                        /> */}
                      
                    </div>
                    {
                      warning
                        ? (<h6 sx={{ color: "#ff0000" }}>Ingrese texto en todos los campos requeridos</h6>)
                      : (<></>)
                    }
                    <Button type="submit" variant="contained" >
                      Ingresar Reunión
                    </Button>
                  
                  </Box>

                </Grid>
              </Container>
              <Card.Subtitle className="mb-2 text-muted"> </Card.Subtitle>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className='justify-content-md-center'>
        <Col md={8}>
          <Card className='mb-4'>
            <Card.Header as="h1">Temas de la reunión</Card.Header>
            <Card.Body>
              {[...Array(5)].map((_, index) => (
                <InputGroup className="mb-3" key={index}>
                  <InputGroup.Text>{index + 1}.</InputGroup.Text>
                  <FormControl />
                </InputGroup>
              ))}
              <Form.Label>Documentación subida para esta reunión</Form.Label>
              <Button variant="primary">Agregar Archivo</Button>
            <Container sx={{ mt: 3 }} >
                        <h1 className='page__title'>Documentación subida para esta reunión</h1>
                        <Card.Subtitle className="mb-2 text-muted">Seleccione los archivos asociados a esta reunión</Card.Subtitle>

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

            <Card.Title></Card.Title>
            </Card.Body>
          </Card>
        </Col>
      </Row>
     
      <Modal show={openExit} onHide={handleCloseExit}>
        <Modal.Header closeButton>
          <Modal.Title>Reunión Ingresada</Modal.Title>
        </Modal.Header>
        <Modal.Body>Felicidades, has ingresado la reunión correctamente</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={backToMenu}>
            Volver al menú
          </Button>
          <Button variant="primary" onClick={handleCloseExit}>
          Seguir editando
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  )
}

export default PlanPage