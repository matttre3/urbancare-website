'use client'

import { useEffect, useRef, useState } from 'react'
import { createPrivacyChoice, minimiseAnalyticsPayload, privacyStorageKey, readPrivacyChoice, type PrivacyChoice } from '@/lib/privacy'

type Config = { scriptUrl: string; websiteId: string; domains: string }
declare global {
  interface Window {
    urbancareUmamiBeforeSend?: (type: string, payload: Record<string, unknown>) => Record<string, unknown> | false
    umami?: { track: () => unknown }
  }
}
function browserOptOut() {
  return ['1', 'yes'].includes(navigator.doNotTrack || '') || (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true
}

export function PrivacyConsent({ config }: { config?: Config }) {
  const [choice, setChoice] = useState<PrivacyChoice | null>(null)
  const [ready, setReady] = useState(false)
  const [open, setOpen] = useState(false)
  const current = useRef<PrivacyChoice | null>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const restore = () => {
      let saved: PrivacyChoice | null = null
      try { saved = readPrivacyChoice(localStorage.getItem(privacyStorageKey)) } catch {}
      current.current = saved
      setChoice(saved)
      setReady(true)
    }
    restore()
    // This gate also stops a tracker already loaded before withdrawal or expiry.
    window.urbancareUmamiBeforeSend = (type, payload) => {
      const valid = readPrivacyChoice(JSON.stringify(current.current))
      if (!config || !valid?.analytics || browserOptOut()) return false
      return minimiseAnalyticsPayload(type, payload, location.origin)
    }
    const storage = (event: StorageEvent) => { if (event.key === privacyStorageKey || event.key === null) restore() }
    const refresh = () => restore()
    const openPreferences = (event: MouseEvent) => {
      const button = event.target instanceof Element ? event.target.closest<HTMLButtonElement>('[data-privacy-settings]') : null
      if (!button) return
      trigger.current = button
      setOpen(true)
      dialog.current?.showModal()
    }
    document.addEventListener('click', openPreferences)
    window.addEventListener('storage', storage)
    window.addEventListener('focus', refresh)
    return () => {
      window.urbancareUmamiBeforeSend = () => false
      document.removeEventListener('click', openPreferences)
      window.removeEventListener('storage', storage)
      window.removeEventListener('focus', refresh)
    }
  }, [config])

  useEffect(() => {
    if (!ready || !choice?.analytics || !config || browserOptOut() || document.getElementById('umami-tracker')) return
    const script = document.createElement('script')
    script.id = 'umami-tracker'
    script.src = config.scriptUrl
    script.defer = true
    Object.assign(script.dataset, { websiteId: config.websiteId, domains: config.domains, excludeSearch: 'true', excludeHash: 'true', doNotTrack: 'true', fetchCredentials: 'omit', beforeSend: 'urbancareUmamiBeforeSend' })
    document.body.append(script)
  }, [ready, choice, config])

  function choose(analytics: boolean) {
    const previous = current.current?.analytics
    const next = createPrivacyChoice(analytics)
    current.current = next
    try { localStorage.setItem(privacyStorageKey, JSON.stringify(next)) } catch {}
    setChoice(next)
    dialog.current?.close()
    setOpen(false)
    if (analytics && !previous && config && !browserOptOut()) window.umami?.track()
  }
  const actions = <div className="uc-privacy-actions"><button type="button" onClick={() => choose(false)}>Rifiuta</button><button type="button" onClick={() => choose(true)}>Accetta</button></div>
  return <div className="uc-privacy">
    {ready && !choice && !open && <section className="uc-privacy-banner" aria-labelledby="uc-privacy-title">
      <h2 id="uc-privacy-title">La tua privacy, la tua scelta.</h2>
      <p>Usiamo memorie tecniche per il funzionamento del sito e le tue preferenze. Solo con il tuo consenso misuriamo le visite con Umami, senza cookie di analisi. Puoi rifiutare e continuare a navigare.</p>
      {actions}<a href="/privacy-policy">Leggi l’informativa privacy</a>
    </section>}
    <dialog id="uc-privacy-dialog" ref={dialog} aria-labelledby="uc-preferences-title" onClose={() => { setOpen(false); trigger.current?.focus() }}>
      <button className="uc-privacy-close" type="button" aria-label="Chiudi preferenze privacy" onClick={() => dialog.current?.close()}>×</button>
      <h2 id="uc-preferences-title">Preferenze privacy</h2>
      <p>Le memorie tecniche sono necessarie al sito. Le statistiche Umami sono facoltative e partono solo se le accetti.</p>
      <p>Scelta attuale: <strong>{choice ? choice.analytics ? 'statistiche accettate' : 'statistiche rifiutate' : 'non ancora espressa'}</strong>.</p>
      <p>Conserviamo la scelta su questo browser per sei mesi. Puoi revocarla in qualsiasi momento: la revoca blocca le statistiche successive.</p>
      <p>Rispettiamo anche Do Not Track e Global Privacy Control: se attivi, le statistiche restano disabilitate.</p>
      {actions}<a href="/privacy-policy">Leggi l’informativa privacy</a>
    </dialog>
  </div>
}
