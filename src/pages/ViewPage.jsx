import React, { useState, useEffect } from 'react'
import NavBar from '../components/NavBar'
import { useParams, useNavigate } from 'react-router-dom';
import { actasData } from './actasData';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';

const ViewPage = () => {
  const navigate = useNavigate();
  const { value } = useParams();

  let actaData = actasData.find((actaData) => actaData.id === value);

  // Si no se encuentra actaData, redirige al usuario
  if (!actaData) {
    useEffect(() => {
      navigate('/dashboard');
    }, []);
    return null;
  }

  return (
      <><NavBar /><Container className='mt-4'>
      <Row className='justify-content-md-center'>
        <Col md={8}>
          <Card className='mb-4'>
            <Card.Header as="h1">Reunión</Card.Header>
            <Card.Body>
              <Card.Title>{actaData.reunionTitle}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{actaData.actaDate}</Card.Subtitle>
              <Card.Subtitle className="mb-2 text-muted">{actaData.actaHour}</Card.Subtitle>
              <Resumen resumenText={actaData.resumenText} />
            </Card.Body>
          </Card>
          <DocumentosAdjuntos documentos={actaData.documentos} />
        </Col>
      </Row>
    </Container></>
  );
};

function Resumen({ resumenText }) {
  return (
    <div>
      <h2>Resumen</h2>
      <p>{resumenText}</p>
    </div>
  );
}

function DocumentosAdjuntos({ documentos }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = () => {
    setIsLoading(true); // Activar el estado de carga
    setTimeout(() => {
      setIsLoading(false);
      Download();
    }, 700);
  };

  // Función para recortar el nombre del archivo
  const truncateText = (text) => {
    return text.length > 22 ? text.slice(0, 22) + '...' : text;
  }

  return (
    <Card className='mb-4'>
      <Card.Header as="h1">Documentos Adjuntos</Card.Header>
      <Card.Body>
        <Row xs={1} md={2} lg={3} className="g-4">
          {documentos.map((documento, index) => (
            <Col key={index}>
              <ListGroup.Item
                action
                onClick={!isLoading ? handleDownload : undefined}
                className="document-box d-flex align-items-center justify-content-start"
                style={{ cursor: isLoading ? 'default' : 'pointer' }}
              >
                <div className="icon me-2">📄</div>
                {truncateText(documento)}
              </ListGroup.Item>
            </Col>
          ))}
        </Row>
      </Card.Body>
    </Card>
  ); 
}

const Download = () => {
  // Void blob
  const blob = new Blob([''], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'archivo.txt';
  a.click();
  URL.revokeObjectURL(url);
};

export default ViewPage
