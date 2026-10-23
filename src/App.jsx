import { useState } from 'react'
import { config as c } from './config.js'

export default function App() {
  const [paso, setPaso] = useState('sobre')
  return (
    <main className={`papel ${paso === 'sobre' ? 'sin-iglesia' : ''}`}>
      <div className="iglesia-fondo" aria-hidden="true"></div>
      {paso === 'sobre' ? (
        <section className="sobre-inicial" key="sobre">
          <div className="sobre-carta" role="button" tabIndex="0" onClick={() => setPaso('portada')} onKeyDown={(event) => event.key === 'Enter' && setPaso('portada')}>
            <div className="solapa"></div>
            <div className="flores-sobre flores-arriba" aria-hidden="true">❧</div>
            <div className="flores-sobre flores-abajo" aria-hidden="true">❧</div>
            <div className="sello-carta">C <span>♥</span> A</div>
            <p className="sobre-titulo">Nuestra<br /><strong>historia de amor</strong></p>
            <span className="abrir-sobre">Abrir invitación <b>→</b></span>
          </div>
          <p className="instruccion">Haz clic sobre el sobre para abrirlo</p>
        </section>
      ) : paso === 'portada' ? (
        <section className="portada" key="portada">
          <div className="ramita ramita-izquierda" aria-hidden="true">✦</div>
          <div className="sobre">
            <p className="eyebrow">Una historia que elegimos para siempre</p>
            <p className="frase">“{c.frase}”</p>
            <div className="sello" aria-hidden="true">C <span>♥</span> A</div>
            <img className="foto" src="/pareja.png" alt="Retrato a lápiz de la pareja" />
            <h1 className="nombres">{c.nombres}</h1>
           
            <blockquote className="salmo">“Así que no son ya más dos, sino una sola carne; por tanto, lo que Dios juntó, no lo separe el hombre.”<cite>Mateo 19:6</cite></blockquote>
            <div className="anillos" aria-label="Dos anillos entrelazados" role="img">
              <span></span><span></span>
            </div>
            <button className="boton" onClick={() => setPaso('info')}>
              <span>Ver información</span>
              <span className="flecha" aria-hidden="true">→</span>
            </button>
          </div>
          <div className="ramita ramita-derecha" aria-hidden="true">✦</div>
        </section>
      ) : (
        <section className="info" key="info">
          <p className="eyebrow">El comienzo de nuestro para siempre</p>
          <h2 className="nombres">{c.nombres}</h2>
          <p className="invita">Nos casamos y queremos celebrar este día rodeados de las personas que hacen más bonita nuestra historia.</p>
          <svg className="trazo" viewBox="0 0 200 8" aria-hidden="true">
            <path d="M2 5 C40 1, 70 7, 100 4 S170 2, 198 5" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <dl className="datos">
            <div className="dato"><dt><span className="icono" aria-hidden="true">◷</span> Cuándo</dt><dd>{c.fecha}<br /><strong>{c.hora}</strong></dd></div>
            <div className="dato"><dt><span className="icono" aria-hidden="true">⌖</span> Dónde</dt><dd>{c.lugar}<br /><strong>{c.ciudad}</strong></dd></div>
          </dl>
          <a className="boton" href={c.mapsUrl} target="_blank" rel="noopener noreferrer">
            <span>Ver ubicación</span><span className="flecha" aria-hidden="true">↗</span>
          </a>
          <button className="volver" onClick={() => setPaso('portada')}>Volver</button>
        </section>
      )}
    </main>
  )
}
