'use client'

import { useState } from 'react'
import { ArrowRight, Check, Heart, Sparkles } from 'lucide-react'

export function Invitation() {
  const [step, setStep] = useState<'welcome' | 'invite' | 'thanks'>('welcome')

  if (step === 'welcome') {
    return (
      <main className="personal-invite welcome-step" aria-labelledby="welcome-title">
        <div className="floating-star star-one" aria-hidden="true">✦</div>
        <div className="floating-star star-two" aria-hidden="true">✧</div>
        <div className="personal-card welcome-card">
          <div className="mini-sun" aria-hidden="true"><Sparkles /></div>
          <p className="personal-eyebrow">A little message from Makarius</p>
          <h1 id="welcome-title">You are one of my<br /><em>very special people.</em></h1>
          <p className="personal-subtitle">Thank you for being part of my little world. I have a heartfelt question just for you.</p>
          <button className="welcome-button" onClick={() => setStep('invite')}>Open your invitation <ArrowRight data-icon="inline-end" /></button>
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
          <h1 id="thanks-title"><span>Thank you,</span><em>Ninang/Ninong!</em></h1>
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
        <h1 id="invite-title">Hi, <em>special one!</em></h1>
        <p className="personal-message">I&apos;m Makarius Kleon Andrade. I may be little, but I have a very big question for someone very special.</p>
        <div className="baby-picture" role="img" aria-label="A sweet baby photo placeholder with a growing-up animation">
          <div className="picture-glow" aria-hidden="true" />
          <img src="/placeholder-user.jpg" alt="Makarius as a baby" />
          <span className="picture-caption">watch me grow</span>
        </div>
        <p className="question-kicker">With all my tiny heart...</p>
        <h2>Will You Be My<br /><em>Ninong/Ninang?</em></h2>
        <button className="yes-button" onClick={() => setStep('thanks')}><Sparkles data-icon="inline-start" /> Yes, I&apos;d love to! <Sparkles data-icon="inline-end" /></button>
      </div>
    </main>
  )
}

export default Invitation
