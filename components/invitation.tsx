'use client'

import { useState } from 'react'
import { ArrowDown, ArrowRight, CalendarDays, Check, ChevronDown, Cross, Heart, Sparkles, Sun, X } from 'lucide-react'

const details = [
  { icon: CalendarDays, label: 'The day', value: 'Date to be announced' },
  { icon: Sun, label: 'The time', value: 'Time to be announced' },
  { icon: Cross, label: 'The place', value: 'Venue to be announced' },
]

export function Invitation() {
  const [opened, setOpened] = useState(false)
  const [accepted, setAccepted] = useState(false)
  const [noCount, setNoCount] = useState(0)

  const sayYes = () => {
    setAccepted(true)
    window.setTimeout(() => document.getElementById('celebration')?.scrollIntoView({ behavior: 'smooth' }), 80)
  }

  const playfulNo = () => setNoCount((count) => count + 1)
  const noLabel = ['Maybe later', 'Let me think...', 'Ask me again?', 'I’m warming up!', 'Yes is right there →'][Math.min(noCount, 4)]

  if (!opened) {
    return (
      <main className="invite-shell welcome-screen" aria-labelledby="welcome-title">
        <div className="star-field" aria-hidden="true"><span /><span /><span /><span /><span /></div>
        <div className="welcome-orbit orbit-one" aria-hidden="true" />
        <div className="welcome-orbit orbit-two" aria-hidden="true" />
        <div className="welcome-content">
          <p className="eyebrow light-eyebrow"><Sparkles aria-hidden="true" /> A little invitation from a little boy</p>
          <div className="baby-sun" aria-hidden="true"><Sun /></div>
          <p className="welcome-kicker">You have been chosen for something special</p>
          <h1 id="welcome-title">Will you be my<br /><em>Ninong or Ninang?</em></h1>
          <p className="welcome-name">Makarius Kleon Andrade</p>
          <button className="open-button" onClick={() => setOpened(true)}>
            Open your invitation <ArrowRight data-icon="inline-end" />
          </button>
          <p className="tiny-note">A tiny request with a very big heart</p>
        </div>
        <div className="welcome-footer"><span>01</span><span className="footer-line" /><span>First birthday & dedication</span></div>
      </main>
    )
  }

  return (
    <main className="invite-shell" id="top">
      <div className="ambient ambient-a" aria-hidden="true" /><div className="ambient ambient-b" aria-hidden="true" />
      <nav className="top-nav" aria-label="Invitation navigation"><span className="nav-mark">MK<span>.</span></span><span className="nav-caption">A very special request</span><a href="#question">The big question <ArrowDown aria-hidden="true" /></a></nav>

      <section className="hero-section section-pad" aria-labelledby="hero-title">
        <div className="hero-copy"><p className="eyebrow"><span className="eyebrow-line" /> A note from Makarius</p><h1 id="hero-title">Dear <em>favorite</em><br />grown-up,</h1><p className="hero-lead">I may be small, but I have a big question for someone very special.</p><button className="text-link" onClick={() => document.getElementById('request')?.scrollIntoView({ behavior: 'smooth' })}>Read my little request <ArrowDown data-icon="inline-end" /></button></div>
        <div className="hero-portrait" aria-label="A whimsical sun illustration representing Makarius"><div className="sun-halo" /><div className="sun-face"><span className="eye left" /><span className="eye right" /><span className="cheek left" /><span className="cheek right" /><span className="smile" /></div><div className="portrait-spark spark-a">✦</div><div className="portrait-spark spark-b">·</div></div>
      </section>

      <section className="request-section section-pad" id="request" aria-labelledby="request-title"><div className="section-number">01 / 03</div><div className="request-grid"><div><p className="eyebrow"><span className="eyebrow-line" /> A special little request</p><h2 id="request-title">Would you help me<br /><em>find my way?</em></h2></div><div className="request-letter"><p>Hi! I’m <strong>Makarius Kleon Andrade</strong>, and I’m turning one soon.</p><p>As I grow, I’ll need someone kind, loving, and a little bit fun to guide me through life. Someone who will cheer for my tiny wins, teach me big lessons, and help me grow in faith.</p><p>My family thinks that person could be <strong>you.</strong></p><div className="signature">with love, <span>Makarius</span></div></div></div></section>

      <section className="journey-section section-pad" aria-labelledby="journey-title"><div className="section-number">02 / 03</div><div className="journey-card"><div className="journey-icon"><Heart aria-hidden="true" /></div><div><p className="eyebrow"><span className="eyebrow-line" /> The meaningful part</p><h2 id="journey-title">A little guide.<br /><em>A lifelong light.</em></h2><p className="journey-copy">Being a godparent is more than a title. It’s a promise to be there—with love, wisdom, prayers, and maybe the occasional treat when Mama isn’t looking.</p><div className="values"><span>Faith</span><span>Kindness</span><span>Joy</span><span>Always</span></div></div></div></section>

      <section className="question-section section-pad" id="question" aria-labelledby="question-title"><div className="question-cloud cloud-left" aria-hidden="true" /><div className="question-cloud cloud-right" aria-hidden="true" /><div className="section-number">03 / 03</div><p className="eyebrow centered"><span className="eyebrow-line" /> The big question <span className="eyebrow-line" /></p><h2 id="question-title">Will you be my<br /><em>Ninong or Ninang?</em></h2><p className="question-sub">I promise to make it worth it. There will be hugs,<br className="desktop-only" /> giggles, and a lifetime of little updates.</p><div className="answer-buttons"><button className="yes-button" onClick={sayYes}><Sparkles data-icon="inline-start" /> YES, I’LL BE YOUR GODPARENT! <Sparkles data-icon="inline-end" /></button><button className="maybe-button" onClick={playfulNo} aria-label={noLabel}>{noLabel} <X data-icon="inline-end" /></button></div>{noCount > 0 && <p className="playful-hint" role="status">Psst... the sparkly button is the one I’m hoping for.</p>}</section>

      <section className={`celebration-section section-pad ${accepted ? 'is-accepted' : ''}`} id="celebration" aria-live="polite"><div className="celebration-confetti" aria-hidden="true"><span>✦</span><span>✧</span><span>•</span><span>✦</span><span>·</span></div><div className="celebration-badge"><Check aria-hidden="true" /></div><p className="eyebrow centered"><span className="eyebrow-line" /> It’s a yes! <span className="eyebrow-line" /></p><h2>{accepted ? <>You just made my<br /><em>little world brighter.</em></> : <>The happiest<br /><em>yes ever.</em></>}</h2><p className="celebration-copy">Thank you for saying yes to being part of my story. I can’t wait for all the memories we’ll make together.</p><div className="details-grid">{details.map(({ icon: Icon, label, value }) => <div className="detail-item" key={label}><Icon aria-hidden="true" /><span>{label}</span><strong>{value}</strong></div>)}</div><button className="save-button" onClick={() => window.print()}><CalendarDays data-icon="inline-start" /> Save the date <ArrowRight data-icon="inline-end" /></button></section>

      <footer className="invite-footer"><span>MK<span className="nav-mark-dot">.</span></span><span>Made with a little love for a big milestone</span><a href="#top">Back to top ↑</a></footer>
    </main>
  )
}

export default Invitation

