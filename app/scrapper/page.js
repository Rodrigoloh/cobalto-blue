'use client';
import { useState } from 'react';

export default function ScrapperDashboard() {
  // Estados para el login
  const [isAuth, setIsAuth] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Estados para el scraper
  const [rubro, setRubro] = useState('');
  const [zona, setZona] = useState('');
  const [filename, setFilename] = useState('');
  const [loading, setLoading] = useState(false);
  const [renderTime, setRenderTime] = useState(null);
  const [error, setError] = useState('');

  // Manejador del Login (Splash Screen)
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');

    // Hacemos una validación rápida llamando a nuestro backend
    try {
      const response = await fetch('/api/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ authCheck: true, username, password })
      });

      if (response.ok) {
        setIsAuth(true);
      } else {
        const errData = await response.json();
        setLoginError(errData.error || "Credenciales inválidas");
      }
    } catch (err) {
      setLoginError("Error al validar acceso.");
    }
  };

  // Manejador del Scraper
  const handleScrape = async (e) => {
    e.preventDefault();
    setLoading(true);
    setRenderTime(null);
    setError('');

    try {
      const response = await fetch('/api/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rubro, zona, filename, username, password })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Error en el proceso");
      }

      const timeFromHeader = response.headers.get('X-Render-Time');
      setRenderTime(timeFromHeader);

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${filename || 'matriz_prospectos'}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // VISTA 1: Splash Screen / Login
  if (!isAuth) {
    return (
      <div style={splashContainerStyle}>
        <div style={loginCardStyle}>
          <h1 style={{ fontSize: '28px', fontWeight: '900', marginBottom: '6px', color: '#0046ff', letterSpacing: '-0.5px' }}>Cobalto.blue</h1>
          <p style={{ fontSize: '13px', color: '#666', marginBottom: '24px' }}>Dataset scrapper • Introduce tus credenciales</p>
          
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={labelStyle}>Usuario</label>
              <input type="text" placeholder="Tu usuario" value={username} onChange={e => setUsername(e.target.value)} required style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Contraseña</label>
              <input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required style={inputStyle} />
            </div>

            {loginError && <p style={{ color: '#ff3333', fontSize: '13px', margin: '4px 0 0 0' }}>⚠️ {loginError}</p>}

            <button type="submit" style={buttonStyle}>Ingresar al Sistema</button>
          </form>
        </div>
      </div>
    );
  }

  // VISTA 2: El Dashboard del Scraper (Desbloqueado)
  return (
    <div style={{ padding: '60px 20px', maxWidth: '480px', margin: '0 auto', fontFamily: 'system-ui, sans-serif', color: '#111' }}>
      <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '4px', color: '#0046ff' }}>Cobalto.blue</h1>
          <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>Dashboard Privado de Mapeo Comercial</p>
        </div>
      </div>
      
      <form onSubmit={handleScrape} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label style={labelStyle}>Rubro / Nicho</label>
          <input type="text" placeholder="Ej. Dentistas, Gimnasios, Notarias" value={rubro} onChange={e => setRubro(e.target.value)} required style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle}>Zona / Ubicación</label>
          <input type="text" placeholder="Ej. Cumbres Monterrey, San Pedro" value={zona} onChange={e => setZona(e.target.value)} required style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle}>Nombre del Archivo de Salida</label>
          <input type="text" placeholder="Ej. prospectos_cumbres_junio" value={filename} onChange={e => setFilename(e.target.value)} required style={inputStyle} />
        </div>
        
        {error && <p style={{ color: '#ff3333', fontSize: '14px', margin: '0' }}>⚠️ {error}</p>}

        <button type="submit" disabled={loading} style={{...buttonStyle, opacity: loading ? 0.7 : 1}}>
          {loading ? 'Procesando Mapeo Técnico...' : 'Extraer Base de Datos'}
        </button>
      </form>

      {renderTime && (
        <div style={{ marginTop: '25px', padding: '16px', background: '#eef2ff', borderRadius: '8px', border: '1px solid #c7d2fe' }}>
          <span style={{ fontSize: '15px', color: '#3730a3', fontWeight: 'bold' }}>Matriz Descargada con Éxito</span>
          <div style={{ fontSize: '13px', color: '#4338ca', marginTop: '6px' }}>
            Tiempo total de carga: <strong>{renderTime}</strong>
          </div>
        </div>
      )}
    </div>
  );
}

// Estilos modulares de los componentes
const splashContainerStyle = { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f4f6f9', fontFamily: 'system-ui, sans-serif', padding: '20px' };
const loginCardStyle = { width: '100%', maxWidth: '400px', backgroundColor: '#ffffff', padding: '40px', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', boxSizing: 'border-box' };
const labelStyle = { display: 'block', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#555', marginBottom: '6px' };
const inputStyle = { width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '15px', boxSizing: 'border-box', outline: 'none', backgroundColor: '#fafafa', color: '#111' };
const buttonStyle = { width: '100%', padding: '14px', background: '#0046ff', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '15px', fontWeight: 'bold', marginTop: '10px', transition: 'all 0.2s' };