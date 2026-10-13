'use client'

import { useState, useEffect } from 'react'
import { ArrowRight, Heart, Sparkles } from 'lucide-react'

export function Invitation() {
  const [step, setStep] = useState<'creation' | 'reveal' | 'celebrate'>('creation')

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [step])

  // PAGE 1 — GOD’S WONDERFUL CREATION 🌎☀️
  if (step === 'creation') {
    return (
      <main className="personal-invite creation-step" aria-labelledby="creation-title">
        <div className="floating-star star-one" aria-hidden="true">✦</div>
        <div className="floating-star star-two" aria-hidden="true">✧</div>

        <article className="personal-card story-card">
          <div className="card-top-icon" aria-hidden="true">
            <span className="icon-emoji">🌎☀️</span>
          </div>

          <p className="story-eyebrow">A Little Story for Someone Special</p>
          <h1 id="creation-title" className="story-title">
            God’s Wonderful<br /><em>Creation</em>
          </h1>

          <blockquote className="scripture-quote">
            “In the beginning, God created the heavens and the earth…”
          </blockquote>

          <p className="story-text">
            He painted the skies with beautiful colors, made the flowers bloom, filled the oceans with life, and placed the stars in the night sky.
          </p>

          <p className="story-text">
            And among all the wonderful things He created, He gave Mommy and Daddy their most precious gift…
          </p>

          <div className="gift-highlight" aria-label="Most precious gift: ME!">
            <span className="gift-badge">ME! 🧸🤍</span>
          </div>

          <p className="story-text">
            I’m just a little one discovering this big, beautiful world that God made. And as I grow, I know He has so many wonderful things planned for me.
          </p>

          <p className="story-text">
            But today, I have a little something prepared for someone who holds a special place in my story…
          </p>

          <div className="surprise-teaser">
            <p className="surprise-lead">Are you ready for a little surprise? ✨</p>
            <p className="surprise-sub">There’s something I’d really love to ask you!</p>
          </div>

          <button
            type="button"
            className="action-button surprise-button"
            onClick={() => setStep('reveal')}
          >
            A Little Surprise Awaits <ArrowRight data-icon="inline-end" />
          </button>
        </article>
      </main>
    )
  }

  // PAGE 2 — THE BIG REVEAL 💌
  if (step === 'reveal') {
    return (
      <main className="personal-invite reveal-step" aria-labelledby="reveal-title">
        <div className="floating-star star-one" aria-hidden="true">✦</div>
        <div className="floating-star star-two" aria-hidden="true">✧</div>

        <article className="personal-card reveal-card">
          <div className="card-top-icon" aria-hidden="true">
            <span className="icon-emoji">💌</span>
          </div>

          <p className="story-eyebrow">Drumroll, Please… 🥁</p>
          <h1 id="reveal-title" className="reveal-title">
            I Have a Special<br /><em>Question for You</em> 🤍
          </h1>

          <p className="story-text">
            God has blessed me with the gift of life, a loving family, and a beautiful world to grow up in. And I believe that one of His sweetest blessings is the people He places in my life to love me, pray for me, and guide me closer to Him.
          </p>

          <p className="story-text">
            Mommy and Daddy have someone very special in mind… someone they would love to be part of my journey as I grow in faith and discover God’s wonderful plans for me.
          </p>

          <div className="someone-badge" aria-label="And that someone is YOU!">
            And that someone is YOU! 🥹
          </div>

          <div className="baby-picture" role="img" aria-label="A sweet photo of Baby Maki">
            <div className="picture-glow" aria-hidden="true" />
            <img src="/images/baby-photo.png" alt="Baby Makarius smiling happily" />
          </div>

          <div className="question-block">
            <p className="question-kicker">With all my tiny heart...</p>
            <h2 className="question-headline">
              Will You Be My<br />
              <em className="ninong-text">Ninang/Ninong?</em> 🌷
            </h2>
            <p className="question-description">
              Will you be one of the special people who will pray for me, cheer for my little milestones, guide me in God’s ways, and remind me of His unfailing love throughout my life?
            </p>
          </div>

          <blockquote className="verse-pill">
            “Every good and perfect gift is from above.”
            <span>— James 1:17</span>
          </blockquote>

          <button
            type="button"
            className="action-button yes-button"
            onClick={() => setStep('celebrate')}
          >
            <Sparkles data-icon="inline-start" /> YES! I’D LOVE TO! 🤍 <Sparkles data-icon="inline-end" />
          </button>
        </article>
      </main>
    )
  }

  // PAGE 3 / CELEBRATION — THANK YOU MESSAGE 🌎♡
  return (
    <main className="personal-invite thanks-step" aria-labelledby="thanks-title">
      <div className="floating-star star-one" aria-hidden="true">✦</div>
      <div className="floating-star star-two" aria-hidden="true">✧</div>

      <article className="personal-card thanks-card">
        <div className="celebration-badge" aria-hidden="true">
          <Heart className="celebration-heart" />
        </div>

        <p className="story-eyebrow">My Heart Is Full</p>

        <h1 id="thanks-title" className="thanks-title">
          <span>Thank you,</span>
          <em>Ninang/Ninong</em>
        </h1>

        <div className="thanks-message-box">
          <p className="thanks-main-text">
            Yaaay! I can’t wait to make beautiful memories with you! Thank you for being part of God’s wonderful story for me. 🌎
          </p>

          <div className="heart-row" aria-hidden="true">
            <Heart />
            <Heart />
            <Heart />
          </div>

          <div className="thanks-signature">
            <span>With love,</span>
            <strong>Baby Maki ♡</strong>
          </div>
        </div>

        <button
          type="button"
          className="replay-button"
          onClick={() => setStep('creation')}
        >
          ← Read Our Story Again
        </button>
      </article>
    </main>
  )
}

export default Invitation
