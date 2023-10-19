import React from 'react'
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
  return (
    <div>
      <h2>Documentos Adjuntos</h2>
      <ul className="document-container">
        {documentos.map((documento, index) => (
          <li key={index} className="document-box">
            <div className="icon">📄</div>
            {documento}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ViewPage
