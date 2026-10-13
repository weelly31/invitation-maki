'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { ArrowRight, Heart, Sparkles, Volume2, VolumeX, BookOpen } from 'lucide-react'

export function Invitation() {
  const [step, setStep] = useState<'creation' | 'reveal' | 'celebrate'>('creation')
  const [soundEnabled, setSoundEnabled] = useState(true)
  const audioCtxRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [step])

  // Soft page flip sound with Web Audio
  const playPageTurn = useCallback(() => {
    if (!soundEnabled) return
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (!AudioCtx) return
      if (!audioCtxRef.current) audioCtxRef.current = new AudioCtx()
      const ctx = audioCtxRef.current
      if (ctx.state === 'suspended') ctx.resume()

      const now = ctx.currentTime
      const bufferSize = Math.floor(ctx.sampleRate * 0.22)
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
      const data = buffer.getChannelData(0)
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.06))
      }
      const noise = ctx.createBufferSource()
      noise.buffer = buffer
      const filter = ctx.createBiquadFilter()
      filter.type = 'bandpass'
      filter.frequency.setValueAtTime(800, now)
      filter.frequency.exponentialRampToValueAtTime(320, now + 0.2)
      filter.Q.value = 1.2

      const gain = ctx.createGain()
      gain.gain.setValueAtTime(0.18, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22)

      noise.connect(filter)
      filter.connect(gain)
      gain.connect(ctx.destination)
      noise.start(now)
      noise.stop(now + 0.23)
    } catch {
      // Graceful audio fallback
    }
  }, [soundEnabled])

  // Synthesize realistic drumroll + cymbal / celebration fanfare with Web Audio API
  const playDrumroll = useCallback(() => {
    if (!soundEnabled) return

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (!AudioCtx) return

      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx()
      }
      const ctx = audioCtxRef.current
      if (ctx.state === 'suspended') {
        ctx.resume()
      }

      const now = ctx.currentTime
      const duration = 2.4 // 2.4 seconds drumroll
      const totalHits = 44

      // Roll: rapid snare/timpani hits with increasing frequency and volume
      for (let i = 0; i < totalHits; i++) {
        const progress = i / totalHits
        const time = now + Math.pow(progress, 1.1) * duration
        const hitGain = 0.08 + Math.pow(progress, 1.8) * 0.42

        // Drum tone body (tuned drum skin)
        const osc = ctx.createOscillator()
        const oscGain = ctx.createGain()
        osc.type = 'triangle'
        osc.frequency.setValueAtTime(140 + progress * 35, time)
        osc.frequency.exponentialRampToValueAtTime(70, time + 0.045)

        oscGain.gain.setValueAtTime(hitGain, time)
        oscGain.gain.exponentialRampToValueAtTime(0.001, time + 0.05)

        osc.connect(oscGain)
        oscGain.connect(ctx.destination)
        osc.start(time)
        osc.stop(time + 0.055)

        // Snare rattle noise
        const bufferSize = Math.floor(ctx.sampleRate * 0.035)
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
        const output = noiseBuffer.getChannelData(0)
        for (let s = 0; s < bufferSize; s++) {
          output[s] = Math.random() * 2 - 1
        }
        const whiteNoise = ctx.createBufferSource()
        whiteNoise.buffer = noiseBuffer

        const filter = ctx.createBiquadFilter()
        filter.type = 'highpass'
        filter.frequency.value = 1000

        const noiseGain = ctx.createGain()
        noiseGain.gain.setValueAtTime(hitGain * 0.7, time)
        noiseGain.gain.exponentialRampToValueAtTime(0.001, time + 0.035)

        whiteNoise.connect(filter)
        filter.connect(noiseGain)
        noiseGain.connect(ctx.destination)

        whiteNoise.start(time)
        whiteNoise.stop(time + 0.04)
      }

      // Final crash / ta-da punch at the end of the roll
      const crashTime = now + duration
      const kickOsc = ctx.createOscillator()
      const kickGain = ctx.createGain()
      kickOsc.type = 'sine'
      kickOsc.frequency.setValueAtTime(160, crashTime)
      kickOsc.frequency.exponentialRampToValueAtTime(45, crashTime + 0.35)
      kickGain.gain.setValueAtTime(0.7, crashTime)
      kickGain.gain.exponentialRampToValueAtTime(0.001, crashTime + 0.38)
      kickOsc.connect(kickGain)
      kickGain.connect(ctx.destination)
      kickOsc.start(crashTime)
      kickOsc.stop(crashTime + 0.4)

      // Cymbal splash on reveal
      const cymbalSize = Math.floor(ctx.sampleRate * 1.2)
      const cymbalBuffer = ctx.createBuffer(1, cymbalSize, ctx.sampleRate)
      const cymbalData = cymbalBuffer.getChannelData(0)
      for (let s = 0; s < cymbalSize; s++) {
        cymbalData[s] = Math.random() * 2 - 1
      }
      const cymbalSource = ctx.createBufferSource()
      cymbalSource.buffer = cymbalBuffer

      const cymbalFilter = ctx.createBiquadFilter()
      cymbalFilter.type = 'highpass'
      cymbalFilter.frequency.value = 4500

      const cymbalGain = ctx.createGain()
      cymbalGain.gain.setValueAtTime(0.45, crashTime)
      cymbalGain.gain.exponentialRampToValueAtTime(0.001, crashTime + 1.1)

      cymbalSource.connect(cymbalFilter)
      cymbalFilter.connect(cymbalGain)
      cymbalGain.connect(ctx.destination)

      cymbalSource.start(crashTime)
      cymbalSource.stop(crashTime + 1.2)
    } catch {
      // Audio autoplay gracefully handled if disabled in browser
    }
  }, [soundEnabled])

  // Soft celebration chime when clicking YES
  const playCelebration = useCallback(() => {
    if (!soundEnabled) return

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (!AudioCtx) return

      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx()
      }
      const ctx = audioCtxRef.current
      if (ctx.state === 'suspended') {
        ctx.resume()
      }

      const notes = [523.25, 659.25, 783.99, 1046.5] // C5, E5, G5, C6
      const now = ctx.currentTime
      notes.forEach((freq, idx) => {
        const time = now + idx * 0.12
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'sine'
        osc.frequency.setValueAtTime(freq, time)

        gain.gain.setValueAtTime(0.28, time)
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.9)

        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start(time)
        osc.stop(time + 0.95)
      })
    } catch {
      // Graceful fallback
    }
  }, [soundEnabled])

  const handleOpenReveal = () => {
    playDrumroll()
    setStep('reveal')
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleYes = () => {
    playCelebration()
    setStep('celebrate')
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleReadAgain = () => {
    playPageTurn()
    setStep('creation')
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <div className="storybook-universe">
      {/* Sound Mute/Unmute button */}
      <button
        type="button"
        className={`sound-toggle-btn ${!soundEnabled ? 'muted' : ''}`}
        onClick={() => setSoundEnabled((prev) => !prev)}
        title={soundEnabled ? 'Sound is on' : 'Sound is muted'}
        aria-label={soundEnabled ? 'Mute sound' : 'Unmute sound'}
      >
        {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
        <span>{soundEnabled ? 'Sound On' : 'Muted'}</span>
      </button>

      {/* Floating stars in celestial background */}
      <div className="floating-star star-one" aria-hidden="true">✦</div>
      <div className="floating-star star-two" aria-hidden="true">✧</div>
      <div className="floating-star star-three" aria-hidden="true">⋆</div>
      <div className="floating-star star-four" aria-hidden="true">✦</div>

      {/* Storybook Outer Frame with golden trim & ribbon */}
      <div className="storybook-wrapper">
        <div className="book-spine-accent" aria-hidden="true" />
        <div className="book-ribbon" aria-hidden="true">
          <span className="ribbon-tail" />
        </div>

        <div className="storybook-frame">
          <div className="book-gold-corners" aria-hidden="true" />

          {/* PAGE 1 — GOD’S WONDERFUL CREATION 🌎☀️ */}
          {step === 'creation' && (
            <article className="storybook-page page-creation" aria-labelledby="creation-title">
              <header className="page-chapter-header">
                <div className="chapter-badge">
                  <BookOpen size={13} />
                  <span>Chapter I</span>
                </div>
                <p className="story-eyebrow">A Little Story for Someone Special</p>
                <h1 id="creation-title" className="story-title">
                  God’s Wonderful<br /><em>Creation</em> 🌎☀️
                </h1>
              </header>

              <blockquote className="scripture-quote">
                “In the beginning, God created the heavens and the earth…”
              </blockquote>

              {/* Animated Creation Showcase illustration: Sky, Stars, Flowers, Ocean Waves */}
              <div className="creation-animated-showcase" aria-label="Animated illustration of God's Creation">
                <div className="creation-sky">
                  <div className="sun-pulse-orb" />
                  <div className="creation-cloud c-1" />
                  <div className="creation-cloud c-2" />
                  <div className="twinkling-stars-row">
                    <span className="star-sparkle s1">✦</span>
                    <span className="star-sparkle s2">✧</span>
                    <span className="star-sparkle s3">⋆</span>
                    <span className="star-sparkle s4">✦</span>
                  </div>
                </div>

                <div className="creation-ocean">
                  <div className="wave wave-back" />
                  <div className="wave wave-front" />
                  <div className="swimming-fish f-1">🐟</div>
                  <div className="swimming-fish f-2">🐠</div>
                </div>

                <div className="creation-garden">
                  <div className="flower-item fl-1">
                    <span className="fl-stem" />
                    <span className="fl-bloom">🌸</span>
                  </div>
                  <div className="flower-item fl-2">
                    <span className="fl-stem" />
                    <span className="fl-bloom">🌼</span>
                  </div>
                  <div className="flower-item fl-3">
                    <span className="fl-stem" />
                    <span className="fl-bloom">🌷</span>
                  </div>
                  <div className="floating-petal p-1">🌸</div>
                  <div className="floating-petal p-2">🍃</div>
                </div>
              </div>

              <p className="story-text">
                He painted the skies with beautiful colors, made the flowers bloom, filled the oceans with life, and placed the stars in the night sky.
              </p>

              <p className="story-text highlight-lead">
                And among all the wonderful things He created, He gave Mommy and Daddy their most precious gift…
              </p>

              {/* Playful Animated Arrow pointing directly to Maki's photo */}
              <div className="maki-gift-showcase">
                <div className="arrow-pointer-box" aria-hidden="true">
                  <div className="pointer-bubble">
                    <Sparkles size={13} />
                    <span>Yes, it&apos;s ME!</span>
                  </div>
                  <svg className="curved-bouncy-arrow" viewBox="0 0 100 80" fill="none">
                    <path
                      d="M20,15 C45,8 75,25 65,62"
                      stroke="#f1cf98"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeDasharray="4 3"
                    />
                    <polygon points="56,56 66,72 74,56" fill="#f1cf98" />
                  </svg>
                </div>

                <div className="maki-portrait-card">
                  <div className="photo-halo-glow" aria-hidden="true" />
                  <div className="maki-photo-frame">
                    <img
                      src="/images/baby-photo.png"
                      alt="Baby Makarius smiling happily"
                    />
                  </div>
                  <div className="maki-nameplate">
                    <span className="nameplate-tag">ME! 🧸🤍</span>
                    <span className="nameplate-name">Baby Makarius Kleon</span>
                  </div>
                </div>
              </div>

              <p className="story-text">
                I’m just a little one discovering this big, beautiful world that God made. And as I grow, I know He has so many wonderful things planned for me.
              </p>

              <p className="story-text">
                But today, I have a little something prepared for someone who holds a special place in my story…
              </p>

              <div className="surprise-teaser-card">
                <p className="surprise-lead">Are you ready for a little surprise? ✨</p>
                <p className="surprise-sub">There’s something I’d really love to ask you!</p>
              </div>

              <button
                type="button"
                className="action-button surprise-button"
                onClick={handleOpenReveal}
              >
                A Little Surprise Awaits <ArrowRight data-icon="inline-end" />
              </button>
            </article>
          )}

          {/* PAGE 2 — THE BIG REVEAL 💌 */}
          {step === 'reveal' && (
            <article className="storybook-page page-reveal" aria-labelledby="reveal-title">
              <header className="page-chapter-header">
                <div className="chapter-badge">
                  <Sparkles size={13} />
                  <span>Chapter II</span>
                </div>
                <p className="story-eyebrow">A Special Question</p>
                <h1 id="reveal-title" className="reveal-title">
                  I Have a Special<br /><em>Question for You</em> 🤍
                </h1>
              </header>

              <p className="story-text">
                God has blessed me with the gift of life, a loving family, and a beautiful world to grow up in. And I believe that one of His sweetest blessings is the people He places in my life to love me, pray for me, and guide me closer to Him.
              </p>

              <p className="story-text">
                Mommy and Daddy have someone very special in mind… someone they would love to be part of my journey as I grow in faith and discover God’s wonderful plans for me.
              </p>

              <div className="someone-badge-glow" aria-label="And that someone is YOU!">
                <span className="glow-star">✨</span>
                <span>And that someone is YOU!</span>
                <span className="glow-star">✨</span>
              </div>

              <div className="proposal-plaque">
                <div className="plaque-baby-avatar">
                  <img src="/images/baby-photo.png" alt="Baby Maki" />
                </div>

                <div className="question-block">
                  <p className="question-kicker">With all my tiny heart...</p>
                  <h2 className="question-headline">
                    Will You Be My<br />
                    <em className="ninong-text">Ninang/Ninong?</em> 
                  </h2>
                  <p className="question-description">
                    Will you be one of the special people who will pray for me, cheer for my little milestones, guide me in God’s ways, and remind me of His unfailing love throughout my life?
                  </p>
                </div>

                <blockquote className="verse-ribbon">
                  <p className="verse-quote">“Every good and perfect gift is from above.”</p>
                  <cite className="verse-ref">— James 1:17</cite>
                </blockquote>
              </div>

              <button
                type="button"
                className="action-button yes-button bounce-subtle"
                onClick={handleYes}
              >
                <Sparkles data-icon="inline-start" /> YES! I’D LOVE TO! 🤍 <Sparkles data-icon="inline-end" />
              </button>
            </article>
          )}

          {/* PAGE 3 / CELEBRATION — THANK YOU MESSAGE 🌎♡ */}
          {step === 'celebrate' && (
            <article className="storybook-page page-celebrate" aria-labelledby="thanks-title">
              <div className="celebration-badge-sun" aria-hidden="true">
                <Heart className="celebration-heart-svg" />
              </div>

              <header className="page-chapter-header">
                <p className="story-eyebrow">My Heart Is Overflowing</p>
                <h1 id="thanks-title" className="thanks-title">
                  Thank you, <br />
                  <em>Ninang/Ninong</em>
                </h1>
              </header>

              <div className="thanks-parchment-box">
                <p className="thanks-main-text">
                  Yaaay! I can’t wait to make beautiful memories with you! Thank you for being part of God’s wonderful story for me. 🌎
                </p>

                <div className="heart-row" aria-hidden="true">
                  <Heart />
                  <Heart />
                  <Heart />
                </div>

                <div className="thanks-signature-block">
                  <span className="signature-salutation">With all my love,</span>
                  <strong className="signature-name">Baby Maki ♡</strong>
                </div>
              </div>

              <button
                type="button"
                className="replay-book-button"
                onClick={handleReadAgain}
              >
                <BookOpen size={14} /> <span>Read Our Story Again</span>
              </button>
            </article>
          )}

          <footer className="book-page-footer">
            <span className="page-dot">❦</span>
            <span className="page-footer-note">Makarius’ Story of Faith & Love</span>
            <span className="page-dot">❦</span>
          </footer>
        </div>
      </div>
    </div>
  )
}

export default Invitation
