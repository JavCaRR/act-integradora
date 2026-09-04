import { useState } from 'react';
import './App.css';

export default function App() {
  // Inicio de sesión
  const [sesionIniciada, setSesionIniciada] = useState(false);
  const [correo, setCorreo] = useState('');

  // Estado 2: Lista de pagos simulados para el historial cuando entra el usuario a la página
  const [pagos, setPagos] = useState([
    { id: 1, concepto: 'Mantenimiento Agosto', monto: '$1,200', fecha: '2026-08-05', estatus: 'Pagado' },
    { id: 2, concepto: 'Cuota de Seguridad', monto: '$350', fecha: '2026-08-15', estatus: 'Pagado'}
  ]);

  // Campos por defecto modificables para el formulario de pago
  const [conceptoPago, setConceptoPago] = useState('Mantenimiento septiembre');
  const [montoPago, setMontoPago] = useState('1200');

  // Función para simular Login (HU01)
  const handleLogin = (e) => {
    e.preventDefault();
    if (correo.trim() !== '') {
      setSesionIniciada(true);
    }
  };

  // Funcion para pagar y para añadir entrada en el historial
  const handlePagar = (e) => {
    e.preventDefault();
    const nuevoPago = {
      id: pagos.length + 1,
      concepto: conceptoPago,
      monto: `$${montoPago}`,
      fecha: new Date().toISOString().split('T')[0], // saco la fecha y la convierto a iso para que se vea bien
      estatus: 'Pagado'
    };
    setPagos([nuevoPago, ...pagos]);
    alert('¡Pago procesado con éxito!');
  };

  // Función para simular descarga de recibo (HU04)
  const handleDescargarRecibo = (concepto) => {
    window.print(); // para este PoC solo mando llamar la funcion de imprimir la cual permite guardar a PDF
  };

  // Pantalla de inicio de sesión (HU01)
  if (!sesionIniciada) {
    return (
      <div className="login-screen">
        <header>
          <h2>Los Robles - Inicio de sesión</h2>
        </header>
        <main className="login-container">
          <div className="card">
            <h2>Residencial Los Robles</h2>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Correo Electrónico:</label>
                <input 
                  type="email" 
                  required 
                  placeholder="ejemplo@losrobles.com"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Contraseña:</label>
                <input type="password" required placeholder="*****" />
              </div>
              <button type="submit" className="btn-primary">Iniciar sesión</button>
            </form>
          </div>
        </main>
      </div>
    );
  }

  // Panel del residente (HU02, HU03, HU04)
  return (
    <div className="dashboard">
      <header className="navbar">
        <h2>Los Robles - Panel de Residente</h2>
        <div>
          <span>{correo}</span>
          <button className="btn-logout" onClick={() => setSesionIniciada(false)}>Salir</button>
        </div>
      </header>

      <main className="main-content">
        {/* HU02: Pasarela de Pagos */}
        <section className="card">
          <h3>Realizar Pago de Cuota</h3>
          <form onSubmit={handlePagar} className="form-pago">
            <div className="form-group">
              <label>Concepto:</label>
              <input 
                type="text" 
                value={conceptoPago} 
                onChange={(e) => setConceptoPago(e.target.value)} 
                required 
              />
            </div>
            <div className="form-group">
              <label>Monto ($ MXN):</label>
              <input 
                type="number" 
                value={montoPago} 
                onChange={(e) => setMontoPago(e.target.value)} 
                required 
              />
            </div>
            <div className="form-group">
              <label>Número de Tarjeta:</label>
              <input type="text" placeholder="4152 •••• •••• 1234" maxLength="19" required />
            </div>
              <div className="form-group">
              <label>Nombre del titular:</label>
              <input type="text" placeholder="Pedrito Alcachofa" maxLength="19" required />
            </div>
              <div className="form-group">
              <label>CVV:</label>
              <input type="text" placeholder="***" maxLength="19" required />
            </div>
              <div className="form-group">
              <label>Fecha de caducidad (MM/AAAA):</label>
              <input type="text" placeholder="01/2040" maxLength="7" required />
            </div>
            <button type="submit" className="btn-primary">Pagar Ahora</button>
          </form>
        </section>

        {/* HU03 & HU04: Historial y recibos */}
        <section className="card">
          <h3>Historial de Pagos y Adeudos</h3>
          <table className="tabla-pagos">
            <thead>
              <tr>
                <th>Concepto</th>
                <th>Monto</th>
                <th>Fecha</th>
                <th>Estatus</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {pagos.map((p) => (
                <tr key={p.id}>
                  <td>{p.concepto}</td>
                  <td>{p.monto}</td>
                  <td>{p.fecha}</td>
                  <td><span className="badge">{p.estatus}</span></td> {/* Cosita para que se vea bonito el estatus de pagado*/}
                  <td>
                    <button 
                      className="btn-secondary" 
                      onClick={() => handleDescargarRecibo(p.concepto)}
                    >
                      Descargar PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}