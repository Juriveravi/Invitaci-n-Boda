import { useEffect, useState } from 'react'
import { ArrowRight, ArrowUpRight, CalendarDays, Clock3, MapPin } from 'lucide-react'
import { config as c } from './config.js'

export default function App() {
  const [paso, setPaso] = useState('sobre')
  const [restante, setRestante] = useState(() => calcularRestante())

  useEffect(() => {
    const temporizador = window.setInterval(() => setRestante(calcularRestante()), 1000)
    return () => window.clearInterval(temporizador)
  }, [])

  function calcularRestante() {
    const diferencia = Math.max(0, new Date('2027-01-02T15:00:00-05:00').getTime() - Date.now())
    const totalSegundos = Math.floor(diferencia / 1000)
    return {
      dias: Math.floor(totalSegundos / 86400),
      horas: Math.floor((totalSegundos % 86400) / 3600),
      minutos: Math.floor((totalSegundos % 3600) / 60),
      segundos: totalSegundos % 60,
    }
  }

  const formato = (valor) => String(valor).padStart(2, '0')
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
          <p className="instruccion">Haz clic en el sobre para abrirlo</p>
        </section>
      ) : paso === 'portada' ? (
        <section className="portada" key="portada">
          <div className="ramita ramita-izquierda" aria-hidden="true">✦</div>
          <div className="sobre">
            <p className="eyebrow">Una historia que elegimos para siempre</p>
            <div className="sello" aria-hidden="true">C <span>♥</span> A</div>
            <img className="foto" src="/pareja.png" alt="Retrato a lápiz de la pareja" />

            <blockquote className="salmo">“Así que no son ya más dos, sino una sola carne; por tanto, lo que Dios juntó, no lo separe el hombre.”<cite>Mateo 19:6</cite></blockquote>
            <div className="anillos" aria-label="Dos anillos entrelazados" role="img">
              <span></span><span></span>
            </div>
            <button className="boton" onClick={() => setPaso('info')}>
              <span>Ver información</span>
              <ArrowRight className="icono-boton" aria-hidden="true" />
            </button>
            <button className="volver" onClick={() => setPaso('sobre')}>Volver</button>
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
            <div className="dato"><dt><Clock3 className="icono" aria-hidden="true" /> Cuándo</dt><dd>{c.fecha}<br /><strong>{c.hora}</strong></dd></div>
            <div className="dato"><dt><MapPin className="icono" aria-hidden="true" /> Dónde</dt><dd>{c.lugar}<br /><strong>{c.ciudad}</strong></dd></div>
          </dl>
          <section className="cuenta" aria-label="Cuenta regresiva para la boda">
            <p className="eyebrow">Faltan</p>
            <div className="contador">
              <div><strong>{restante.dias}</strong><span>días</span></div>
              <div><strong>{formato(restante.horas)}</strong><span>horas</span></div>
              <div><strong>{formato(restante.minutos)}</strong><span>minutos</span></div>
              <div><strong>{formato(restante.segundos)}</strong><span>segundos</span></div>
            </div>
          </section>
          <a className="boton" href={c.mapsUrl} target="_blank" rel="noopener noreferrer">
            <MapPin className="icono-boton" aria-hidden="true" /><span>Ver ubicación</span><ArrowUpRight className="icono-boton" aria-hidden="true" />
          </a>
          <button className="volver" onClick={() => setPaso('portada')}>Volver</button>
        </section>
      )}
    </main>
  )
}
