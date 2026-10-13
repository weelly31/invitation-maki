'use client'

import { FormEvent, useState } from 'react'
import { ArrowRight, Check, Heart, Sparkles } from 'lucide-react'

export function Invitation() {
  const [name, setName] = useState('')
  const [draftName, setDraftName] = useState('')
  const [step, setStep] = useState<'name' | 'invite' | 'thanks'>('name')

  const submitName = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmedName = draftName.trim()
    if (!trimmedName) return
    setName(trimmedName)
    setStep('invite')
  }

  if (step === 'name') {
    return (
      <main className="personal-invite name-step" aria-labelledby="name-title">
        <div className="floating-star star-one" aria-hidden="true">✦</div>
        <div className="floating-star star-two" aria-hidden="true">✧</div>
        <div className="personal-card name-card">
          <div className="mini-sun" aria-hidden="true"><Sparkles /></div>
          <p className="personal-eyebrow">A little message for you</p>
          <h1 id="name-title">Before we begin,<br /><em>what&apos;s your name?</em></h1>
          <p className="personal-subtitle">I have something special to ask you.</p>
          <form className="name-form" onSubmit={submitName}>
            <label htmlFor="guest-name">Your name</label>
            <input id="guest-name" value={draftName} onChange={(event) => setDraftName(event.target.value)} placeholder="Type your name" autoComplete="name" autoFocus />
            <button type="submit">Continue <ArrowRight data-icon="inline-end" /></button>
          </form>
        </div>
      </main>
    )
  }

  if (step === 'thanks') {
    return (
      <main className="personal-invite thanks-step" aria-labelledby="thanks-title">
        <div className="personal-card thanks-card">
          <div className="thanks-icon" aria-hidden="true"><Check /></div>
          <p className="personal-eyebrow">From the bottom of my little heart</p>
          <h1 id="thanks-title"><span>Thank you,</span><em>Ninang/Ninong {name}!</em></h1>
          <p className="personal-subtitle">I&apos;m so happy you said yes. I can&apos;t wait for all the hugs, laughs, and memories we&apos;ll share.</p>
          <div className="heart-row" aria-hidden="true"><Heart /><Heart /><Heart /></div>
        </div>
      </main>
    )
  }

  return (
    <main className="personal-invite invite-step" aria-labelledby="invite-title">
      <div className="floating-star star-one" aria-hidden="true">✦</div>
      <div className="floating-star star-two" aria-hidden="true">✧</div>
      <div className="personal-card invite-card">
        <p className="personal-eyebrow">A special message for you</p>
        <h1 id="invite-title">Hi, <em>{name}!</em></h1>
        <p className="personal-message">I&apos;m Makarius Kleon Andrade. I may be little, but I have a very big question for someone very special.</p>
        <div className="baby-picture" role="img" aria-label="A sweet baby photo placeholder with a growing-up animation">
          <div className="picture-glow" aria-hidden="true" />
          <img src="/placeholder-user.jpg" alt="Makarius as a baby" />
          <span className="picture-caption">watch me grow</span>
        </div>
        <p className="question-kicker">With all my tiny heart...</p>
        <h2>Will you be my<br /><em>Ninong or Ninang?</em></h2>
        <button className="yes-button" onClick={() => setStep('thanks')}><Sparkles data-icon="inline-start" /> Yes, I&apos;d love to! <Sparkles data-icon="inline-end" /></button>
      </div>
    </main>
  )
}

export default Invitation
