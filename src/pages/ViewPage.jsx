import React, { useState, useEffect } from 'react'
import { Button } from '@mui/material'
import NavBar from '../components/NavBar'
import { useParams } from 'react-router-dom';
import { actasData } from './actasData';

const ViewPage = () => {
  const { value } = useParams();

  let actaData = actasData.find((actaData) => actaData.id === value);

  if (!actaData) {
    actaData = actasData.find((actaData) => actaData.id === '0');
  }

  return (
    <div className='page'>
      <h1 className='page__title'>Reuniones Anteriores</h1>
      <NavBar />
      <div>
        <h3>{actaData.actaDate}</h3>
        <h1>{actaData.reunionTitle}</h1>
        <Resumen resumenText={actaData.resumenText} />
        <DocumentosAdjuntos documentos={actaData.documentos} />
      </div>
    </div>
  )
}

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

  return (
    <div>
      <h2>Documentos Adjuntos</h2>
      <ul className="document-container">
        {documentos.map((documento, index) => (
          <li key={index}
            className="document-box"
            onClick={isLoading ? null : handleDownload}
            style={{ cursor: isLoading ? 'default' : 'pointer' }}
          >
            <div className="icon">📄</div>
            {documento}
          </li>
        ))}
      </ul>
    </div>
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
