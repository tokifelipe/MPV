import React from 'react'
import { Button, Grid } from '@mui/material'
import Container from '@mui/material/Container';
import { useParams, useNavigate } from 'react-router-dom';

import NavBar from '../components/NavBar'
import ListGroup from 'react-bootstrap/ListGroup';
import FormPropsTextFields from '../components/FormPropsTextFields'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Row, Col, Card } from 'react-bootstrap';


const divStyle = {
  display: 'flex',
  alignItems: 'center'
};
const PlanPage = () => {
  const [show, setShow] = useState(false);
  const { value } = useParams();
  const navigate = useNavigate();


  const [documentos, setDocumentos] = useState([]);
  const [openExit, setOpenExit] = useState(false);
  const [openFile, setOpenFile] = useState(false);
  const handleOpenExit = () => setOpenExit(true);
  const handleCloseExit = () => setOpenExit(false);

  const handleCloseFile = () => setOpenFile(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const backToMenu = () => {
    navigate("/");
}
const handleOpenFile = (filename) => {
  setRmvFile(filename);
  setOpenFile(true);
};

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



  return (
    <div className='page'>
      <NavBar />


      <Row className='justify-content-md-center'>
        <Col md={8}>
          <Card className='mb-4'>
            <Card.Header as="h1">Datos de la reunión</Card.Header>
            <Card.Body>
            <Card.Title>Ingrese todos los datos asociados a la reunión</Card.Title>
                    
      <Container style={divStyle}  sx={{ py: 11 }}  sy={{ px: 10 }} maxWidth="md">
      <Grid container spacing={10}>
      <FormPropsTextFields></FormPropsTextFields>
      <Button variant="contained" onClick={handleShow}>
      Ingresar Reunión      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Reunión Ingresada</Modal.Title>
        </Modal.Header>
        <Modal.Body>Felicidades, has ingresado la reunión correctamente</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={backToMenu}>
            Volver al menú
          </Button>
          <Button variant="primary" onClick={handleClose}>
           Seguir editando
          </Button>
        </Modal.Footer>
      </Modal>
     
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

            <ListGroup  as="ol" numbered>
            <ListGroup.Item><input size="100" /></ListGroup.Item>
            <ListGroup.Item><input size="100" /></ListGroup.Item>
            <ListGroup.Item><input size="100"/></ListGroup.Item>
            <ListGroup.Item><input size="100"/></ListGroup.Item>
            <ListGroup.Item><input size="100"/></ListGroup.Item>
            </ListGroup>

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
     
 

    </div>
  )
}

export default PlanPage