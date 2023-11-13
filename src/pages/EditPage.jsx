import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { actasData } from './actasData';

import { Row, Col, Card, Form, Button, Container, Modal } from 'react-bootstrap';

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

    const fileInputRef = useRef(null); // Referencia para el input de archivo

    const onFileButtonClick = () => {
        fileInputRef.current.click(); // Desencadena el clic en el input de archivo
    };

    return (
        <div className='page'>
            <NavBar />
            <Container className="mt-4">
                <Row className='justify-content-md-center'>
                    <Col md={8}>
                        <Form onSubmit={handleSubmit}>
                            <Card className='mb-4 mt-3'>
                                <Card.Header as="h1">Editor de la Reunión</Card.Header>
                                <Card.Body>
                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm="2">
                                            Fecha del Acta
                                        </Form.Label>
                                        <Col sm="10">
                                            <Form.Control 
                                                type="text" 
                                                placeholder="Fecha del Acta" 
                                                value={actaDate}
                                                onChange={(e) => setActaDate(e.target.value)}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm="2">
                                            Título de Reunión
                                        </Form.Label>
                                        <Col sm="10">
                                            <Form.Control 
                                                type="text" 
                                                as="textarea" 
                                                rows={3}
                                                placeholder="Título de Reunión" 
                                                value={reunionTitle}
                                                onChange={(e) => setReunionTitle(e.target.value)} 
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm="2">
                                            Resumen
                                        </Form.Label>
                                        <Col sm="10">
                                            <Form.Control 
                                                type="text" 
                                                as="textarea" 
                                                rows={3}
                                                placeholder="Resumen" 
                                                value={resumenText}
                                                onChange={(e) => setResumenText(e.target.value)}
                                            />
                                        </Col>
                                    </Form.Group>
                                </Card.Body>
                            </Card>
                            <Card className='mb-4 mt-3'>
                                <Card.Header as="h1">Editor de la Documentación</Card.Header>
                                <Card.Body>
                                    <Form.Group as={Row}>
                                        {documentos.map((doc, index) => (
                                            <Col xs={3} key={index} onClick={() => handleOpenFile(doc)}>
                                                <div className="icon me-2">📄</div>
                                                {truncateText(doc)}
                                            </Col>
                                        ))}
                                    </Form.Group>
                                    <Form.Group as={Row} className="mt-3">
                                        <Col>
                                            <Button variant="outline-primary" onClick={onFileButtonClick}>
                                                Agregar archivo
                                            </Button>
                                            <Form.Control
                                                type="file"
                                                id="uploads"
                                                ref={fileInputRef}
                                                onChange={handleFileUpload}
                                                hidden
                                                multiple
                                            />
                                        </Col>
                                    </Form.Group>
                                </Card.Body>
                            </Card>
                            <Container className="mt-3">
                                <Row>
                                    <Col>
                                        <Button type="submit" variant="primary">
                                            Realizar Cambios
                                        </Button>
                                    </Col>
                                </Row>
                            </Container>
                        </Form>
                    </Col>
                </Row>
            </Container>
            <br />

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