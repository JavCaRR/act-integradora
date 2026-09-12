import { useState } from 'react';
import './App.css';
import imagenScrum from './la-metodologia-scrum-2855124974.png';
import imagenAgile from './pngtree-agile-development-process-infographic-png-image_8737029-238209591.png';

export default function App() {
  // HU-01: Estado para Autenticación de Estudiantes
  const [sesionIniciada, setSesionIniciada] = useState(false);
  const [correo, setCorreo] = useState('');
  
  // Estado para la navegación interna del panel del estudiante
  const [vistaActual, setVistaActual] = useState('articulos');

  // HU-02: Datos simulados para Artículos de Texto
  const articulos = [
    { id: 1, titulo: 'Introducción a SCRUM', contenido: 'Scrum es un marco de trabajo ágil que promueve la colaboración en equipos para desarrollar productos complejos...' },
    { id: 2, titulo: 'Conceptos Básicos de Agile', contenido: 'Agile es una filosofía de desarrollo de software basada en principios de flexibilidad, iteración y entrega de valor continuo...' }
  ];

  // HU-03: Datos simulados y estado para Ejercicios Interactivos
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState('');
  const [resultadoEjercicio, setResultadoEjercicio] = useState('');

  const ejercicio = {
    pregunta: '¿Cuál de las siguientes opciones describe mejor el Product Backlog?',
    opciones: [
      'Una lista de tareas diarias de los desarrolladores.',
      'Un listado priorizado de todo lo que se conoce que es necesario en el producto.',
      'Un documento que detalla el presupuesto del proyecto.'
    ],
    respuestaCorrecta: 'Un listado priorizado de todo lo que se conoce que es necesario en el producto.'
  };

  const evaluarEjercicio = (e) => {
    e.preventDefault();
    if (respuestaSeleccionada === ejercicio.respuestaCorrecta) {
      setResultadoEjercicio('¡Correcto! Sigue así.');
    } else {
      setResultadoEjercicio('Incorrecto. Intenta de nuevo.');
    }
  };

  // HU-04: Datos simulados para Material PDF
  const materiales = [
    { id: 1, titulo: 'Guía Definitiva de SCRUM.pdf', tamaño: '1.2 MB' },
    { id: 2, titulo: 'Casos de Estudio Ágiles.pdf', tamaño: '3.4 MB' }
  ];

  // Función para simular Login (HU-01)
  const handleLogin = (e) => {
    e.preventDefault();
    if (correo.trim() !== '') {
      setSesionIniciada(true);
    }
  };

  // Función para simular descarga de recibo/PDF (HU-04)
  const handleDescargarPDF = (titulo) => {
    // Simulamos la descarga activando la ventana de impresión/guardado en PDF del navegador
    alert(`Descargando material: ${titulo}`);
    window.print(); 
  };

  // Pantalla de inicio de sesión (HU-01)
  if (!sesionIniciada) {
    return (
      <div className="login-screen">
        <header>
          <h2>Plataforma Educativa - Inicio de sesión</h2>
        </header>
        <main className="login-container">
          <div className="card">
            <h2>Acceso para Estudiantes</h2>
            <p>Inicia sesión para guardar tu progreso educativo.</p>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Correo Electrónico Institucional:</label>
                <input 
                  type="email" 
                  required 
                  placeholder="estudiante@escuela.edu"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Contraseña:</label>
                <input type="password" required placeholder="*****" />
              </div>
              <button type="submit" className="btn-primary">Ingresar a Clases</button>
            </form>
          </div>
        </main>
      </div>
    );
  }

  // Panel del Estudiante
  return (
    <div className="dashboard">
      <header className="navbar">
        <h2>Plataforma Educativa - Panel de Estudiante</h2>
        <div>
          <span>Hola, {correo}</span>
          <button className="btn-logout" onClick={() => setSesionIniciada(false)}>Cerrar Sesión</button>
        </div>
      </header>

      <main className="main-content">
        {/* Navegación interna del estudiante */}
        <nav className="tab-menu" style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button onClick={() => setVistaActual('articulos')} className="btn-secondary">Artículos</button>
          <button onClick={() => setVistaActual('ejercicios')} className="btn-secondary">Ejercicios Interactivos</button>
          <button onClick={() => setVistaActual('materiales')} className="btn-secondary">Material PDF</button>
        </nav>

        {/* HU-02: Artículos Texto */}
        {vistaActual === 'articulos' && (
          <section className="card">
            <h3>Contenido añadido recientemente:</h3>
            <p>Lee tus artículos sin interrupciones, ideal para conexiones lentas.</p>
            {articulos.map((art) => (
              <div key={art.id} className="article-item">
                <h4>{art.titulo}</h4>
                <p>{art.contenido}</p>
                <img
                  className="article-image"
                  src={art.id === 1 ? imagenScrum : imagenAgile}
                  alt={art.id === 1 ? 'Diagrama de la metodología Scrum' : 'Diagrama del proceso Agile'}
                />
              </div>
            ))}
            <div className="video-section">
              <h4>Video recomendado sobre metodologías ágiles</h4>
              <div className="video-container">
                <iframe
                  src="https://www.youtube.com/embed/8eVXTyIZ1Hs?si=po_h2TOu8Xiw0LIq"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </section>
        )}

        {/* HU-03: Ejercicios Interactivos */}
        {vistaActual === 'ejercicios' && (
          <section className="card ejercicio">
            <h3>Autoevaluación Interactiva</h3>
            <form onSubmit={evaluarEjercicio}>
              <p><strong>{ejercicio.pregunta}</strong></p>
              {ejercicio.opciones.map((opcion, index) => (
                <div key={index} className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input 
                    type="radio" 
                    id={`opcion-${index}`} 
                    name="ejercicio" 
                    value={opcion} 
                    onChange={(e) => setRespuestaSeleccionada(e.target.value)}
                    required
                  />
                  <label htmlFor={`opcion-${index}`}>{opcion}</label>
                </div>
              ))}
              <button type="submit" className="btn-primary">Validar Respuesta</button>
            </form>
            {resultadoEjercicio && (
              <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#eef', borderRadius: '5px' }}>
                <strong>{resultadoEjercicio}</strong>
              </div>
            )}
          </section>
        )}

        {/* HU-04 materiales descargables en pdf */}
        {vistaActual === 'materiales' && (
          <section className="card">
            <h3>Guías de Estudio para Repaso Offline</h3>
            <table className="tabla-pagos">
              <thead>
                <tr>
                  <th>Título de la Guía</th>
                  <th>Tamaño</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {materiales.map((mat) => (
                  <tr key={mat.id}>
                    <td>{mat.titulo}</td>
                    <td>{mat.tamaño}</td>
                    <td>
                      <button 
                        className="btn-secondary" 
                        onClick={() => handleDescargarPDF(mat.titulo)}
                      >
                        Descargar PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

      </main>
    </div>
  );
}