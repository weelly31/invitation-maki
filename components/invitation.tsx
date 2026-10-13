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
          <p className="personal-eyebrow">A little note from my heart</p>
          <h1 id="welcome-title">You are one of my<br /><em>favorite people.</em></h1>
          <p className="personal-subtitle">Your love, laughter, and kindness mean so much to me. I have a tiny but very special question just for you.</p>
          <div className="welcome-note">Your presence would make this moment even more beautiful</div>
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
          <p className="personal-eyebrow">My heart is overflowing</p>
          <h1 id="thanks-title"><span>Thank you,</span><em>Ninang/Ninong</em></h1>
          <p className="personal-subtitle">Your warm “yes” filled my heart with so much joy. I feel so loved, blessed, and grateful to have someone as wonderful as you cheering me on.</p>
          <p className="thanks-message">Your presence, prayers, and love are gifts I will treasure forever. I can&apos;t wait for all the hugs, laughs, and beautiful memories we&apos;ll share together.</p>
          <div className="heart-row" aria-hidden="true"><Heart /><Heart /><Heart /></div>
          <p className="thanks-signoff">With love, Makarius</p>
        </div>
      </main>
    )
  }

  return (
    <main className="personal-invite invite-step" aria-label="Makarius invitation">
      <div className="floating-star star-one" aria-hidden="true">✦</div>
      <div className="floating-star star-two" aria-hidden="true">✧</div>
      <div className="personal-card invite-card">
        <p className="personal-eyebrow">A special invitation for you</p>
        <div className="invite-badge">With all my tiny heart</div>
        <p className="personal-message">I&apos;m Makarius Kleon Andrade. I may be little, but my heart is already overflowing with love, and I&apos;d be so happy if you joined me on this very special day.</p>
        <div className="baby-picture" role="img" aria-label="A sweet photo of Makarius as a baby">
          <div className="picture-glow" aria-hidden="true" />
          <img src="/images/baby-photo.png" alt="Makarius crawling in a light embroidered shirt" />
        </div>
        <p className="question-kicker">With all my tiny heart...</p>
        <h2>Will You Be My<br /><em>Ninong/Ninang</em></h2>
        <p className="invite-blessing">Your love, prayers, and guidance would mean the world to me as I grow, learn, and dream big.</p>
        <button className="yes-button" onClick={() => setStep('thanks')}><Sparkles data-icon="inline-start" /> Yes, I&apos;d love to <Sparkles data-icon="inline-end" /></button>
      </div>
    </main>
  )
}

export default Invitation
