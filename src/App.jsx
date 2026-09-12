import { useMemo, useState } from 'react';
import './App.css';

const resources = [
  {
    id: 1,
    type: 'Artículo',
    icon: '📖',
    title: 'Introducción a la energía',
    subject: 'Ciencias',
    level: 'Secundaria',
    description: 'Conoce los tipos de energía y sus transformaciones con una lectura breve.',
    duration: '8 min',
    color: 'mint',
  },
  {
    id: 2,
    type: 'Ejercicio',
    icon: '✦',
    title: 'Repaso de matemáticas',
    subject: 'Matemáticas',
    level: 'Primaria',
    description: 'Pon a prueba tus conocimientos con un cuestionario interactivo.',
    duration: '10 min',
    color: 'purple',
  },
  {
    id: 3,
    type: 'PDF',
    icon: '▤',
    title: 'Guía de estudio: historia',
    subject: 'Historia',
    level: 'Secundaria',
    description: 'Descarga esta guía imprimible para repasar los temas de clase.',
    duration: 'PDF',
    color: 'orange',
  },
  {
    id: 4,
    type: 'Video',
    icon: '▶',
    title: 'El sistema solar',
    subject: 'Ciencias',
    level: 'Primaria',
    description: 'Una explicación visual para aprender sobre planetas y estrellas.',
    duration: '12 min',
    color: 'blue',
  },
];

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeView, setActiveView] = useState('Inicio');
  const [query, setQuery] = useState('');
  const [subject, setSubject] = useState('Todas');
  const [level, setLevel] = useState('Todos');
  const [completed, setCompleted] = useState([]);
  const [notice, setNotice] = useState('');
  const [showExercise, setShowExercise] = useState(false);
  const [answer, setAnswer] = useState('');

  const filteredResources = useMemo(() => resources.filter((resource) => {
    const matchesQuery = `${resource.title} ${resource.description}`.toLowerCase().includes(query.toLowerCase());
    const matchesSubject = subject === 'Todas' || resource.subject === subject;
    const matchesLevel = level === 'Todos' || resource.level === level;
    return matchesQuery && matchesSubject && matchesLevel;
  }), [query, subject, level]);

  const completeResource = (resource) => {
    setCompleted((current) => current.includes(resource.id) ? current : [...current, resource.id]);
    setNotice(`${resource.title} agregado a tu progreso.`);
  };

  const downloadPdf = () => {
    window.print();
    setNotice('La guía está lista para guardarse como PDF.');
  };

  const handleLogin = (event) => {
    event.preventDefault();
    setIsLoggedIn(true);
  };

  const handleExercise = (event) => {
    event.preventDefault();
    if (answer === '8') {
      completeResource(resources[1]);
      setNotice('¡Respuesta correcta! Has completado el ejercicio.');
    } else {
      setNotice('Casi. Intenta de nuevo: 5 + 3 = ?');
    }
  };

  if (!isLoggedIn) {
    return (
      <main className="login-page">
        <section className="login-card">
          <div className="brand-mark">✦</div>
          <p className="eyebrow">AULA ABIERTA</p>
          <h1>Aprende a tu ritmo.</h1>
          <p className="login-copy">Contenido educativo claro, accesible y disponible incluso con conexión lenta.</p>
          <form onSubmit={handleLogin}>
            <label htmlFor="email">Correo electrónico</label>
            <input id="email" type="email" placeholder="tu@correo.com" value={email} onChange={(event) => setEmail(event.target.value)} required />
            <label htmlFor="password">Contraseña</label>
            <input id="password" type="password" placeholder="••••••••" value={password} onChange={(event) => setPassword(event.target.value)} required />
            <button className="primary-button" type="submit">Iniciar sesión <span>→</span></button>
          </form>
          <p className="login-footer">¿Aún no tienes cuenta? <button type="button" className="link-button">Regístrate gratis</button></p>
        </section>
        <aside className="login-art">
          <div className="sun">✦</div>
          <div className="art-card card-one">📚<strong>Aprende</strong><small>Más de 100 recursos</small></div>
          <div className="art-card card-two">✓<strong>Avanza</strong><small>Visualiza tu progreso</small></div>
          <div className="art-orbit orbit-one" />
          <div className="art-orbit orbit-two" />
          <p>Tu curiosidad<br /><strong>es el comienzo.</strong></p>
        </aside>
      </main>
    );
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark">✦</span><span>Aula<br /><b>Abierta</b></span></div>
        <nav>
          {['Inicio', 'Mi progreso', 'Mis cursos'].map((item) => (
            <button key={item} className={activeView === item ? 'nav-item active' : 'nav-item'} onClick={() => setActiveView(item)}>
              <span>{item === 'Inicio' ? '⌂' : item === 'Mi progreso' ? '◔' : '▣'}</span>{item}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom"><div className="help-icon">?</div><span>¿Necesitas ayuda?<br /><b>Centro de soporte</b></span></div>
      </aside>
      <main className="content">
        <header className="topbar">
          <div className="mobile-brand">✦ Aula Abierta</div>
          <div className="top-actions"><button className="icon-button" aria-label="Notificaciones">♧</button><div className="avatar">{email.charAt(0).toUpperCase() || 'A'}</div><span className="user-name">{email.split('@')[0] || 'Estudiante'}</span><button className="logout" onClick={() => setIsLoggedIn(false)}>Salir</button></div>
        </header>
        <div className="page-body">
          {activeView === 'Mi progreso' ? (
            <section className="progress-view"><p className="eyebrow">TU CAMINO</p><h1>Mi progreso</h1><div className="progress-large"><div className="progress-ring">{completed.length * 25}<small>%</small></div><div><h2>¡Vas muy bien!</h2><p>Has completado {completed.length} de {resources.length} actividades del Sprint 1.</p></div></div></section>
          ) : (
            <>
              <section className="welcome"><div><p className="eyebrow">MI ESPACIO DE APRENDIZAJE</p><h1>Hola, {email.split('@')[0] || 'estudiante'} 👋</h1><p>¿Qué te gustaría aprender hoy?</p></div><div className="progress-card"><div className="progress-heading"><span>Tu progreso</span><b>{completed.length * 25}%</b></div><div className="progress-bar"><span style={{ width: `${completed.length * 25}%` }} /></div><small>{completed.length} de {resources.length} actividades completadas</small></div></section>
              <section className="search-section"><div className="search-box">⌕<input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Busca artículos, ejercicios, temas..." /></div><select value={subject} onChange={(event) => setSubject(event.target.value)}><option>Todas</option><option>Matemáticas</option><option>Ciencias</option><option>Historia</option></select><select value={level} onChange={(event) => setLevel(event.target.value)}><option>Todos</option><option>Primaria</option><option>Secundaria</option></select></section>
              <section><div className="section-heading"><div><p className="eyebrow">PARA TI</p><h2>Continúa aprendiendo</h2></div><button className="text-button" onClick={() => { setQuery(''); setSubject('Todas'); setLevel('Todos'); }}>Ver todo <span>→</span></button></div><div className="resource-grid">{filteredResources.map((resource) => <article className="resource-card" key={resource.id}><div className={`resource-icon ${resource.color}`}>{resource.icon}</div><div className="resource-meta"><span>{resource.type}</span><span>•</span><span>{resource.duration}</span></div><h3>{resource.title}</h3><p>{resource.description}</p><button className="card-action" onClick={() => resource.type === 'PDF' ? downloadPdf() : resource.type === 'Ejercicio' ? setShowExercise(true) : completeResource(resource)}>{completed.includes(resource.id) ? 'Completado ✓' : resource.type === 'PDF' ? 'Descargar guía →' : resource.type === 'Video' ? 'Ver video →' : 'Comenzar →'}</button></article>)}</div></section>
              <section className="next-section"><div className="section-heading"><div><p className="eyebrow">PRÓXIMAMENTE</p><h2>Más formas de aprender</h2></div></div><div className="feature-row"><div><span className="feature-icon">🎧</span><div><h3>Audiolibros y podcasts</h3><p>Aprende escuchando, estés donde estés.</p></div></div><div><span className="feature-icon">💬</span><div><h3>Foro de dudas</h3><p>Comparte y resuelve preguntas con la comunidad.</p></div></div></div></section>
            </>
          )}
        </div>
        {notice && <div className="toast" role="status">{notice}<button onClick={() => setNotice('')}>×</button></div>}
      </main>
      {showExercise && <div className="modal-backdrop" onClick={() => setShowExercise(false)}><div className="exercise-modal" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setShowExercise(false)}>×</button><p className="eyebrow">EJERCICIO INTERACTIVO</p><h2>Repaso de matemáticas</h2><p>Si tienes 5 manzanas y recibes 3 más, ¿cuántas tienes en total?</p><form onSubmit={handleExercise}><input type="number" value={answer} onChange={(event) => setAnswer(event.target.value)} placeholder="Tu respuesta" required /><button className="primary-button" type="submit">Comprobar respuesta</button></form></div></div>}
    </div>
  );
}

export default App;
