import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { actasData } from './actasData';
import { Row, Col, Card, Form, Button, Container, Modal, InputGroup, FormControl } from 'react-bootstrap';

const PlanPage = () => {
  const { value } = useParams();
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [actaDate, setActaDate] = useState("");
  const [actaHour, setActaHour] = useState("");
  const [reunionTitle, setReunionTitle] = useState("");
  const [resumenText, setResumenText] = useState("");
  const [documentos, setDocumentos] = useState([]);
  const [temas, setTemas] = useState(['']);
  const [openExit, setOpenExit] = useState(false);
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

    let id_num = actasData.length + 1;

    const updatedReunion = {
      id: id_num.toString(),
      actaDate,
      actaHour,
      reunionTitle,
      resumenText,
      documentos,
    }

    const flag = (actaDate !== "") && (actaHour !== "") && (reunionTitle !== "") && (resumenText !== "");

    if(flag) {
      actasData.push(updatedReunion);
      handleOpenExit();
    } else {
      setWarning(true);
    }
  }

  // Función para manejar el cambio en los temas
  const handleTemasChange = (value, index) => {
    const newTemas = [...temas];
    newTemas[index] = value;
    setTemas(newTemas);
  };

  // Función para añadir un nuevo tema
  const addTema = () => {
    setTemas([...temas, '']);
  };

  // Función para eliminar un tema
  const removeTema = (index) => {
    const newTemas = temas.filter((_, i) => i !== index);
    setTemas(newTemas);
  };

  return (
    <div className='page'>
      <NavBar />
      <br />
      <Container>
        <Form onSubmit={handleSubmit}>
          <Row className='justify-content-md-center'>
            <Col md={8}>
              <Card className='mb-4'>
                <Card.Header as="h5">Datos de la reunión</Card.Header>
                <Card.Body>
                  {warning && (<div className="text-danger">Ingrese texto en todos los campos requeridos</div>)}
                  <Form.Group className="mb-3">
                    <Form.Label>Título de la Reunión</Form.Label>
                    <Form.Control 
                      type="text" 
                      placeholder="Título de la Reunión" 
                      value={reunionTitle}
                      onChange={(e) => setReunionTitle(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Campus de la Reunión</Form.Label>
                    <Form.Control 
                      type="text" 
                      placeholder="Campus de la Reunión" 
                      value={resumenText}
                      onChange={(e) => setResumenText(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Fecha Reunión</Form.Label>
                    <Form.Control 
                      type="date" 
                      placeholder="Fecha Reunión" 
                      value={actaDate}
                      onChange={(e) => setActaDate(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Hora Reunión</Form.Label>
                    <Form.Control 
                      type="time" 
                      placeholder="Hora Reunión" 
                      value={actaHour}
                      onChange={(e) => setActaHour(e.target.value)}
                    />
                  </Form.Group>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className='justify-content-md-center'>
            <Col md={8}>
              <Card className='mb-4'>
                <Card.Header>Temas de la reunión</Card.Header>
                <Card.Body>
                  {temas.map((tema, index) => (
                    <InputGroup className="mb-3" key={index}>
                      <InputGroup.Text>{index + 1}.</InputGroup.Text>
                      <FormControl 
                        value={tema}
                        onChange={(e) => handleTemasChange(e.target.value, index)}
                      />
                      <Button variant="outline-danger" onClick={() => removeTema(index)}>
                        Eliminar
                      </Button>
                    </InputGroup>
                  ))}
                  <Button variant="outline-primary" onClick={addTema}>
                    Añadir Tema
                  </Button>
                  <br />
                  <Form.Label>Documentación subida para esta reunión</Form.Label>
                  <br />
                  {documentos.map((doc, index) => (
                    <div key={index} >
                      <span className="icon me-2">📄</span>
                      {truncateText(doc)}
                    </div>
                  ))}
                  <Button variant="outline-primary" onClick={() => document.getElementById("uploads").click()}>
                    Agregar Archivo
                  </Button>
                  <Form.Control
                    type="file"
                    id="uploads"
                    onChange={handleFileUpload}
                    hidden
                    multiple
                  />
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className='justify-content-md-center'>
            <Col md={8}>
              <Button type="submit" variant="primary">Ingresar Reunión</Button>
            </Col>
          </Row>
        </Form>

        <Modal show={openExit} onHide={handleCloseExit}>
          <Modal.Header closeButton>
            <Modal.Title>Reunión Ingresada</Modal.Title>
          </Modal.Header>
          <Modal.Body>La reunión ha sido registrada exitosamente!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={backToMenu}>Volver al menú</Button>
            <Button variant="primary" onClick={handleCloseExit}>Seguir editando</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}

export default PlanPage;
